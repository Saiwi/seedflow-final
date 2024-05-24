<script setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useScrollTo } from "@/store/scrollTo";

onBeforeMount(() => {
    const route = useRoute();
    const scroll = useScrollTo();
    if (route.query.returnScroll) {
        scroll.setNextScroll(decodeURIComponent(route.query.returnScroll));
    }
});
</script>

<template>
    <div class="auth-layout">
        <div class="auth-layout__content">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style lang="scss">
.auth-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: white;

    .auth-layout__content {
        display: flex;
        border: 2px black solid;
    }
}
</style>
