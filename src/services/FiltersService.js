import { collection, getDocs } from "firebase/firestore";

export default class FiltersService {
    static async fetchFilters() {
        const ref = collection(window.db, 'filters');
        const snapshot = await getDocs(ref);

        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    }
}