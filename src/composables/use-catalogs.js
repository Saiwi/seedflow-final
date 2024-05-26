import { computed, onBeforeMount } from 'vue';
import { useCatalogsStore } from '@/store/catalogs';

export function useCatalogs() {
    const catalogsStore = useCatalogsStore();

    const catalogs = computed(() => catalogsStore.catalogs);

    onBeforeMount(() => {
        catalogsStore.fetchCatalogs();
    });

    const getCatalogName = (id) => {
        return catalogs.value.find((catalog) => catalog.id == id)?.title ?? '';
    };

    return {
        catalogs,
        getCatalogName,
    };
}