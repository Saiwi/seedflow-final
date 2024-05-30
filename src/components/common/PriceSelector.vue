<template>
    <div
        class="price-selector-wrapper"
        :style="{
            opacity: disabled ? '0' : '1',
            pointerEvents: disabled ? 'none' : 'all',
        }"
    >
        <button class="decrease" @click="decrease">-</button>
        <input
            type="number"
            min="1"
            class="value"
            :value="inputValue"
            @input="onInput"
        />
        <button class="increase" @click="increase">+</button>
    </div>
</template>
<script lang="js" setup>
import { defineModel } from 'vue';

const props = defineProps(['disabled']);

const inputValue = defineModel(1);
const onInput = (event) => {
    if (event.target.value <= 1) {
        event.target.value = 1;
        inputValue.value = 1;
        return false;
    }
    inputValue.value = event.target.value;
};
const increase = () => {
    if (props.disabled) {
        return false
    }
    inputValue.value++;
};
const decrease = () => {
    if (props.disabled) {
        return false
    }
    if (inputValue.value <= 1) {
        return false;
    }
    inputValue.value--;
};
</script>

<style lang="scss" scoped>
.price-selector-wrapper {
    border: #d9d9d9 2px solid;
    font-size: 14px;
    color: black;
    max-width: 118px;

    display: flex;
    justify-content: center;

    button {
        outline: none;
        background-color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
    }

    .decrease {
        border-right: 2px solid #d9d9d9;
        padding: 6px 14px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }

    .value {
        width: 100%;
        border: none;
        outline: none;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .increase {
        border-left: 2px solid #d9d9d9;
        padding: 6px 14px;
    }
}
</style>