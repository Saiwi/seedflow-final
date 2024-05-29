<script setup>
import { ref } from "vue";

import PriceSelector from "@/components/common/PriceSelector.vue";
import Button from "@/components/common/Button.vue";

defineProps({
    product: Object,
    opened: Boolean,
    loading: Boolean,
});
defineEmits(["back"]);

const count = ref(1);
const f = window.f;
</script>

<template>
    <div :class="`product-view ${opened && 'visible'} ${loading && 'loading'}`">
        <div class="view-content">
            <div class="head">
                <i @click="$emit('back')" class="ri-arrow-left-line"></i>
            </div>
            <main>
                <div class="image">
                    <img :src="product.image" alt="Image product" />
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
                            <PriceSelector v-model="count"></PriceSelector>
                            <Button :disabled="!product.status"
                                >Додати в корзину</Button
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