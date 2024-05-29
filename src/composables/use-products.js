import { computed, onBeforeMount } from 'vue';
import { useProductsStore } from '@/store/products';

export function useProducts({ catalogId, categoryId, filters, sortBy }) {
    const productsStore = useProductsStore();

    const products = computed(() => productsStore.products[catalogId]);

    onBeforeMount(() => {
        productsStore.fetchProducts({ catalogId, categoryId, filters, sortBy });
    });
    return {
        products,
    };
}