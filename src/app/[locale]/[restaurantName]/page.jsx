'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db, storage } from '../../../lib/firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import NotFoundPage from "@/components/NotFoundPage";
import StarRating from '@/components/StarRating';
import GoogleReviewPrompt from '@/components/GoogleReviewPrompt';
import ComplaintForm from '@/components/ComplaintForm';
import SubmissionConfirmation from '@/components/SubmissionConfirmation';
import Toast from '@/components/Toast';
import { i18n } from '../../../../i18n-config';
import { getIntl } from '../../../lib/intl';

export const runtime = "edge";

export default function RestaurantRatingPage() {
    const { restaurantName } = useParams();
    const [restaurantTitle, setRestaurantTitle] = useState("");
    const [description, setDescription] = useState('');
    const [ratingPrompt, setRatingPrompt] = useState('Please rate our service');
    const [rating, setRating] = useState(0);
    const [isNotFound, setIsNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showGoogleReviewPrompt, setShowGoogleReviewPrompt] = useState(false);
    const [showComplaintForm, setShowComplaintForm] = useState(false);
    const [googleReviewLink, setGoogleReviewLink] = useState('');
    const [toast, setToast] = useState({ visible: false, message: '', type: '' });
    const [locale, setLocale] = useState(i18n.defaultLocale);
    const [intl, setIntl] = useState(null);
    const [submitted, setSubmitted] = useState(false); // Track submission state

    const router = useRouter();

    // Toggle language and refresh page
    const toggleLanguage = () => {
        const newLocale = locale === 'en' ? 'pl' : 'en';
        setLocale(newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
        router.refresh();
    };

    // Fetch translations based on current locale
    useEffect(() => {
        const fetchIntl = async () => {
            const intlInstance = await getIntl(locale);
            setIntl(intlInstance);
        };
        fetchIntl();
    }, [locale]);

    // Fetch restaurant data from Firestore
    useEffect(() => {
        const fetchRestaurantData = async () => {
            setLoading(true);
            if (!restaurantName) {
                setIsNotFound(true);
                setLoading(false);
                return;
            }

            try {
                const q = query(collection(db, 'restaurants'), where('tableScanLink', '==', restaurantName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setDescription(locale === 'en' ? data.description : data.description_pl);
                    setRatingPrompt(locale === 'en' ? data.ratingPrompt : data.ratingPrompt_pl);
                    setRestaurantTitle(data.restaurantName);
                    setGoogleReviewLink(data.googleReviewLink || ''); // Fetch googleReviewLink
                    setIsNotFound(false);
                } else {
                    setIsNotFound(true);
                }
            } catch (error) {
                setIsNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantData();
    }, [restaurantName, locale]);

    const handleRating = (selectedRating) => {
        setRating(selectedRating);
        if (selectedRating > 3) {
            setShowGoogleReviewPrompt(true);
            setShowComplaintForm(false);
        } else {
            setShowGoogleReviewPrompt(false);
            setShowComplaintForm(true);
        }
    };

    const handleGoogleReviewSubmit = async () => {
        if (googleReviewLink) {
            try {
                // Get the current date and time
                const date = new Date();
                // Save the positive review data in Firestore
                await addDoc(collection(db, 'good-reviews'), {
                    restaurantName,
                    rating,
                    date: date.toLocaleDateString(),
                    time: date.toLocaleTimeString(),
                });

                // Redirect to the Google Review link
                window.location.href = googleReviewLink;
            } catch (error) {
                console.error("Error saving positive review:", error.message);
                setToast({
                    visible: true,
                    message: "Error saving positive review. Please try again.",
                    type: 'error',
                });
            }
        } else {
            setToast({
                visible: true,
                message: 'No Google Review link found. Please contact the restaurant.',
                type: 'error',
            });
        }
    };

    const handleComplaintSubmit = async ({ userName, phoneNumber, complaintDescription, imageFile }) => {
        try {
            let imageUrl = '';
            if (imageFile) {
                const imageRef = ref(storage, `complaints/${restaurantName}/${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            await addDoc(collection(db, 'complaints'), {
                restaurantName,
                rating,
                userName,
                phoneNumber,
                complaintDescription,
                imageUrl,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            setSubmitted(true); // Show the SubmissionConfirmation component
            setToast({
                visible: true,
                message: 'Thank you for your feedback. We will look into the issue.',
                type: 'success',
            });
        } catch (error) {
            setToast({
                visible: true,
                message: "Error submitting complaint. Please try again.",
                type: 'error',
            });
        }
    };

    const resetForm = () => {
        setSubmitted(false); // Reset to show the complaint form again
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-gray-700 text-xl">Loading...</div>
            </div>
        );
    }

    if (isNotFound) {
        return <NotFoundPage restaurantName={restaurantName} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 relative">
            <button
                onClick={toggleLanguage}
                className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700"
            >
                {locale === 'en' ? 'PL' : 'EN'}
            </button>

            {toast.visible && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ visible: false, message: '', type: '' })}
                />
            )}

            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">{restaurantTitle}</h1>
                <p className="text-gray-600 mb-6">{description}</p>

                <h2 className="text-xl font-semibold mb-2">{ratingPrompt}</h2>
                <StarRating rating={rating} handleRating={handleRating} />

                {submitted ? (
                    <SubmissionConfirmation onReset={resetForm} intl={intl} />
                ) : (
                    <>
                        {showGoogleReviewPrompt && (
                            <GoogleReviewPrompt
                                handleGoogleReviewSubmit={handleGoogleReviewSubmit}
                                intl={intl}
                            />
                        )}
                        {showComplaintForm && (
                            <ComplaintForm
                                handleComplaintSubmit={handleComplaintSubmit}
                                intl={intl}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
