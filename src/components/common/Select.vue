<template>
    <div :class="containerClasses">
        <select :id="id" v-model="modelValue">
            <option v-for="(item, key) of options" :value="key">
                {{ item }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { onMounted, defineProps, defineModel, reactive } from "vue";

const props = defineProps({
    id: String,
    options: Object,
    isGray: Boolean,
});
const containerClasses = reactive({
    "select-container": true,
    "bg-gray": props.isGray,
});
const modelValue = defineModel();

onMounted(() => {
    $(`#${props.id}`).select2({
        minimumResultsForSearch: Infinity,
    });
    $(`#${props.id}`).on("change.select2", (event) => {
        modelValue.value = event.target.value;
    });
});
</script>