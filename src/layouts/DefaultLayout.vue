<template>
    <div class="default-layout">
        <Header v-if="!isMobile" />
        <MobileHeader v-else />
        <DiscountPromotion />
        <section class="vertical-fluid">
            <div class="container with-margin">
                <RouterView></RouterView>
            </div>
        </section>
        <Footer />
    </div>

    <ModalsWrapper></ModalsWrapper>
</template>

<script>
import ModalsWrapper from "@/components/modals/ModalsWrapper.vue";
import Header from "@/components/common/Header.vue";
import MobileHeader from "@/components/common/MobileHeader.vue";
import Footer from "@/components/common/Footer.vue";
import DiscountPromotion from "@/components/common/DiscountPromotion.vue";

export default {
    name: "DefaultLayout",
    components: {
        Header,
        Footer,
        DiscountPromotion,
        MobileHeader,
        ModalsWrapper,
    },
    data() {
        return {
            isMobile: false,
        };
    },
    mounted() {
        const handler = () => {
            this.isMobile = window.innerWidth <= 1024;
        };

        window.removeEventListener("resize", handler);
        window.addEventListener("resize", handler);
        handler();
    },
};
</script>
