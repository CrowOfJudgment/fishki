import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import { getStripePayments } from "@invertase/firestore-stripe-payments";
import { getApp } from "@firebase/app";

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);
const zeApp = getApp()
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export const payments = getStripePayments(zeApp, {
    productsCollection: "products",
    customersCollection: "users",
});


export { db };
export { storage }
export { auth };