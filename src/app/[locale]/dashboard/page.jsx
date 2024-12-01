'use client';

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../../lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Toast from "../../../components/Toast";
import { QRCodeCanvas } from 'qrcode.react';
import MenuDashboard from "../../../components/MenuDashboard"; // Import QRCodeCanvas

export const runtime = "edge";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const qrCodeRef = useRef();

    const [tableScanLink, setTableScanLink] = useState("");
    const [restaurantName, setRestaurantName] = useState('');
    const [description, setDescription] = useState('');
    const [description_pl, setDescriptionPL] = useState(''); // Polish translation for description
    const [ratingPrompt, setRatingPrompt] = useState('Please rate our service');
    const [ratingPrompt_pl, setRatingPromptPL] = useState(''); // Polish translation for rating prompt
    const [googleReviewLink, setGoogleReviewLink] = useState('');
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });
    const [activeTab, setActiveTab] = useState('reviews'); // State for tab navigation
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
                setRestaurantName(data.restaurantName || '');
                setDescription(data.description || '');
                setDescriptionPL(data.description_pl || ''); // Set Polish description
                setRatingPrompt(data.ratingPrompt || 'Please rate our service');
                setRatingPromptPL(data.ratingPrompt_pl || ''); // Set Polish Rating Prompt
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
                description_pl, // Save Polish description
                ratingPrompt,
                ratingPrompt_pl,
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

    const handleDownloadQRCode = () => {
        const canvas = qrCodeRef.current.querySelector("canvas");
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        downloadLink.click();
    };

    const handleCopyLink = () => {
        const link = `https://tablescan.pages.dev/track/${tableScanLink}`;
        navigator.clipboard.writeText(link)
            .then(() => {
                setToast({
                    visible: true,
                    message: 'Link copied to clipboard',
                    type: 'success',
                });
            })
            .catch(err => {
                setToast({
                    visible: true,
                    message: err,
                    type: 'error',
                });
            });
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
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Edit Your Restaurant Page</h2>
                        <button
                            onClick={handleLogout}
                            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                        >
                            Log Out
                        </button>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="border-b mb-6">
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-2 px-4 ${activeTab === 'reviews' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-600'}`}
                        >
                            Reviews
                        </button>
                        <button
                            onClick={() => setActiveTab('menu')}
                            className={`py-2 px-4 ${activeTab === 'menu' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-600'}`}
                        >
                            Menu
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'reviews' && (
                        <div>
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
                                <label className="block text-gray-600 mb-2">Restaurant Description (EN)</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter a description for your restaurant in English"
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2">Restaurant Description (PL)</label>
                                <textarea
                                    value={description_pl}
                                    onChange={(e) => setDescriptionPL(e.target.value)}
                                    className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter a description for your restaurant in Polish"
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2">Rating Prompt (EN)</label>
                                <input
                                    type="text"
                                    value={ratingPrompt}
                                    onChange={(e) => setRatingPrompt(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter rating prompt text in English"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2">Rating Prompt (PL)</label>
                                <input
                                    type="text"
                                    value={ratingPrompt_pl}
                                    onChange={(e) => setRatingPromptPL(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter rating prompt text in Polish"
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

                            {/* Save Changes Button */}
                            <button
                                onClick={handleSave}
                                className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                            >
                                Save Changes
                            </button>


                            {/* QR Code Section */}
                            <div className="mt-8 flex flex-col items-center">
                                <div ref={qrCodeRef}>
                                    <QRCodeCanvas
                                        value={`https://tablescan.pages.dev/track/${tableScanLink}`}
                                        size={128}
                                        level="H"
                                        includeMargin={true}
                                    />
                                </div>

                                {/* Download Button */}
                                <button
                                    onClick={handleDownloadQRCode}
                                    className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                                >
                                    Download QR Code
                                </button>

                                {/* Copy Link Button */}
                                <button
                                    onClick={handleCopyLink}
                                    className="mt-4 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
                                >
                                    Copy the Link
                                </button>

                                {/* Link to Public Page */}
                                <Link href={`/review/${tableScanLink}`} className="block mt-4 text-blue-500 hover:underline text-center">
                                    View Public Page
                                </Link>
                            </div>


                        </div>
                    )}

                    {activeTab === 'menu' && (
                        <MenuDashboard />
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
