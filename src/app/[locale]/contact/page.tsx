'use client'
import React, {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import envelopeIcon from '../../../assets/junk_mail-56597.png'
import styles from './contact-form-.module.css'
import {i18n} from "../../../../i18n-config";
import {useRouter} from "next/navigation";
import {getIntl} from "../../../lib/intl";
import CalendlyWidget from "../../../components/CalendlyWidget";
export const runtime = "edge";

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
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

    const toggleLanguage = () => {
        const newLocale = locale === 'en' ? 'pl' : 'en';
        setLocale(newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
        router.refresh();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        }

        try {
            const response = await fetch('https://webhook-handler-for-tablescan.vercel.app/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (result.success) {
                setSuccess(true)
                formRef.current?.reset()
            } else {
                setError('Failed to send message. Please try again.')
            }
        } catch (err) {
            setError('An error occurred. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    if (!intl) return null;

    return (
        <section className="relative bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-16 h-screen">
            <div className={`absolute inset-0 ${styles.contactBg}`}></div>

            <button
                onClick={toggleLanguage}
                className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-700"
            >
                {locale === 'en' ? 'PL' : 'EN'}
            </button>

            <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white p-8 rounded-xl shadow-lg">
                {/* Left: Contact Form */}
                <div className="col-span-1 lg:col-span-2 flex flex-col">
                    <div className="text-center mb-8">
                        <div className="inline-block mb-4">
                            <Image src={envelopeIcon} alt="Envelope Icon" width={48} height={48} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">{intl.formatMessage({ id: "contact.getInTouch" })}</h2>
                        <p className="text-gray-600 mt-2">{intl.formatMessage({ id: "contact.subtitle" })}</p>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                {intl.formatMessage({ id: "contact.name" })}
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                {intl.formatMessage({ id: "contact.email" })}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                {intl.formatMessage({ id: "contact.message" })}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your message..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50"
                        >
                            {loading ? `${intl.formatMessage({ id: "contact.sending" })}` : `${intl.formatMessage({ id: "contact.sendMessage" })}`}
                        </button>
                        {success && (
                            <p className="text-center text-green-600 mt-4">
                                {intl.formatMessage({ id: "contact.success" })}
                            </p>
                        )}
                        {error && (
                            <p className="text-center text-red-600 mt-4">
                                {error}
                            </p>
                        )}
                    </form>
                </div>

                {/* Middle: OR Text */}
                <div className="flex justify-center items-center col-span-1 lg:col-span-1 my-4">
                    <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center text-gray-700 font-semibold text-lg">
                        OR
                    </div>
                </div>

                {/* Right: Calendly Widget */}
                <div className="col-span-1 lg:col-span-2 flex justify-center items-center">
                    <CalendlyWidget />
                </div>
            </div>
        </section>
    );
}
