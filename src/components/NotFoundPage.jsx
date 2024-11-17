import Link from 'next/link';

export default function NotFoundPage({ tableScanLink }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-700 mb-6">
                    Sorry, we couldn&apos;t find any information for &quot;{tableScanLink?.replace('-', ' ')}&quot;.
                </p>
                <p className="text-gray-600 mb-6">Please check the URL or explore other restaurants.</p>
                <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}
