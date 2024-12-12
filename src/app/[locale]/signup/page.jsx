'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/firebaseConfig';
import { sendSignInLinkToEmail } from 'firebase/auth';
import Toast from '../../../components/Toast'; // Adjust the path as needed
import videoThumbnail from '../../../images/signupImage.webp';
import Image from 'next/image';
import arrowImage from '../../../images/Arrow_01.png';

export const runtime = "edge";

export default function SignUp() {
    const [isMobile, setIsMobile] = useState(false);
    const [email, setEmail] = useState('');
    const [tableScanLink, setTableScanLink] = useState('');
    const [showVerificationPrompt, setShowVerificationPrompt] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTableScanLinkChange = (e) => {
        const input = e.target.value;
        const formattedName = input.toLowerCase().replace(/\s+/g, '-');
        setTableScanLink(formattedName);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        const actionCodeSettings = {
            url: `${window.location.origin}/verify-email?email=${encodeURIComponent(email)}&tableScanLink=${encodeURIComponent(tableScanLink)}`,
            handleCodeInApp: true, // This allows you to handle the sign-in link in the app
        };

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email); // Temporarily store email for use after verification
            setShowVerificationPrompt(true);
            setToast({
                visible: true,
                message: 'Verification email sent. Please check your inbox.',
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

            {/* Right Side - Sign-up Form */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-white p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>

                {showVerificationPrompt ? (
                    <div className="text-center">
                        <p className="text-gray-700 mb-4">Verify your email address at <strong>{email}</strong>.</p>
                        <p className="text-sm mt-2 text-blue-500">Please check your inbox and follow the link to complete your registration.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSignUp} className="w-full max-w-md">
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-gray-600 mb-2">Restaurant Name</label>
                            <input
                                type="text"
                                value={tableScanLink}
                                onChange={handleTableScanLinkChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter restaurant name"
                            />
                            {!isMobile && (
                                <div className="absolute -left-12 top-2">
                                    <Image src={arrowImage} alt="Arrow pointing to restaurant name" width={60} height={60} />
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
