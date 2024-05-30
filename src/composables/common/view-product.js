import { useProductsStore } from '@/store/products';
import { ref, computed, nextTick } from 'vue';

export default function useViewProduct({ catalogId } = {}) {
    const products = useProductsStore();

    const openedState = ref(false);
    const currentId = ref('');
    const loading = ref(true);

    const scrollToProductView = () => {
        $(`#${catalogId} .product-view`).get(0).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    };

    const openProductView = async (productId) => {
        openedState.value = true;

        currentId.value = productId;
        nextTick(() => {
            setTimeout(() => {
                loading.value = false;
            }, 600);
        });

        scrollToProductView();
    };
    const closeProductView = () => {
        openedState.value = false;
        loading.value = true;
        currentId.value = null;
    };

    const currentData = computed(() => products.products.find((product) => product.id == currentId.value) ?? {});

    window.catalogsGlobal[catalogId] = openProductView;

    return {
        loading,
        openedState,
        openProductView,
        closeProductView,
        scrollToProductView,
        currentData,
    };
}