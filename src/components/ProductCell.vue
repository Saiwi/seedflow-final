<template>
    <div class="product-preview">
        <div class="image-section" @click="$emit('view-product', product.id)">
            <img class="preloader" :data-src="product.image" />
        </div>
        <div class="info-section">
            <h4
                class="text-align-center"
                @click="$emit('view-product', product.id)"
            >
                {{ product.name }}
            </h4>
            <div class="buy-row">
                <span class="price">{{
                    f(Number(product.price) * Number(countSelect))
                }}</span>
                <PriceSelector
                    :disabled="isInCart"
                    v-model="countSelect"
                ></PriceSelector>
            </div>
            <Button @click="onClick" v-if="!isInCart">Додати в корзину</Button>
            <Button @click="onClick" :is-gray="true" v-else>Додано</Button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "@/components/common/Button.vue";
import PriceSelector from "@/components/common/PriceSelector.vue";
import { useCart } from "@/store/cart";

const props = defineProps({
    product: Object,
});
const emit = defineEmits(["add-to-cart", "remove-from-cart", "view-product"]);

const cartStore = useCart();

const isInCart = computed(
    () => !!cartStore.items.find((item) => item.id == props.product.id)
);
const countSelect = ref(1);

const onClick = () => {
    if (!isInCart.value) {
        emit("add-to-cart", { ...props.product, quantity: countSelect.value });
    } else {
        emit("remove-from-cart", props.product.id);
    }
};

const f = window.f;
</script>
