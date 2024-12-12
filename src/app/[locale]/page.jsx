'use client';

import React, { useState, useEffect } from 'react';
import Script from "next/script";

export default function Home({ params }) {
    const resolvedParams = React.use(params);
    const [messages, setMessages] = useState(null);

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

    return (
        <div style={{height: "100vh"}}>
            <iframe
                data-tally-src="https://tally.so/r/mDvvXN?transparentBackground=1"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="Join the Waitlist..."
            ></iframe>

            <Script
                id="tally-js"
                src="https://tally.so/widgets/embed.js"
            />
        </div>
    );
}