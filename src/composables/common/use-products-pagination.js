import { ref, computed, watch, toValue } from 'vue';

export function useProductsPagination(products) {
    const itemsPerPage = 3;
    const currentPage = ref(1);

    const paginatedProducts = computed(() => {
        const end = currentPage.value * itemsPerPage;
        return toValue(products).slice(0, end);
    });

    const isAll = computed(() => paginatedProducts.value.length >= toValue(products).length);

    function showMore() {
        currentPage.value++;
    }

    // Спостерігаємо за змінами в products і скидаємо currentPage
    watch(products, () => {
        currentPage.value = 1;
    });

    return {
        paginatedProducts,
        showMore,
        isAll
    };
}
