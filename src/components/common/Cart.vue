<template>
    <div class="cart" @click="$emit('open-cart', $event)">
        <i class="ri-shopping-bag-2-fill cart-icon"></i>
        <span>Корзина</span>
        <span class="cart-counter">{{ coutForHeader }}</span>
    </div>
</template>
<script>
import { computed } from "vue";
import { useCart } from "@/store/cart";

export default {
    name: "Cart",
    emits: ["open-cart"],
    setup() {
        // Cart
        const store = useCart();
        const coutForHeader = computed(() => store.coutForHeader);

        return {
            increase: store.increase,
            coutForHeader,
        };
    },
};
</script>