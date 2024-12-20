'use client';

import React, { useState, useEffect } from 'react';
import {Header} from "../../sections/Header";
import {Hero} from "../../sections/Hero";
import {ProductShowcase} from "../../sections/ProductShowcase";
import {CallToAction} from "../../sections/CallToAction";
import {Footer} from "../../sections/Footer";
import {Pricing} from "../../sections/Pricing";
import {getIntl} from "../../lib/intl";
import {i18n} from "../../../i18n-config";

export const runtime = "edge";

export default function Home({ params }) {
    const resolvedParams = React.use(params);
    const [messages, setMessages] = useState(null);
    const [locale, setLocale] = useState(i18n.defaultLocale);
    const [intl, setIntl] = useState(null);

    useEffect(() => {
        async function loadMessages() {
            try {
                const loadedMessages = (await import(`../../lang/${resolvedParams.locale}.json`)).default;
                setMessages(loadedMessages);
            } catch (error) {
                console.error("Failed to load messages", error);
            }
        }

        loadMessages();
    }, [resolvedParams.locale]);

    useEffect(() => {
        const fetchIntl = async () => {
            const intlInstance = await getIntl(locale);
            setIntl(intlInstance);
        };
        fetchIntl();
    }, [locale]);

    const changeLocale = (newLocale) => {
        setLocale(newLocale);
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
    };

    return (
        <>
            <Header locale={locale} onLocaleChange={changeLocale} intl={intl}/>
            <Hero intl={intl}/>
            {/*<LogoTicker />*/}
            <ProductShowcase intl={intl}/>
            <Pricing intl={intl}/>
            {/*<Testimonials />*/}
            <CallToAction intl={intl}/>
            {/*<div>*/}
            {/*    /!* Calendly Inline Widget *!/*/}
            {/*    <div*/}
            {/*        className="calendly-inline-widget"*/}
            {/*        data-url="https://calendly.com/tablescan-saas"*/}
            {/*        style={{minWidth: '320px', height: '700px'}}*/}
            {/*    ></div>*/}

            {/*    /!* Calendly Script *!/*/}
            {/*    <Script*/}
            {/*        src="https://assets.calendly.com/assets/external/widget.js"*/}
            {/*        strategy="lazyOnload"*/}
            {/*    />*/}
            {/*</div>*/}
            <Footer/>
        </>
    );
}