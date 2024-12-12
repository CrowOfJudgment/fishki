'use client';

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { auth } from "../lib/firebaseConfig";

export default function EmailAndPasswordAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); // Initialize router

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/dashboard"); // Redirect to /dashboard
        } catch (error) {
            console.error("Error signing in: ", error);
            alert(error.message);
        }
    };

    const redirectToSignUp = () => {
        router.push("/signup"); // Redirect to /signup
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Login</h1>
                <div className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleSignIn}
                        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all duration-200"
                    >
                        Sign In
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <p className="text-sm text-gray-600">
                        Dont have an account?{" "}
                        <button
                            onClick={redirectToSignUp}
                            className="text-indigo-500 font-semibold hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
