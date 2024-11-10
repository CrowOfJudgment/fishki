import { FaStar } from 'react-icons/fa';

export default function StarRating({ rating, handleRating }) {
    return (
        <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    className={`cursor-pointer text-3xl ${
                        star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleRating(star)}
                />
            ))}
        </div>
    );
}
