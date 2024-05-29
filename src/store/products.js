import { defineStore } from 'pinia'

import ProductsService from '@/services/ProductsService';

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [],
        loading: true,
    }),
    actions: {
        async loadProducts() {
            this.products = await ProductsService.fetch();
            this.loading = false;
        },
        async fetchProducts({ catalogId, categoryId, filters, sortBy }) {
            return [];
        }
    },
});
