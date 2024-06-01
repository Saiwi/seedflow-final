<script setup>
import { useCart } from "@/store/cart";
import { computed, onBeforeMount } from "vue";
import { format } from "date-fns";

const cart = useCart();

onBeforeMount(() => {
    cart.fetchPromo();
});

const promoText = computed(() => {
    if (!cart.promo.text) {
        return null;
    }
    let text = cart.promo.text;
    let { startDate, endDate } = cart.promo;
    const formattedStartDate = startDate
        ? format(new Date(startDate.toDate()), "dd.MM.yyyy")
        : null;
    const formattedEndDate = endDate
        ? format(new Date(endDate.toDate()), "dd.MM.yyyy")
        : null;

    if (formattedStartDate) {
        text = text.replace(/\[ПОЧАТОК\]/g, formattedStartDate);
    }
    if (formattedEndDate) {
        text = text.replace(/\[КІНЕЦЬ\]/g, formattedEndDate);
    }
    return text;
});
</script>

<template>
    <Transition name="fade">
        <div v-if="promoText" class="promo-action" v-html="promoText"></div>
    </Transition>
</template>