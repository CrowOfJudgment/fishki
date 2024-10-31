'use client'

import ProtectedRoute from "../../../components/ProtectedRoute";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import { signOut } from "firebase/auth";

import { auth } from "../../../lib/firebaseConfig";

export const runtime = "edge";

export default function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log("user data: ", currentUser)
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
            // Optionally, you can redirect the user or show a logout message
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };


    return (
        <ProtectedRoute>
            <h1>Welcome to the Dashboard {user?.email}</h1>
            <button onClick={handleLogout}>
                Log Out
            </button>
        </ProtectedRoute>    );
}