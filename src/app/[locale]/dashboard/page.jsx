'use client'

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../../lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Toast from "../../../components/Toast";

export const runtime = "edge";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [restaurantName, setRestaurantName] = useState('');
    const [description, setDescription] = useState('');
    const [ratingPrompt, setRatingPrompt] = useState('Please rate our service');
    const [googleReviewLink, setGoogleReviewLink] = useState('');
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
                setRestaurantName(data.restaurantName || '');
                setDescription(data.description || '');
                setRatingPrompt(data.ratingPrompt || 'Please rate our service');
                setGoogleReviewLink(data.googleReviewLink || '');
            }
        } catch (error) {
            setToast({
                visible: true,
                message: "Error fetching restaurant data.",
                type: "error",
            });
        }
    };

    const handleSave = async () => {
        if (!user) return;

        try {
            const docRef = doc(db, 'restaurants', user.uid);
            await setDoc(docRef, {
                userId: user.uid,
                restaurantName,
                description,
                ratingPrompt,
                googleReviewLink
            }, { merge: true });

            setToast({
                visible: true,
                message: 'Changes saved successfully!',
                type: 'success',
            });
        } catch (error) {
            setToast({
                visible: true,
                message: error.message,
                type: 'error',
            });
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setToast({
                visible: true,
                message: 'You have been logged out successfully.',
                type: 'success',
            });
            router.push('/login');
        } catch (error) {
            setToast({
                visible: true,
                message: "Error logging out. Please try again.",
                type: "error",
            });
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-100 p-6">
                {toast.visible && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast({ visible: false, message: '', type: '' })}
                    />
                )}

                <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">Edit Your Restaurant Page</h2>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2">Restaurant Name</label>
                        <input
                            type="text"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your restaurant name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2">Restaurant Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter a description for your restaurant"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2">Rating Prompt</label>
                        <input
                            type="text"
                            value={ratingPrompt}
                            onChange={(e) => setRatingPrompt(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter rating prompt text"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2">Google Maps Review Link</label>
                        <input
                            type="url"
                            value={googleReviewLink}
                            onChange={(e) => setGoogleReviewLink(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Google Maps review link"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        Save Changes
                    </button>

                    <Link href={`/${restaurantName}`} className="block mt-4 text-blue-500 hover:underline text-center">
                        View Public Page
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="mt-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </ProtectedRoute>
    );
}
