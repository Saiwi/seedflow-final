import { computed } from 'vue';
import { useProfileStore } from '@/store/profile';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useMyOrdersStore } from '@/store/my-orders';

export function useProfile() {
    const auth = getAuth();
    const profileStore = useProfileStore();

    const orders = useMyOrdersStore();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const profileId = await profileStore.loadProfile(user.uid);
            orders.fetchOrders(profileId);
        }
    });

    const phone = computed(() => profileStore.profile.phone);

    return {
        phone,
    };
}