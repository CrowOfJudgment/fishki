'use client';

import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Toast from "./Toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import for Firebase Storage
import { db, storage, auth } from '../lib/firebaseConfig';

export default function MenuDashboard() {
    const [user, setUser] = useState(null);
    const [foodName, setFoodName] = useState('');
    const [name_pl, setFoodNamePl] = useState('');
    const [description, setDescription] = useState('');
    const [description_pl, setDescriptionPl] = useState('');
    const [price, setPrice] = useState('');
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isHalal, setIsHalal] = useState(false);
    const [isKosher, setIsKosher] = useState(false);
    const [foodImage, setFoodImage] = useState(null);
    const [tableScanLink, setTableScanLink] = useState('');
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                if (!currentUser.emailVerified) {
                    router.push('/signup');
                } else {
                    setUser(currentUser);
                    await fetchRestaurantData(currentUser.uid);
                }
            } else {
                setUser(null);
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchRestaurantData = async (userId) => {
        try {
            const docRef = doc(db, 'restaurants', userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setTableScanLink(data.tableScanLink || '');
            }
        } catch (error) {
            setToast({
                visible: true,
                message: "Error fetching restaurant data.",
                type: "error",
            });
        }
    };

    const handleSaveItem = async () => {
        if (!user) {
            setToast({
                visible: true,
                message: "User not authenticated",
                type: "error",
            });
            return;
        }

        try {
            let imageUrl = null;

            // Upload the image to Firebase Storage if it exists
            if (foodImage) {
                const storageRef = ref(
                    storage,
                    `menuImages/${user.uid}/${Date.now()}_${foodImage.name}`
                );
                const uploadSnapshot = await uploadBytes(storageRef, foodImage);
                imageUrl = await getDownloadURL(uploadSnapshot.ref); // Get the download URL
            }

            // Prepare the new item with both English and Polish translations
            const newItem = {
                name: foodName,
                name_pl: name_pl, // Store the Polish name
                description,
                description_pl, // Store the Polish description
                price: parseFloat(price),
                isVegan,
                isVegetarian,
                isHalal,
                isKosher,
                image: imageUrl, // Use the permanent URL from Firebase Storage
            };

            const menuRef = doc(db, "menus", user.uid);
            const menuSnap = await getDoc(menuRef);

            let updatedItems = [];
            if (menuSnap.exists()) {
                const data = menuSnap.data();
                updatedItems = [...(data.items || []), newItem];
            } else {
                updatedItems = [newItem];
            }

            // Save or update the menu in Firestore
            await setDoc(
                menuRef,
                { tableScanLink: tableScanLink, items: updatedItems },
                { merge: true }
            );

            // Clear input fields
            setFoodName('');
            setFoodNamePl('');
            setDescription('');
            setDescriptionPl('');
            setPrice('');
            setIsVegan(false);
            setIsVegetarian(false);
            setIsHalal(false);
            setIsKosher(false);
            setFoodImage(null);

            setToast({
                visible: true,
                message: "Food item added successfully.",
                type: "success",
            });
        } catch (error) {
            console.error("Error saving menu item:", error);
            setToast({
                visible: true,
                message: "Error saving menu item.",
                type: "error",
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">

            {toast.visible && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({visible: false, message: '', type: ''})}
                />
            )}
            <h2 className="text-2xl font-bold mb-4">Add Food Item</h2>

            {/* Food Name */}
            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Food Name (English)</label>
                <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="Enter the name of the food in English"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Food Name (Polish)</label>
                <input
                    type="text"
                    value={name_pl}
                    onChange={(e) => setFoodNamePl(e.target.value)}
                    placeholder="Enter the name of the food in Polish"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Small Description */}
            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Small Description (English)</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a short description of the food in English"
                    className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Small Description (Polish)</label>
                <textarea
                    value={description_pl}
                    onChange={(e) => setDescriptionPl(e.target.value)}
                    placeholder="Enter a short description of the food in Polish"
                    className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            {/* Food Price */}
            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter the price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Food Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFoodImage(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Dietary Restrictions */}
            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Dietary Restrictions</label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isVegan}
                            onChange={(e) => setIsVegan(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">Vegan 🌱</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isVegetarian}
                            onChange={(e) => setIsVegetarian(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">Vegetarian 🥕</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isHalal}
                            onChange={(e) => setIsHalal(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">Halal 🕌</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isKosher}
                            onChange={(e) => setIsKosher(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">Kosher ✡️</span>
                    </label>
                </div>
            </div>


            {/* Submit Button */}
            <button
                onClick={handleSaveItem}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            >
                Add Food Item
            </button>

            {/* Link to Public Page */}
            <Link href={`/menu/${tableScanLink}`} className="block mt-4 text-blue-500 hover:underline text-center">
                View Public Menu
            </Link>
        </div>
    );
}
