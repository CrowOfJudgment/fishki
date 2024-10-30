import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {firebaseConfig} from "../lib/firebaseConfig";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
