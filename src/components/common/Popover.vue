<template>
    <div tabindex="1" class="popover-wrapper">
        <div class="popover-target">
            <slot name="target"></slot>
        </div>
        <div class="popover-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="js">
export default {
    name: 'Popover',
    props: {
        trigger: {
            type: String,
            default: 'focus',
        },
        pinned: {
            type: Boolean,
            default: false,
        },
        position: {
            type: String,
            default: 'right',
        },
    },
}
</script>