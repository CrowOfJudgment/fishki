'use client'

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

export default function EmailAndPasswordAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Signed in successfully");
        } catch (error) {
            console.error("Error signing in: ", error);
            alert(error.message);
        }
    };

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully");
        } catch (error) {
            console.error("Error signing up: ", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}
