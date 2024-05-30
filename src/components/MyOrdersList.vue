<script setup>
import { useMyOrdersStore } from "@/store/my-orders";
import { computed } from "vue";

const parseDate = (date) => {
    return date
        .toLocaleDateString("uk-UA", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        .slice(0, -3);
};
const f = window.f;

const myOrders = useMyOrdersStore();
const ordersList = computed(() => myOrders.orders);
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
            <div class="order-item" v-for="order in ordersList" :key="order.id">
                <table
                    cellpadding="8"
                    border="2"
                    style="border-collapse: collapse"
                >
                    <tr>
                        <td>{{ f(order.total) }}</td>
                        <td>{{ parseDate(order.orderDate.toDate()) }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            {{
                                order.post === "ukr"
                                    ? "Укр пошта"
                                    : "Нова пошта"
                            }}, {{ order.department }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <b>Статус: </b
                            >{{ order.complete ? "Виконано" : "В процесі"
                            }}<br /><br />
                            <b>Товари:</b>
                            <ul
                                v-if="order.items.length"
                                style="
                                    list-style: none;
                                    padding: 10px;
                                    margin: 0;
                                "
                            >
                                <li v-for="item in order.items" :key="item.id">
                                    {{ item.product.name }} ({{
                                        item.quantity
                                    }}x, {{ f(item.product.price) }})
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>