<script setup>
import { ref } from "vue";

import PriceSelector from "@/components/common/PriceSelector.vue";

defineEmits(["close", "next"]);

const cartProducts = ref([1]);
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

                <div class="cart-item">
                    <div class="cart-item-row">
                        <div class="cart-image">IMG</div>
                        <div class="cart-control">
                            <h5>Перець гострий Ангар</h5>
                            <div class="cart-count">
                                <PriceSelector></PriceSelector>
                            </div>
                            <div class="cart-item-control">
                                <div class="price-count">
                                    11,40x6 = <b>68,40 грн</b>
                                </div>
                                <div class="remove-item">
                                    <i class="ri-delete-bin-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-item">
                    <div class="cart-item-row">
                        <div class="cart-image">IMG</div>
                        <div class="cart-control">
                            <h5>Перець гострий Ангар</h5>
                            <div class="cart-count">
                                <PriceSelector></PriceSelector>
                            </div>
                            <div class="cart-item-control">
                                <div class="price-count">
                                    11,40x6 = <b>68,40 грн</b>
                                </div>
                                <div class="remove-item">
                                    <i class="ri-delete-bin-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-item">
                    <div class="cart-item-row">
                        <div class="cart-image">IMG</div>
                        <div class="cart-control">
                            <h5>Перець гострий Ангар</h5>
                            <div class="cart-count">
                                <PriceSelector></PriceSelector>
                            </div>
                            <div class="cart-item-control">
                                <div class="price-count">
                                    11,40x6 = <b>68,40 грн</b>
                                </div>
                                <div class="remove-item">
                                    <i class="ri-delete-bin-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="cartProducts.length" class="cart-total">
                <div class="sum-title">Сума замовлення:</div>
                <div class="sum">372.60 грн</div>
            </div>
            <div v-if="false" class="min-error">
                Додайте, будь ласка, до замовлення ще товарів. Сума мінімального
                замовлення — 200 грн
            </div>
            <div v-if="cartProducts.length" class="cart-continue">
                <Button :disabled="false" @click="$emit('next', $event)"
                    >Продовжити</Button
                >
            </div>
        </div>
    </div>
</template>
