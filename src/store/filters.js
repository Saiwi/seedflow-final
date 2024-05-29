import { defineStore } from 'pinia'

import FiltersService from '@/services/FiltersService';

export const useFiltersStore = defineStore('filters', {
    state: () => ({
        loading: true,
        filters: [],
    }),
    actions: {
        async fetchFilters() {
            this.filters = await FiltersService.fetchFilters();
            this.loading = false;
        }
    },
});
