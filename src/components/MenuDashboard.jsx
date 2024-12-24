"use client";

import { useEffect, useState } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Toast from "./Toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from '../lib/firebaseConfig';

export default function MenuDashboard({ user }) {
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
    const [menuItems, setMenuItems] = useState([]);
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                if (!currentUser.emailVerified) {
                    router.push('/signup');
                } else {
                    await fetchMenuItems(currentUser.uid);
                }
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchMenuItems = async (userId) => {
        try {
            const menuRef = doc(db, "menus", userId);
            const menuSnap = await getDoc(menuRef);
            if (menuSnap.exists()) {
                const data = menuSnap.data();
                setMenuItems(data.items || []);
                setTableScanLink(data.tableScanLink || '');
            }
        } catch (error) {
            setToast({
                visible: true,
                message: "Error fetching menu items.",
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

            if (foodImage) {
                const storageRef = ref(
                    storage,
                    `menuImages/${user.uid}/${Date.now()}_${foodImage.name}`
                );
                const uploadSnapshot = await uploadBytes(storageRef, foodImage);
                imageUrl = await getDownloadURL(uploadSnapshot.ref);
            }

            const newItem = {
                name: foodName,
                name_pl,
                description,
                description_pl,
                price: parseFloat(price),
                isVegan,
                isVegetarian,
                isHalal,
                isKosher,
                image: imageUrl,
            };

            const menuRef = doc(db, "menus", user.uid);
            const updatedItems = [...menuItems, newItem];

            await setDoc(
                menuRef,
                { items: updatedItems },
                { merge: true }
            );

            setMenuItems(updatedItems);
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

    const handleRemoveItem = async (index) => {
        try {
            const updatedItems = menuItems.filter((_, i) => i !== index);
            const menuRef = doc(db, "menus", user.uid);

            await updateDoc(menuRef, { items: updatedItems });

            setMenuItems(updatedItems);

            setToast({
                visible: true,
                message: "Food item removed successfully.",
                type: "success",
            });
        } catch (error) {
            console.error("Error removing menu item:", error);
            setToast({
                visible: true,
                message: "Error removing menu item.",
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

            <h3 className="text-xl font-semibold mt-6">Current Menu Items</h3>
            <ul className="mt-4">
                {menuItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2">
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            {/* Link to Public Page */}
            <Link href={`/menu/${tableScanLink}`} className="block mt-4 text-blue-500 hover:underline text-center">
                View Public Menu
            </Link>
        </div>
    );
}
