import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "./firebaseConfig";

export const setRestaurantIsEnabled = async (userId) => {
    const q = query(collection(db, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        return data.hasAccess
    }

}