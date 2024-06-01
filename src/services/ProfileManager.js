import { setDoc, doc } from "firebase/firestore";

export default class ProfileManager {
  constructor() {
    this.db = window.db;
  }

  async addProfile(phone, userId, name) {
    try {
      await setDoc(doc(this.db, "profiles", userId), {
        phone: phone,
        userId: userId,
        name,
      });
      return userId;
    } catch (error) {
      console.error("Error creating profile: ", error);
      return null;
    }
  }
}
