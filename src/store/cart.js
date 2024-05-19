import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
    state: () => ({ count: 0 }),
    getters: {
        coutForHeader: (state) => state.count,
    },
    actions: {
        increase() {
            this.count++;
        },
    },
});
