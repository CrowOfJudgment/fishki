'use client';

import {useEffect, useState} from "react";
import {getIntl} from "../../../lib/intl";
import {i18n} from "../../../../i18n-config";
import ProtectedRoute from "../../../components/ProtectedRoute";
import {useRouter} from "next/navigation";
import {onAuthStateChanged} from "firebase/auth";
import {auth, app, payments} from "../../../lib/firebaseConfig";
import {createCheckoutSession} from "@invertase/firestore-stripe-payments";
import Link from "next/link";

export const runtime = "edge";

const plans = [
    {
        title: 'Monthly Plan',
        description: 'Ideal for businesses that need flexibility with monthly payments.',
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_bIY9CC6VRdabbT29AA' : 'https://buy.stripe.com/4gw8x2d6U7T00WA8wy',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1QM7PGGdy48dKxUYziPmxNb5' : '',
        price: 120,
        duration: '/month'
    },
    {
        title: 'Yearly Plan',
        description: 'Save 20% by opting for an annual subscription.',
        link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_4gw1663JFeefcX6145' : 'https://buy.stripe.com/7sI14A5Es5KSbBecMN',
        priceId: process.env.NODE_ENV === 'development' ? 'price_1QM7ajGdy48dKxUYilYFLXGy' : '',
        price: 1152,
        duration: '/year'
    }
];

export default function Pricing() {
    const [user, setUser] = useState(null)
    const [intl, setIntl] = useState(null);
    const [locale, setLocale] = useState(i18n.defaultLocale);
    const router = useRouter();

    useEffect(() => {
        const fetchIntl = async () => {
            const intlInstance = await getIntl(locale);
            setIntl(intlInstance);
        };
        fetchIntl();
    }, [locale]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                if (!currentUser.emailVerified) {
                    router.push('/signup');
                } else {
                    setUser(currentUser);
                }
            } else {
                setUser(null);
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const toggleLanguage = () => {
        const newLocale = locale === 'en' ? 'pl' : 'en';
        setLocale(newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
        router.refresh();
    };

    const handleSubscribe = (planLink) => {
        const userEmail = user.email || '';
        const subscriptionLink = `${planLink}?prefilled_email=${encodeURIComponent(userEmail)}`;

        const anchor = document.createElement('a');
        anchor.href = subscriptionLink;
        anchor.target = '_blank'; // Open in a new tab
        anchor.rel = 'noopener noreferrer'; // Optional for security
        anchor.click(); // Simulate the click
    };


    const [isYearly, setIsYearly] = useState(false);

    if (!intl) return null;

    return (
        <ProtectedRoute>
            <div
                className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
                <button
                    onClick={toggleLanguage}
                    className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700"
                >
                    {locale === 'en' ? 'PL' : 'EN'}
                </button>

                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                    <div className="flex items-center justify-between mb-8">
                        {/* Plan toggle */}
                        <div className="flex items-center">
                        <span
                            className={`px-4 py-2 font-semibold cursor-pointer rounded-l-lg ${!isYearly ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                            onClick={() => setIsYearly(false)}
                        >
                            {intl.formatMessage({ id: "pricing.monthly" })}
                        </span>
                            <span
                                className={`px-4 py-2 font-semibold cursor-pointer rounded-r-lg ${isYearly ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                                onClick={() => setIsYearly(true)}
                            >
                            {intl.formatMessage({ id: "pricing.yearly" })}
                        </span>
                        </div>

                        {/* Link to Dashboard */}
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow"
                        >
                            Go to Dashboard
                        </Link>
                    </div>

                    {/* Pricing Card */}
                    <div
                        className="flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg p-8 shadow-md">
                        {isYearly ? (
                            <>
                                <h2 className="text-3xl font-bold mb-4">{intl.formatMessage({ id: "pricing.yearly-plan-title" })}</h2>
                                <p className="text-lg mb-6">{intl.formatMessage({ id: "pricing.yearly-plan-description" })}</p>
                                <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-bold">
                                    {plans[1].price}
                                </span>
                                    <span className="text-lg ml-2">
                                    {intl.formatMessage({ id: "pricing.year" })}
                                </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold mb-4">{intl.formatMessage({ id: "pricing.monthly-plan-title" })}</h2>
                                <p className="text-lg mb-6">{intl.formatMessage({ id: "pricing.monthly-plan-description" })}</p>
                                <div className="flex items-baseline mb-4">
                                <span className="text-4xl font-bold">
                                    {plans[0].price}
                                </span>
                                    <span className="text-lg ml-2">
                                    {intl.formatMessage({ id: "pricing.month" })}
                                </span>
                                </div>
                            </>
                        )}
                        <ul className="mb-6 space-y-2">
                            <li>{intl.formatMessage({ id: "pricing.unlimited-access" })}</li>
                            <li>{intl.formatMessage({ id: "pricing.priority-support" })}</li>
                            <li>{intl.formatMessage({ id: "pricing.free-updates" })}</li>
                        </ul>
                        <button
                            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 transition-all duration-200 shadow"
                            onClick={() => handleSubscribe(isYearly ? plans[1].link : plans[0].link)}
                        >
                            {intl.formatMessage({ id: "pricing.choose-plan" })}
                        </button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );

}
