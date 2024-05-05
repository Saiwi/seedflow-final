import { collection, addDoc } from "firebase/firestore";

export default class ProfileManager {
  constructor() {
    this.db = window.db;
  }

  async addProfile(phone, userId) {
    try {
      const docRef = await addDoc(collection(this.db, "profiles"), {
        phone: phone,
        userId: userId,
      });
      return docRef.id;
    } catch (error) {
      return null;
    }
  }
}
