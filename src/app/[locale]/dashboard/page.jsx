'use client'

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebaseConfig";
import { useRouter } from "next/navigation";

export const runtime = "edge";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (!currentUser.emailVerified) {
                    router.push('/signup'); // Redirect if not verified
                } else {
                    setUser(currentUser); // Set user only if verified
                }
            } else {
                setUser(null);
                router.push('/login'); // Redirect if no user is signed in
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
            router.push('/login'); // Redirect to login after logout
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <ProtectedRoute>
            <h1>Welcome to the Dashboard, {user?.email}</h1>
            <button onClick={handleLogout}>
                Log Out
            </button>
        </ProtectedRoute>
    );
}
