'use client';

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth, db, storage} from "../../../lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Toast from "../../../components/Toast";
import { QRCodeCanvas } from 'qrcode.react';
import MenuDashboard from "../../../components/MenuDashboard";
import {ButtonCustomerPortal} from "../../../components/ButtonCustomerPortal";
import AdminDashboard from "../../../components/AdminDashboard";
import Image from "next/image";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"; // Import QRCodeCanvas

export const runtime = "edge";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [hasAccess, setHasAccess] = useState(false)
    const [loading, setLoading] = useState(false);
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
    const [imageFile, setImageFile] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [color, setColor] = useState("#7a95ff"); // Default color
    const [savedImageUrl, setSavedImageUrl] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                if (!currentUser.emailVerified) {
                    router.push('/signup');
                } else {
                    setUser(currentUser);
                    await fetchRestaurantData(currentUser.uid);
                    await fetchUserAccess(currentUser.uid)
                }
            } else {
                setUser(null);
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchUserAccess = async (userId) => {
        setLoading(true)
        try {
            const userDocRef = doc(db, 'users', userId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const data = userDocSnap.data();
                setHasAccess(data.hasAccess || false);
            }
        } catch (error) {
            setToast({
                visible: true,
                message: `Error checking user access level. ${error}`,
                type: "error",
            });
        }
        finally {
            setLoading(false)
        }
    };

    const fetchRestaurantData = async (userId) => {
        setLoading(true); // Set loading to true at the start of the function
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
                setSavedImageUrl(data.imageUrl || '');
                setColor(data.themeColor || '#7a95ff');
                setImagePreview(data.imageUrl || '');
                setRatingPromptPL(data.ratingPrompt_pl || ''); // Set Polish Rating Prompt
                setGoogleReviewLink(data.googleReviewLink || '');
            }
        } catch (error) {
            setToast({
                visible: true,
                message: "Error fetching restaurant data.",
                type: "error",
            });
        } finally {
            setLoading(false); // Set loading to false once the data has been loaded or an error occurs
        }
    };


    const handleSave = async () => {
        if (!user) return;

        try {
            let imageUrl = savedImageUrl; // Default to the fetched image URL

            // If a new image is uploaded, save it and update the URL
            if (imageFile) {
                const imageRef = ref(storage, `logo/${tableScanLink}/${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
                setSavedImageUrl(imageUrl); // Update the saved image URL state
            }

            const docRef = doc(db, 'restaurants', user.uid);
            await setDoc(docRef, {
                userId: user.uid,
                restaurantName,
                description,
                description_pl, // Save Polish description
                ratingPrompt,
                ratingPrompt_pl,
                googleReviewLink,
                imageUrl, // Use either the new image URL or the fetched one
                themeColor: color,
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
        const link = `https://quicktablescan.com/track/${tableScanLink}`;
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // Display a preview of the new image
        }
    };


    const handleColorChange = (e) => {
        setColor(e.target.value);
    };

    if (!user) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-gray-700 text-xl">Loading...</div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-gray-700 text-xl">Loading...</div>
            </div>
        )
    }

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-100 p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
                {toast.visible && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast({visible: false, message: '', type: ''})}
                    />
                )}

                {!hasAccess && (
                    <div
                        className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-between px-6 py-4 shadow-lg z-50">
                        <p className="text-lg font-semibold">Please upgrade your plan to activate your business
                            page.</p>

                        <button
                            onClick={() => router.push('/pricing')}
                            className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 transition-all duration-200 shadow"
                        >
                            See Plans
                        </button>
                    </div>
                )}


                <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 mt-[80px]">
                    <div
                        className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-4 sm:space-y-0 sm:space-x-2">
                        <h2 className="text-2xl font-bold text-center sm:text-left">
                            Edit Your Restaurant Page
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={handleLogout}
                                className="w-full sm:w-auto py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none text-center"
                            >
                                Log Out
                            </button>
                            <ButtonCustomerPortal
                                userEmail={user.email}
                            />
                        </div>

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
                        <button
                            onClick={() => setActiveTab('admin')}
                            className={`py-2 px-4 ${activeTab === 'admin' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-600'}`}
                        >
                            Admin
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

                            <div className="mb-3">
                                <label className="block text-gray-600 mb-2">
                                    Restaurant Logo
                                </label>
                                <div className="flex items-center space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('fileInput').click()}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Choose image
                                    </button>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                                {imagePreview !== '' && (
                                    <div className="mt-3">
                                        <Image
                                            src={imagePreview}
                                            alt="Image preview"
                                            width={128}
                                            height={128}
                                            className="object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Select a Color
                                </label>

                                {/* Color Picker Input */}
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={handleColorChange}
                                        className="w-12 h-12 border-none cursor-pointer"
                                    />

                                    {/* Text Input for Hex Code */}
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={handleColorChange}
                                        className="border rounded px-2 py-1 text-gray-800 focus:ring focus:outline-none"
                                        placeholder="#000000"
                                    />
                                </div>

                                {/* Preview Section */}
                                <div
                                    className="mt-4 w-32 h-32 rounded shadow-md"
                                    style={{backgroundColor: color}}
                                >
                                    {/* Preview Box */}
                                </div>
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
                                        value={`https://quicktablescan.com/track/${tableScanLink}`}
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
                                <Link href={`/review/${tableScanLink}`}
                                      className="block mt-4 text-blue-500 hover:underline text-center">
                                    View Public Page
                                </Link>
                            </div>


                        </div>
                    )}

                    {activeTab === 'menu' && (
                        <MenuDashboard user={user}/>
                    )}

                    {activeTab === 'admin' && (
                        <AdminDashboard tableScanLink={tableScanLink}/>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
