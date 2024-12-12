import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {auth, db} from '../lib/firebaseConfig';
import {onAuthStateChanged} from "firebase/auth";
import {useRouter} from "next/navigation";

const AdminDashboard = ({ tableScanLink }) => {
    const [user, setUser] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [goodReviews, setGoodReviews] = useState([]);
    const [qrScans, setQrScans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter()

    const fetchData = async () => {
        if (!tableScanLink) {
            setError('Table scan link is required.');
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const complaintsQuery = query(
                collection(db, 'complaints'),
                where('restaurantName', '==', tableScanLink)
            );
            const complaintsSnapshot = await getDocs(complaintsQuery);
            const complaintsData = complaintsSnapshot.docs.map(doc => doc.data());
            setComplaints(complaintsData);

            const goodReviewsQuery = query(
                collection(db, 'good-reviews'),
                where('restaurantName', '==', tableScanLink)
            );
            const goodReviewsSnapshot = await getDocs(goodReviewsQuery);
            const goodReviewsData = goodReviewsSnapshot.docs.map(doc => doc.data());
            setGoodReviews(goodReviewsData);

            const qrScansQuery = query(
                collection(db, 'qr-scans'),
                where('tableScanId', '==', tableScanLink)
            );
            const qrScansSnapshot = await getDocs(qrScansQuery);
            const qrScansData = qrScansSnapshot.docs.map(doc => doc.data());
            setQrScans(qrScansData);

            setError(null);
        } catch (fetchError) {
            console.error('Error fetching data:', fetchError);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                if (!currentUser.emailVerified) {
                    router.push('/signup');
                } else {
                    setUser(currentUser);
                    await fetchData()
                }
            } else {
                setUser(null);
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const goodReviewCount = goodReviews.length;
    const qrScanCount = qrScans.length;
    const ratingsSummary = goodReviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
    }, {});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold">QR Scans</h2>
                <p>Total QR Scans: {qrScanCount}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold">Good Reviews</h2>
                <p>Total Good Reviews: {goodReviewCount}</p>
                <h3 className="text-lg font-semibold mt-4">Ratings Breakdown:</h3>
                <ul>
                    {Object.entries(ratingsSummary).map(([rating, count]) => (
                        <li key={rating}>Rating {rating}: {count}</li>
                    ))}
                </ul>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold">Complaints</h2>
                {complaints.length === 0 ? (
                    <p>No complaints found for this table scan link.</p>
                ) : (
                    <ul className="space-y-4">
                        {complaints.map((complaint, index) => (
                            <li key={index} className="border-b pb-4 mb-4">
                                <p><strong>User:</strong> {complaint.userName}</p>
                                <p><strong>Phone:</strong> {complaint.phoneNumber}</p>
                                <p><strong>Rating:</strong> {complaint.rating}</p>
                                <p><strong>Description:</strong> {complaint.complaintDescription}</p>
                                {complaint.imageUrl && (
                                    <div className="mt-2">
                                        <img
                                            src={complaint.imageUrl}
                                            alt="Complaint related"
                                            className="max-w-full h-auto rounded-lg"
                                        />
                                    </div>
                                )}
                                <p className="text-sm text-gray-500 mt-2">
                                    Date: {complaint.date} | Time: {complaint.time}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
