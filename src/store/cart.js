import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
    state: () => ({
        items: [],
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
        }
    },
    persist: {
        storage: localStorage,
        paths: ['items'],
    },
});
