'use client'

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebaseConfig"
import {useParams, useRouter} from "next/navigation";
import { useEffect } from "react";

export const runtime = "edge";

const TrackPage = () => {
    const router = useRouter();
    const { tableScanId } = useParams();

    useEffect(() => {
        const logScanAndRedirect = async () => {
            if (!tableScanId) return;

            try {
                // Save the scan to Firestore
                const docRef = doc(db, 'qr-scans', `${tableScanId}-${Date.now()}`);
                await setDoc(docRef, {
                    tableScanId,
                    timestamp: new Date().toISOString(),
                });

                // Redirect to the table scan page
                router.replace(`https://tablescan.pages.dev/${tableScanId}`);
            } catch (error) {
                console.error("Error logging scan event:", error);
            }
        };

        logScanAndRedirect();
    }, [tableScanId, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600">Redirecting...</p>
        </div>
    );
};

export default TrackPage;
