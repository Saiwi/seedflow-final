import { collection, getDocs } from "firebase/firestore";

export default class CategoriesService {
    static async fetch() {
        const ref = collection(window.db, 'categories');
        const snapshot = await getDocs(ref);

        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    }
}