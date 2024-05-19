<script lang="js" setup>
import { defineProps, defineEmits } from 'vue';

const onClick = () => {
    emit('click');
};

const emit = defineEmits(['click']);
const props = defineProps({
    text: String,
    icon: String,
});
</script>

<template>
    <button type="button" class="button-outline" @click="onClick">
        <span>{{ text }}</span>
        <i :class="`ri-${icon}`"></i>
    </button>
</template>

<style lang="scss" scoped>
button {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    padding: 12px;

    outline: none;
    border: 2px solid black;
    background-color: white;

    transition: ease-in background-color 0.3s, color ease-in 0.3s;
    &:hover {
        background-color: black;
        color: white;
        transition: ease-out background-color 0.3s, color ease-out 0.3s;
    }

    i {
        font-size: 35px;
        line-height: 20px;
    }
}
</style>