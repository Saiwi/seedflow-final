<script setup>
import { computed } from "vue";

import PriceSelector from "@/components/common/PriceSelector.vue";
import { useCart } from "@/store/cart";

defineEmits(["close", "next"]);

const cart = useCart();

const cartProducts = computed(() => cart.items);

const cartTotal = computed(() => {
    return cartProducts.value.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
});
const cartValid = computed(() => cartTotal.value >= 200);

const f = window.f;
</script>

<template>
    <div class="modal-head">
        <h4>Ваше замовлення:</h4>
        <i class="ri-close-line" @click="$emit('close', $event)"></i>
    </div>
    <div class="modal-content">
        <div class="cart-column">
            <div class="cart-items">
                <div v-if="!cartProducts.length" class="empty-cart">
                    У кошику пусто
                </div>

                <div
                    class="cart-item"
                    v-for="product in cartProducts"
                    :key="product.id"
                >
                    <div class="cart-item-row">
                        <div class="cart-image">
                            <img :src="product.image" />
                        </div>
                        <div class="cart-control">
                            <h5>{{ product.name }}</h5>
                            <div class="cart-count">
                                <PriceSelector
                                    v-model="product.quantity"
                                ></PriceSelector>
                            </div>
                            <div class="cart-item-control">
                                <div class="price-count">
                                    {{ f(product.price, false) }}x{{
                                        product.quantity
                                    }}
                                    =
                                    <b>{{
                                        f(
                                            Number(product.price) *
                                                Number(product.quantity)
                                        )
                                    }}</b>
                                </div>
                                <div
                                    class="remove-item"
                                    @click="cart.removeFromCart(product.id)"
                                >
                                    <i class="ri-delete-bin-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="cartProducts.length" class="cart-total">
                <div class="sum-title">Сума замовлення:</div>
                <div class="sum">{{ f(cartTotal) }}</div>
            </div>
            <div v-if="!cartValid && cartProducts.length" class="min-error">
                Додайте, будь ласка, до замовлення ще товарів. Сума мінімального
                замовлення — 200 грн
            </div>
            <div v-if="cartProducts.length" class="cart-continue">
                <Button :disabled="!cartValid" @click="$emit('next', $event)"
                    >Продовжити</Button
                >
            </div>
        </div>
    </div>
</template>
