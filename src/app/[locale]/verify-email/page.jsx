'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../lib/firebaseConfig';
import { isSignInWithEmailLink, signInWithEmailLink, updatePassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Toast from '../../../components/Toast'; // Adjust the path as needed
import videoThumbnail from '../../../images/signupImage.webp';

export const runtime = "edge";


export default function VerifyEmail() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });
    const router = useRouter();

    useEffect(() => {
        const storedEmail = window.localStorage.getItem("emailForSignIn");
        setEmail(storedEmail || new URLSearchParams(window.location.search).get('email'));
        setRestaurantName(new URLSearchParams(window.location.search).get('restaurantName') || '');

        if (!isSignInWithEmailLink(auth, window.location.href)) {
            setToast({
                visible: true,
                message: "Invalid or expired verification link. Please sign up again.",
                type: "error",
            });
            setTimeout(() => router.push('/signup'), 3000);
        }
    }, [router]);

    const handleCompleteRegistration = async () => {
        try {
            const result = await signInWithEmailLink(auth, email, window.location.href);
            const user = result.user;

            await updatePassword(user, password);

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                restaurantName,
                userId: user.uid,
            });

            setToast({
                visible: true,
                message: 'Account created successfully!',
                type: 'success',
            });
            router.push('/dashboard');
        } catch (error) {
            if (error.code === 'auth/invalid-action-code') {
                setToast({
                    visible: true,
                    message: "Invalid or expired verification link. Please sign up again.",
                    type: "error",
                });
                setTimeout(() => router.push('/signup'), 3000);
            } else {
                setToast({
                    visible: true,
                    message: error.message,
                    type: 'error',
                });
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-800">
            {/* Toast Notification */}
            {toast.visible && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ visible: false, message: '', type: '' })}
                />
            )}

            {/* Left Side - Image/Video Section */}
            <div
                className={`hidden md:flex md:w-1/2 bg-cover bg-center`}
                style={{ backgroundImage: `url(${videoThumbnail.src})` }}
            ></div>

            {/* Right Side - Complete Registration Form */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-white p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Complete Registration</h2>
                <p className="text-gray-600 mb-4">Set your password to finalize your account setup.</p>

                <div className="w-full max-w-md">
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleCompleteRegistration}
                        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        Set Password and Complete Registration
                    </button>
                </div>
            </div>
        </div>
    );
}
