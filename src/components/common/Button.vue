<script setup>
import { defineProps, defineEmits, reactive } from 'vue';

const emit = defineEmits(['click']);
const props = defineProps({
    border: {
        type: Boolean,
        default: false,
    },
    text: String,
});

const onClick = () => {
    emit('click');
};

const classes = reactive({
    'button-wrapper': true,
    'no-border': !props.border,
});
</script>

<template>
    <div :class="classes">
        <button @click="onClick">
            <slot></slot>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
    overflow: hidden;
    width: 100%;
    &.no-border button {
        border: none !important;
    }
}

.button-wrapper button {
    position: relative;
    width: 100%;
    background-color: #e9d591;
    font-size: 16px;
    padding: 12px 0;
    transition: filter 0.5s;
    z-index: 0;

    &:disabled {
        opacity: 0.7;
    }

    &:after {
        content: "";
        display: flex;
        position: absolute;
        width: calc(100% - 4px);
        height: 3px;
        bottom: 0;
        background-color: #e9d591;
        z-index: 10;
    }

    &:before {
        content: "";
        display: flex;
        position: absolute;
        width: calc(100% - 4px);
        height: 3px;
        top: 0;
        background-color: #e9d591;
        z-index: 10;
    }

    &:hover {
        transition: filter 0.5s;
        filter: saturate(1.5);

        &::after {
        animation: border-b-rot 0.5s forwards;
        }

        &::before {
        animation: border-t-rot 0.5s forwards;
        }
    }
}
</style>