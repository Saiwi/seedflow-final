import { defineStore } from 'pinia'

import ProfileService from '@/services/ProfileService';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: {},
    }),
    actions: {
        async loadProfile(uid) {
            this.profile = await ProfileService.loadProfile(uid);
            return this.profile.id;
        }
    },
});
