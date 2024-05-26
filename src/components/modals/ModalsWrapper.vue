<script setup>
import CartCurrentOrder from "@/components/CartCurrentOrder.vue";
import CartPreOrderText from "@/components/CartPreOrderText.vue";
import MyOrdersList from "@/components/MyOrdersList.vue";
import OrderForm from "@/components/OrderForm.vue";

import { useModals } from "@/store/modals";
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

const modals = useModals();
const router = useRouter();

const close = (key) => {
    modals.setOpenState([key, false]);
};

const onOrderStarts = () => {
    close("preOrderText");
    const auth = getAuth();
    if (!auth.currentUser) {
        router.push("/auth/login");
    } else {
        modals.openModal([
            "orderForm",
            modals.preOrderText.x,
            modals.preOrderText.y,
            0,
        ]);
    }
};
</script>

<template>
    <vue-draggable-resizable
        v-show="modals.myOrdersActive"
        class="common-modal my-orders"
        :w="320"
        :h="300"
        :x="modals.myOrdersCoords.x"
        :y="modals.myOrdersCoords.y"
        :z="999"
        drag-handle=".modal-head"
        drag-cancel=".modal-head i"
        :parent="false"
    >
        <MyOrdersList @close="close('myOrders')"></MyOrdersList>
    </vue-draggable-resizable>

    <vue-draggable-resizable
        v-show="modals.cartActive"
        class="common-modal cart"
        :max-width="340"
        :min-width="340"
        :min-height="475"
        :w="340"
        :h="475"
        :x="modals.cartCoords.x"
        :y="modals.cartCoords.y"
        :z="998"
        drag-handle=".modal-head"
        drag-cancel=".modal-head i"
        :parent="false"
    >
        <CartCurrentOrder
            @close="close('cart')"
            @next="
                close('cart');
                modals.openModal([
                    'preOrderText',
                    modals.cartCoords.x,
                    modals.cartCoords.y,
                    0,
                ]);
            "
        ></CartCurrentOrder>
    </vue-draggable-resizable>

    <vue-draggable-resizable
        v-show="modals.preOrderTextActive"
        class="common-modal preOrderText"
        :max-width="340"
        :min-width="340"
        :w="340"
        :h="'auto'"
        :x="modals.preOrderTextCoords.x"
        :y="modals.preOrderTextCoords.y"
        :z="997"
        drag-handle=".modal-head"
        drag-cancel=".modal-head i"
        :parent="false"
    >
        <CartPreOrderText
            @prev="
                close('preOrderText');
                modals.openModal(['cart', $event.x, $event.y, 0]);
            "
            @close="close('preOrderText')"
            @next="onOrderStarts"
        ></CartPreOrderText>
    </vue-draggable-resizable>
    <vue-draggable-resizable
        v-show="modals.orderFormActive"
        class="common-modal orderForm"
        :max-width="388"
        :min-width="388"
        :w="388"
        :h="'auto'"
        :x="modals.orderFormCoords.x"
        :y="modals.orderFormCoords.y"
        :z="997"
        drag-handle=".modal-head"
        drag-cancel=".modal-head i"
        :parent="false"
    >
        <OrderForm @close="close('orderForm')"></OrderForm>
    </vue-draggable-resizable>
</template>