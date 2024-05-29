import { computed, onBeforeMount } from 'vue';
import { useFiltersStore } from '@/store/filters';

export function useFilters({ catalogId }) {
    const filtersStore = useFiltersStore();

    const filters = computed(() => filtersStore.filters.filter((filter) => filter.catalogId == catalogId));

    const fetch = () => {
        filtersStore.fetchFilters();
    };

    return {
        filters,
        fetch,
    };
}