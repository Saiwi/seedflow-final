import { ref, computed, watch } from 'vue';

export function useProductsPagination(products) {
    const itemsPerPage = 3;
    const currentPage = ref(0);
    const isAll = ref(false);

    const paginatedProducts = computed(() => {
        const start = currentPage.value * itemsPerPage;
        const end = start + itemsPerPage;
        return products.slice(0, end);
    });

    watch(products, () => {
        currentPage.value = 0;
        isAll.value = false;
    });

    function showMore() {
        currentPage.value++;
        if (paginatedProducts.value.length >= products.length) {
            isAll.value = true;
        }
    }

    return {
        paginatedProducts,
        showMore,
        isAll
    };
}
