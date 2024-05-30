<script setup>
import { ref, computed } from "vue";

import PriceSelector from "@/components/common/PriceSelector.vue";
import Button from "@/components/common/Button.vue";
import { useCart } from "@/store/cart";

const props = defineProps({
    product: Object,
    opened: Boolean,
    loading: Boolean,
});
defineEmits(["back"]);

const cartStore = useCart();

const count = ref(1);
const f = window.f;

const isInCart = computed(
    () => !!cartStore.items.find((item) => item.id == props.product.id)
);
</script>

<template>
    <div :class="`product-view ${opened && 'visible'} ${loading && 'loading'}`">
        <div class="view-content">
            <div class="head">
                <i @click="$emit('back')" class="ri-arrow-left-line"></i>
            </div>
            <main>
                <div class="image">
                    <img :src="product.image" />
                </div>
                <div class="information">
                    <div class="d-flex flex-column">
                        <h5>{{ product.name }}</h5>
                        <small v-if="product.status" class="exist-status">
                            <p>В наявності</p>
                            <i class="ri-check-line"></i>
                        </small>
                        <small v-else class="exist-status no">
                            <p>Немає в наявності</p>
                            <i class="ri-close-line"></i>
                        </small>
                        <div class="pricing-row">
                            <div class="price">
                                {{ f(product.price) }} / пачка
                            </div>
                            <PriceSelector
                                :disabled="isInCart"
                                v-model="count"
                            ></PriceSelector>
                            <Button
                                @click="$emit('add-to-cart', product)"
                                :disabled="product.status"
                                v-if="!isInCart && product.status"
                                >Додати в корзину</Button
                            >
                            <Button
                                v-if="isInCart"
                                :is-gray="true"
                                @click="$emit('remove-from-cart', product)"
                                >Додано</Button
                            >

                            <div class="description">
                                <div v-html="product.description"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>