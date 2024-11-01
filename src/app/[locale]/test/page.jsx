import TestFirestore from "../../../components/TestFirestore";
import ImageUploader from "../../../components/ImageUploader";

export const runtime = "edge";

export default function Test() {
    return (
        <>
            <p>save item to firestore</p>
            <TestFirestore/>
            <p>Image Upload test</p>
            <ImageUploader />
        </>
    )
}