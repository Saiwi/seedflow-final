<template>
    <div class="product-preview">
        <div class="image-section">
            <img src="@/assets/images/image-product.svg" alt="Product item image">
        </div>
        <div class="info-section">
            <h4>
                Крес-салат звичайний
            </h4>
            <div class="buy-row">
                <span class="price">7,40 грн</span>
                <PriceSelector v-model="somePrice"></PriceSelector>
            </div>
            <Button @click="onClick">Додати в корзину</Button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from '@/components/common/Button.vue';
import PriceSelector from '@/components/common/PriceSelector.vue';

const somePrice = ref(1);
</script>
