<template>
    <div class="search-wrapper">
        <input
            type="text"
            class="search"
            v-model="model"
            placeholder="Пошук товарів"
        />
        <Transition>
            <div v-if="modelValue" class="search-dropdown">
                <a href="javascript:void(0)">Пошук...</a>
            </div>
        </Transition>
    </div>
</template>
<script setup>
const model = defineModel();
</script>
<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>