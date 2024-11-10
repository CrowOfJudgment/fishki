export default function GoogleReviewPrompt({ handleGoogleReviewSubmit, intl }) {
    // Check if intl is available before rendering messages
    if (!intl) return null;

    return (
        <div className="mt-6 text-center">
            <p className="text-green-600 mb-4">
                {intl.formatMessage({ id: "good-review.good-experience:sorry-text" })}
            </p>
            <button
                onClick={handleGoogleReviewSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
                {intl.formatMessage({ id: "good-review.good-experience:submit" })}
            </button>
        </div>
    );
}
