import { useModals } from '@/store/modals';
import { ref } from 'vue';

export default function useHeader() {
    const modals = useModals();
    const searchString = ref('');

    const onMyOrdersClick = (event) => {
        modals.openModal(['myOrders', event.x, event.y, 320]);
    };
    const onOpenCartClick = (event) => {
        modals.openModal(['cart', event.x, event.y, 320]);
    };

    return {
        onMyOrdersClick,
        onOpenCartClick,
        searchString,
    };
};