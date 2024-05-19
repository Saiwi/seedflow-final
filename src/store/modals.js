import { defineStore } from 'pinia'

export const useModals = defineStore('modals', {
    state: () => ({
        myOrders: {
            active: false,
            x: 0,
            y: 0,
        },
        cart: {
            active: false,
            x: 0,
            y: 0,
        },
    }),
    getters: {
        myOrdersActive() {
            return this.myOrders.active;
        },
        myOrdersCoords() {
            return { x: this.myOrders.x, y: this.myOrders.y };
        },
        cartActive() {
            return this.cart.active;
        },
        cartCoords() {
            return { x: this.cart.x, y: this.cart.y };
        },
    },
    actions: {
        setOpenState([key, value]) {
            this[key].active = value;
        },
        openModal([key, x, y, width]) {
            this[key].x = x - width;
            this[key].y = y - 12;
            this[key].active = true;
        }
    },
});
