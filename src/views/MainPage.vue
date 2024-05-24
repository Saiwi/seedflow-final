<template>
    <div class="main-page">
        <h1>Насіння овочів вищого сорту</h1>
        <div class="description-row">
            <div class="column-first">
                <div style="margin-bottom: 20px">
                    Наш інтернет-магазин — це не лише місце для покупок, але і
                    путівник у світ садівництва.
                </div>
                <div>
                    Ми вже більше 4 років займаємось вирощуванням овочів,<br />
                    маємо сертіфикати та гранти якості на насіння. Тому<br />
                    знаємо як виростити здоровий та смачний врожай.
                </div>

                <div class="bottom-part">
                    <div class="minimum-sum">
                        Сума мінімального замовлення — 200 грн
                    </div>
                    <button class="to-catalog" @click="scrollToCatalog">
                        <div class="label">В каталог</div>
                        <i class="ri-arrow-right-down-line"></i>
                    </button>
                </div>
            </div>
            <div class="column-second">
                <div class="d-flex gap-75 mb-40">
                    <span
                        >Приєднуйтесь та відкрийте світ садівництва разом
                        з нами!</span
                    >
                    <span>Обирайте якість та надійність для свого врожаю!</span>
                </div>
                <div class="main-image">
                    <img
                        src="@/assets/images/main-image.png"
                        alt="Main Image"
                    />
                </div>
            </div>
        </div>

        <CatalogList id="seed" main-title="Каталог насіння" />

        <Slider
            title="Овочева галерея"
            subtitle="Фото плодів вирощених нашими покупцями з насіння Seedflow"
            :slides="[
                { id: 1, url: '1.png' },
                { id: 2, url: '2.png' },
                { id: 3, url: '3.png' },
                { id: 4, url: '4.png' },
            ]"
        />

        <CatalogList id="plants" main-title="Також можете переглянути" />

        <Communications></Communications>
    </div>
</template>

<script>
import { ref } from "vue";
import CatalogList from "@/components/CatalogList";
import Slider from "@/components/slider/Slider.vue";
import Communications from "@/components/Communications.vue";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import useViewProduct from "@/composables/common/view-product";

export default {
    components: {
        Communications,
        CatalogList,
        Slider,
    },
    setup() {
        const productsView = useViewProduct({ catalogId: "seed" });
        const name = ref("");

        const scrollToCatalog = () => {
            productsView.scrollToProductView();
        };

        const auth = getAuth();
        onAuthStateChanged(auth, function (user) {
            if (user) {
                name.value = user.displayName;
            } else {
                name.value = "";
            }
        });

        const signOutHandle = () => {
            signOut(auth).then(() => {
                router.push("/auth/login");
            });
        };

        return {
            name,
            signOutHandle,
            scrollToCatalog,
        };
    },
};
</script>
