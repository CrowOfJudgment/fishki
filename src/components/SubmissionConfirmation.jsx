export default function SubmissionConfirmation({ onReset, intl }) {
    if (!intl) {
        return null; // Render nothing if `intl` is not available
    }

    return (
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
                {intl.formatMessage({ id: "submission.thank-you-title" })}
            </h2>
            <p className="text-gray-700 mb-4">
                {intl.formatMessage({ id: "submission.thank-you-message" })}
            </p>
            <button
                onClick={onReset}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                {intl.formatMessage({ id: "submission.submit-another" })}
            </button>
        </div>
    );
}
