<script setup>
// Components
import Search from "@/components/common/Search";
import Cart from "@/components/common/Cart";
import AuthPart from "@/components/common/AuthPart";

// Composables
import useHeader from "@/composables/common/header";
const { searchString, onMyOrdersClick, onOpenCartClick } = useHeader();
</script>

<template>
    <section>
        <div class="container">
            <div class="mobile-header">
                <div class="logo">
                    <RouterLink to="/">
                        <img src="@/assets/images/logo.svg" alt="logo" />
                    </RouterLink>
                </div>
                <nav>
                    <Cart @open-cart="onOpenCartClick" />
                    <AuthPart @open-my-orders="onMyOrdersClick" />
                </nav>
            </div>
            <Search v-model="searchString" />
        </div>
    </section>
</template>
