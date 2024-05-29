<script setup>
import { defineModel } from "vue";
const modelValue = defineModel();

defineProps({
    title: String,
    variants: Object,
});
</script>

<template>
    <div class="filter-group">
        <h3>{{ title }}</h3>
        <div class="filter-items">
            <div
                class="filter-item"
                v-for="(variant, index) of variants"
                :key="index"
            >
                <input
                    v-model="modelValue"
                    type="radio"
                    :id="`${variant}_${index}`"
                    :name="`${variant}`"
                    :value="index"
                />
                <label :for="`${variant}_${index}`"></label>
                <label :for="`${variant}_${index}`">{{ variant }}</label>
            </div>
        </div>
    </div>
</template>