import { useState } from 'react';

export default function ComplaintForm({ intl, handleComplaintSubmit }) {
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [complaintDescription, setComplaintDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        handleComplaintSubmit({ userName, phoneNumber, complaintDescription, imageFile });
    };

    return (
        <div className="mt-6 text-left">
            <p className="text-red-600 mb-4">
                {intl?.formatMessage({ id: "complaint.bad-experience:sorry-text" })}
            </p>
            <input
                type="text"
                placeholder={intl?.formatMessage({ id: "complaint.bad-experience:name-field" })}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <input
                type="text"
                placeholder={intl?.formatMessage({ id: "complaint.bad-experience:number-field" })}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <textarea
                placeholder={intl?.formatMessage({ id: "complaint.bad-experience:problem-field" })}
                value={complaintDescription}
                onChange={(e) => setComplaintDescription(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
            />
            <div className="mb-3">
                <label className="block text-gray-600 mb-2">
                    {intl?.formatMessage({ id: "complaint.bad-experience:image-field" })}
                </label>
                <div className="flex items-center space-x-3">
                    <button
                        type="button"
                        onClick={() => document.getElementById('fileInput').click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        {intl?.formatMessage({ id: "complaint.bad-experience:choose-image" })}
                    </button>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
                {imagePreview && (
                    <div className="mt-3">
                        <img src={imagePreview} alt="Image preview" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                    </div>
                )}
            </div>
            <button
                onClick={handleSubmit}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
            >
                {intl?.formatMessage({ id: "complaint.bad-experience:submit" })}
            </button>
        </div>
    );
}
