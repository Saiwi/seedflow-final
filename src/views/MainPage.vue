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

        <CatalogList
            :id="1"
            main-title="Каталог насіння"
            :products="productsList"
            :categories="seedsCategories"
            :filters="seedFilters"
            :loading="productsLoading"
        />

        <Slider
            title="Овочева галерея"
            subtitle="Фото плодів вирощених нашими покупцями з насіння Seedflow"
            :slides="[
                { id: 1, url: '1.png', text: 'Морква Наполі F1' },
                { id: 2, url: '2.png', text: 'Кабачок Аделія F1' },
                { id: 3, url: '3.png', text: 'Салат Ксарома' },
                { id: 4, url: '4.png', text: 'Перець Геркулес' },
                { id: 5, url: '5.png', text: 'Перець Портека' },
                { id: 6, url: '6.png', text: 'Томат Белавіза F1' },
                { id: 7, url: '7.png', text: 'Томат Бінго' },
                { id: 8, url: '8.png', text: 'Перець Гострий Хай Флай F1' },
                { id: 9, url: '9.png', text: 'Кабачок Грейзіні F1' },
                { id: 10, url: '10.png', text: 'Салат Анконі' },
                { id: 11, url: '11.png', text: 'Морква Каротан' },
                { id: 12, url: '12.png', text: 'Базилік Емілі' },
            ]"
        />

        <CatalogList
            :id="2"
            :main-title="catalogsList[1]?.title"
            :categories="fertsCategories"
            :filters="fertFilters"
            :products="productsList"
            :loading="productsLoading"
        />

        <Communications></Communications>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import CatalogList from "@/components/CatalogList";
import Slider from "@/components/slider/Slider.vue";
import Communications from "@/components/Communications.vue";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import useViewProduct from "@/composables/common/view-product";
import { useCatalogs } from "@/composables/use-catalogs";
import { useCategories } from "@/composables/use-categories";
import { useFilters } from "@/composables/use-filters";
import { useProductsStore } from "@/store/products";

export default {
    components: {
        Communications,
        CatalogList,
        Slider,
    },
    setup() {
        const name = ref("");

        const products = useProductsStore();
        products.loadProducts();

        // Filters
        const seedFilters = useFilters({ catalogId: "1" });
        const fertFilters = useFilters({ catalogId: "2" });

        seedFilters.fetch();

        // Product view
        const seedsProductView = useViewProduct({ catalogId: "1" });
        const fertsProductView = useViewProduct({ catalogId: "2" });

        // Catalogs list
        const catalogs = useCatalogs();
        const catalogsList = computed(() => catalogs.catalogs.value);

        // Categories
        const categories = useCategories();
        const categoriesList = computed(() => categories.categories);

        const seedsCategories = computed(() =>
            categoriesList.value.value.filter(
                (category) => category.catalogId === "1"
            )
        );
        const fertsCategories = computed(() =>
            categoriesList.value.value.filter(
                (category) => category.catalogId === "2"
            )
        );

        const scrollToCatalog = () => {
            seedsProductView.scrollToProductView();
        };

        // Auth
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

        const productsList = computed(() => products.products);
        const productsLoading = computed(() => products.loading);

        return {
            productsList,
            productsLoading,

            fertsCategories,
            seedsCategories,

            seedFilters: seedFilters.filters,
            fertFilters: fertFilters.filters,

            seedsProductView,
            fertsProductView,
            name,
            catalogsList,
            signOutHandle,
            scrollToCatalog,
            f: window.f,
        };
    },
};
</script>
