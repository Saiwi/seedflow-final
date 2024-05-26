import { computed, onBeforeMount } from 'vue';
import { useCategoriesStore } from '@/store/categories';

export function useCategories() {
    const categoriesStore = useCategoriesStore();

    const categories = computed(() => categoriesStore.categories);

    onBeforeMount(() => {
        categoriesStore.fetchCategories();
    });

    const getCategoryName = (id) => {
        return categories.value.find((category) => category.id == id)?.name ?? '';
    };
    const getCatalog = (categoryId) => {
        return categories.value.find((category) => category.id == categoryId)?.catalogId ?? '';
    };

    return {
        categories,
        getCategoryName,
        getCatalog,
    };
}