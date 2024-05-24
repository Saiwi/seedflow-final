import { getAuth } from 'firebase/auth';
import { query, where, addDoc, collection, getDocs } from 'firebase/firestore';

export default class CommentsService {
    static async getUser() {
        const auth = getAuth();

        return {
            name: auth.currentUser.displayName,
            uid: auth.currentUser.uid,
        };
    }
    static async fetchComments() {
        const commentsRef = collection(window.db, 'comments');
        const commentSnapshot = await getDocs(commentsRef);

        if (!commentSnapshot.docs.length) {
            return null;
        }

        return commentSnapshot.docs.map((comment) => ({ ...comment.data(), id: comment.id }));
    }
    static async getMyComment() {
        const auth = getAuth();

        // Отримати profileId для поточного користувача
        const profilesRef = collection(window.db, 'profiles');
        const profileQuery = query(profilesRef, where('userId', '==', auth.currentUser.uid));
        const profileSnapshot = await getDocs(profileQuery);

        if (profileSnapshot.empty) {
            return null;
        }

        const profileDoc = profileSnapshot.docs[0];
        const profileId = profileDoc.id;

        // Перевірити, чи існує коментар для цього profileId
        const commentsRef = collection(window.db, 'comments');
        const commentQuery = query(commentsRef, where('profileId', '==', profileId));
        const commentSnapshot = await getDocs(commentQuery);

        if (!commentSnapshot.docs.length) {
            return null;
        }

        return { ...commentSnapshot.docs[0].data() };
    }
    static async sendCommentByProfile(id, message) {
        // Отримати profileId для поточного користувача
        const profilesRef = collection(window.db, 'profiles');
        const profileQuery = query(profilesRef, where('userId', '==', id));
        const profileSnapshot = await getDocs(profileQuery);

        if (profileSnapshot.empty) {
            throw new Error('Profile not found for the authenticated user.');
        }

        const profileDoc = profileSnapshot.docs[0];
        const profileId = profileDoc.id;

        // Перевірити, чи існує коментар для цього profileId
        const commentsRef = collection(window.db, 'comments');
        const commentQuery = query(commentsRef, where('profileId', '==', profileId));
        const commentSnapshot = await getDocs(commentQuery);

        if (!commentSnapshot.empty) {
            return { result: false };
        }

        const newMessage = {
            message: message.message,
            profileId, date: message.date,
            rating: Math.round(message.rating),
            author: message.author
        };

        await addDoc(commentsRef, newMessage);

        return { result: true };
    }
}