import { computed } from 'vue';
import { useProfileStore } from '@/store/profile';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

export function useProfile() {
    const auth = getAuth();
    const profileStore = useProfileStore();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            profileStore.loadProfile(user.uid);
        }
    });

    const phone = computed(() => profileStore.profile.phone);

    return {
        phone,
    };
}