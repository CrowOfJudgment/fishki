// components/Toast.js
import { useEffect } from 'react';

export default function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // Automatically close the toast after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white text-sm
        ${type === 'success' ? 'bg-green-500' : ''}
        ${type === 'error' ? 'bg-red-500' : ''}
        ${type === 'warning' ? 'bg-yellow-500' : ''}
      `}
        >
            <p>{message}</p>
        </div>
    );
}
