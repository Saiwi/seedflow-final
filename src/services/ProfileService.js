import { collection, query, where, getDocs } from "firebase/firestore";

export default class ProfileService {
    static async loadProfile(uid) {
        const ref = collection(window.db, 'profiles');
        const pq = query(ref, where('userId', '==', uid));
        const snap = await getDocs(pq);
        return { ...snap.docs[0].data(), id: snap.docs[0].id };
    }
}