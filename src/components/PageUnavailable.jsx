import { useState } from 'react';

export const runtime = "edge";

export default function PageUnavailable() {
    const [locale, setLocale] = useState('en'); // Assuming you store the current locale

    const toggleLanguage = () => {
        setLocale((prevLocale) => (prevLocale === 'en' ? 'pl' : 'en')); // Toggle between 'en' and 'pl'
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-red-500 mb-4">
                    {locale === 'en' ? 'Page Unavailable' : 'Strona niedostępna'}
                </h1>
                <p className="text-gray-700 mb-6">
                    {locale === 'en'
                        ? 'Sorry this page is temporarily unavailable'
                        : 'Przepraszamy, ta strona jest tymczasowo niedostępna'}
                </p>
                <p className="text-gray-600 mb-6">
                    {locale === 'en'
                        ? 'If you are the business owner, please contact TableScan team.'
                        : 'Jeśli jesteś właścicielem firmy, skontaktuj się z zespołem TableScan.'}
                </p>
            </div>

            {/* Language Toggle Button */}
            <button
                onClick={toggleLanguage}
                className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700"
            >
                {locale === 'en' ? 'PL' : 'EN'}
            </button>
        </div>
    );
}
