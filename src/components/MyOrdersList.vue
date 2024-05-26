<script setup>
import { ref } from "vue";

const ordersList = ref([1]);
</script>

<template>
    <div class="modal-head">
        <h4>Мої замовлення</h4>
        <i class="ri-close-line" @click="$emit('close', $event)"></i>
    </div>
    <div class="modal-content">
        <div class="orders">
            <div v-if="!ordersList.length" class="order-item empty">
                Немає замовлень
            </div>
            <div class="order-item">
                <table
                    cellpadding="8"
                    border="2"
                    style="border-collapse: collapse"
                >
                    <tr>
                        <td>255 грн</td>
                        <td>24 травня 2024</td>
                    </tr>
                    <tr>
                        <td colspan="2">Нова почта, 22</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <b>Товари:</b>
                            <ul
                                style="
                                    list-style: none;
                                    padding: 10px;
                                    margin: 0;
                                "
                            >
                                <li>Насіння (1x, 2грн)</li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="order-item">
                <table
                    cellpadding="8"
                    border="2"
                    style="border-collapse: collapse"
                >
                    <tr>
                        <td>255 грн</td>
                        <td>24 травня 2024</td>
                    </tr>
                    <tr>
                        <td colspan="2">Нова почта, 22</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <b>Товари:</b>
                            <ul
                                style="
                                    list-style: none;
                                    padding: 10px;
                                    margin: 0;
                                "
                            >
                                <li>Насіння (1x, 2грн)</li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>