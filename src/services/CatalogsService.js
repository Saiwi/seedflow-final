import { collection, getDocs } from 'firebase/firestore';

export default class CatalogsService {
    static async fetch() {
        const ref = collection(window.db, 'catalogs');
        const snapshot = await getDocs(ref);

        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    }
}