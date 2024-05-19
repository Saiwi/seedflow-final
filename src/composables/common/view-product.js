import { ref } from 'vue';

export default function useViewProduct({ catalogId } = {}) {
    const openedState = ref(true);

    const scrollToProductView = () => {
        $(`#${catalogId} .product-view`).get(0).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    };

    const openProductView = (productId) => {
        console.log(productId);
        openedState.value = true;
        scrollToProductView();
    };
    const closeProductView = () => {
        openedState.value = false;
    };

    return {
        openedState,
        openProductView,
        closeProductView,
        scrollToProductView,
    };
}