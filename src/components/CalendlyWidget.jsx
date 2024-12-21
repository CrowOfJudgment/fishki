'use client'
import { useEffect } from 'react';

export const CalendlyWidget = () => {
    useEffect(() => {
        // Load the Calendly script when the component mounts
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup script when the component unmounts
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/tablescan-saas/30min"
            style={{ minWidth: '320px', height: '700px' }}
        ></div>
    );
};

export default CalendlyWidget;
