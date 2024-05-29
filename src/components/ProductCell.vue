<template>
    <div class="product-preview">
        <div class="image-section" @click="$emit('view-product', product.id)">
            <img :src="product.image" alt="Product item image" />
        </div>
        <div class="info-section">
            <h4 @click="$emit('view-product', product.id)">
                {{ product.name }}
            </h4>
            <div class="buy-row">
                <span class="price">{{
                    f(Number(product.price) * Number(countSelect))
                }}</span>
                <PriceSelector v-model="countSelect"></PriceSelector>
            </div>
            <Button @click="onClick" v-if="!isInCart">Додати в корзину</Button>
            <Button @click="onClick" :is-gray="true" v-else>Додано</Button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "@/components/common/Button.vue";
import PriceSelector from "@/components/common/PriceSelector.vue";

const props = defineProps({
    product: Object,
    isInCart: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["add-to-cart", "remove-from-cart", "view-product"]);

const onClick = () => {
    if (!props.isInCart) {
        emit("add-to-cart", props.product.id);
    } else {
        emit("remove-from-cart", props.product.id);
    }
};

const countSelect = ref(1);
const f = window.f;
</script>
