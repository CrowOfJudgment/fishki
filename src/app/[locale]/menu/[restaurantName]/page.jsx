'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { db } from "../../../../lib/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import { i18n } from "../../../../../i18n-config"; // Import i18n config
import { getIntl } from "../../../../lib/intl"; // Load localized strings

export default function RestaurantMenuPage() {
    const { restaurantName } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [isNotFound, setIsNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [locale, setLocale] = useState(i18n.defaultLocale); // Default to English
    const [intl, setIntl] = useState(null); // Store translation strings
    const router = useRouter();

    // Toggle language between English and Polish
    const toggleLanguage = () => {
        const newLocale = locale === "en" ? "pl" : "en";
        setLocale(newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/`; // Save preference
        router.refresh(); // Refresh page to apply locale
    };

    useEffect(() => {
        // Fetch i18n strings for the current locale
        const fetchIntl = async () => {
            const intlInstance = await getIntl(locale);
            setIntl(intlInstance);
        };
        fetchIntl();
    }, [locale]);

    useEffect(() => {
        // Fetch menu data based on restaurantName
        const fetchMenuData = async () => {
            setLoading(true);
            if (!restaurantName) {
                setIsNotFound(true);
                setLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, "menus"),
                    where("tableScanLink", "==", restaurantName)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const restaurantData = querySnapshot.docs[0].data();
                    setMenuItems(restaurantData.items || []); // Menu items
                    setIsNotFound(false);
                } else {
                    setIsNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching menu data:", error);
                setIsNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
    }, [restaurantName]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-gray-700 text-lg">
                    {intl?.loading || "Loading..."}
                </p>
            </div>
        );
    }

    if (isNotFound) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-gray-700 text-lg">
                    {intl?.notFound || `Sorry, we couldn't find the menu for "${restaurantName}".`}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            {/* Language Toggle */}
            <button
                onClick={toggleLanguage}
                className="fixed top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700 z-50"
            >
                {locale === "en" ? "PL" : "EN"}
            </button>


            {menuItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4"
                        >
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt={locale === "en" ? item.name : item.name_pl}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            )}
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    {locale === "en" ? item.name : item.name_pl}
                                </h2>
                                <span className="text-blue-600 font-bold">
                                    {item.price.toFixed(2)} PLN
                                </span>
                            </div>
                            <p className="text-gray-600">
                                {locale === "en" ? item.description : item.description_pl}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {item.isVegan && (
                                    <span className="px-2 py-1 bg-green-200 text-green-800 text-sm rounded">
                                        {intl?.vegan || "Vegan"} 🌱
                                    </span>
                                )}
                                {item.isVegetarian && (
                                    <span className="px-2 py-1 bg-orange-200 text-orange-800 text-sm rounded">
                                        {intl?.vegetarian || "Vegetarian"} 🥕
                                    </span>
                                )}
                                {item.isHalal && (
                                    <span className="px-2 py-1 bg-teal-200 text-teal-800 text-sm rounded">
                                        {intl?.halal || "Halal"} 🕌
                                    </span>
                                )}
                                {item.isKosher && (
                                    <span className="px-2 py-1 bg-purple-200 text-purple-800 text-sm rounded">
                                        {intl?.kosher || "Kosher"} ✡️
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">
                    {intl?.noItems || "No menu items available at the moment."}
                </p>
            )}
        </div>
    );
}
