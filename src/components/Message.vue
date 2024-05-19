<script setup>
defineProps({
    name: String,
    date: String,
    rating: Number,
});
</script>

<template>
    <div class="message">
        <div class="head">
            <div class="avatar">
                <i class="ri-user-fill"></i>
            </div>
            <div class="info">
                <div class="name">{{ name }}</div>
                <div class="date">{{ date }}</div>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <div class="stars">
            <i class="ri-star-fill"></i>
            <span>{{ rating }}</span>
        </div>
    </div>
</template>