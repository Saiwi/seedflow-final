import { defineStore } from 'pinia'

import CategoriesService from '@/services/CategoriesService';

export const useCategoriesStore = defineStore('categories', {
    state: () => ({
        categoriesList: [],
    }),
    getters: {
        categories: (state) => state.categoriesList,
    },
    actions: {
        async fetchCategories() {
            this.categoriesList = await CategoriesService.fetch();
        }
    },
});
