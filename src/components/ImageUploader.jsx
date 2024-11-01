'use client'

import { useState } from "react";
import { storage } from "../lib/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ImageUploader() {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [downloadURL, setDownloadURL] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!image) return;
        setUploading(true);

        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Optionally, track upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error("Upload error: ", error);
                setUploading(false);
            },
            () => {
                // Upload completed successfully
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log("File available at: ", url);
                    setDownloadURL(url);
                    setUploading(false);
                });
            }
        );
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {downloadURL && (
                <div>
                    <p>Upload successful! File URL:</p>
                    <a href={downloadURL} target="_blank" rel="noopener noreferrer">
                        {downloadURL}
                    </a>
                </div>
            )}
        </div>
    );
}
