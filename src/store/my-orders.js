import { defineStore } from 'pinia'

import OrderService from '@/services/OrderService';

export const useMyOrdersStore = defineStore('my_orders', {
    state: () => ({
        loading: true,
        orders: [],
    }),
    actions: {
        async fetchOrders(profileId) {
            this.orders = await OrderService.fetchOrders(profileId);
            this.loading = false;
        }
    },
});
