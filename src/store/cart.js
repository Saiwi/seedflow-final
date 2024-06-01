import { defineStore } from 'pinia';
import { getDocs, collection } from "firebase/firestore";

export const useCart = defineStore('cart', {
    state: () => ({
        items: [],
        promo: {},
    }),
    getters: {
        coutForHeader: (state) => state.items.length,
    },
    actions: {
        clearCart() {
            this.items = [];
        },
        addToCart(data) {
            this.items.push(data);
        },
        removeFromCart(id) {
            this.items = this.items.filter(item => item.id !== id);
        },
        async fetchPromo() {
            const ref = collection(window.db, 'promos');
            const snap = await getDocs(ref);
            if (!snap.docs.length) {
                return false;
            }
            this.promo = { ...snap.docs[0].data() };
        }
    },
    persist: {
        storage: localStorage,
        paths: ['items'],
    },
});
