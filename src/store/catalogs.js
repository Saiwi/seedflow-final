import { defineStore } from 'pinia'

import CatalogsService from '@/services/CatalogsService';

export const useCatalogsStore = defineStore('catalogs', {
    state: () => ({
        catalogsList: [],
    }),
    getters: {
        catalogs: (state) => state.catalogsList,
    },
    actions: {
        async fetchCatalogs() {
            this.catalogsList = await CatalogsService.fetch();
        }
    },
});
