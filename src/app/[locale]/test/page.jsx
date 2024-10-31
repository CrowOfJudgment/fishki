import TestFirestore from "../../../components/TestFirestore";

export const runtime = "edge";

export default function Test() {
    return (
        <>
            <p>save item to firestore</p>
            <TestFirestore/>
        </>
    )
}