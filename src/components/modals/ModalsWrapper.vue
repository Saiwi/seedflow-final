<script setup>
import { ref } from "vue";
import { useModals } from "@/store/modals";

const modals = useModals();

const close = (key) => {
    modals.setOpenState([key, false]);
};
</script>

<template>
    <vue-draggable-resizable
        v-show="modals.myOrdersActive"
        class="common-modal my-orders"
        :max-width="320"
        :min-width="320"
        :min-height="300"
        :w="320"
        :h="300"
        :x="modals.myOrdersCoords.x"
        :y="modals.myOrdersCoords.y"
        :z="999"
        drag-handle=".modal-head"
        drag-cancel=".modal-head i"
        :parent="false"
    >
        <div class="modal-head">
            <i class="ri-close-line" @click="close('myOrders')"></i>
        </div>
        <div class="modal-content">Content</div>
    </vue-draggable-resizable>
    <vue-draggable-resizable
        v-show="modals.cartActive"
        class="common-modal cart"
        :max-width="320"
        :min-width="320"
        :min-height="475"
        :w="320"
        :h="475"
        :x="modals.cartCoords.x"
        :y="modals.cartCoords.y"
        :z="998"
        drag-handle=".modal-head"
        drag-cancel=".modal-head i"
        :parent="false"
    >
        <div class="modal-head">
            <i class="ri-close-line" @click="close('cart')"></i>
        </div>
        <div class="modal-content">Content</div>
    </vue-draggable-resizable>
</template>