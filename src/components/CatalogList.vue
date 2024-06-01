<template>
    <div :id="id" class="d-flex align-items-center catalog-list">
        <h2>{{ mainTitle }}</h2>
        <div class="catalog-filter">
            <Select
                :is-gray="true"
                :id="`${id}_category`"
                v-model="category"
                :options="categoriesOptions"
            />
            <Select
                :is-gray="true"
                :id="`${id}_sort`"
                v-model="sort"
                :options="{
                    by_popularity: 'За популярністю',
                    lower_price: 'спочатку дешевше',
                    bigger_price: 'спочатку дорожче',
                }"
            />
        </div>
        <small>* Щоб бачити більше товарів змініть параметри пошуку</small>
        <div :class="`catalog-layout ${loading ? 'loading' : ''}`">
            <div class="filter-form">
                <FilterGroup
                    v-for="filter of filters"
                    :key="filter.id"
                    v-model="filterValues[filter.id]"
                    :title="filter.name"
                    :variants="filter.options"
                />
            </div>
            <div class="products">
                <ProductView
                    :loading="vLoading"
                    :opened="openedState"
                    :product="currentData"
                    @back="closeProductView"
                    @add-to-cart="onAddToCart"
                    @remove-from-cart="onRemoveFromCart"
                ></ProductView>

                <ProductCell
                    v-for="product of paginatedProducts"
                    :key="product.id"
                    :product="product"
                    @view-product="openProductView($event)"
                    @add-to-cart="onAddToCart"
                    @remove-from-cart="onRemoveFromCart"
                ></ProductCell>

                <h3
                    v-if="!filteredProducts.length"
                    style="padding: 20px; margin: 0"
                >
                    Нічого не знайдено
                </h3>

                <div class="more-divider"></div>
            </div>
        </div>
        <div class="products more"></div>
        <div class="d-flex justify-content-end w-100 mt-28">
            <ButtonOutline
                v-if="!loading && !isAll"
                text="Переглянути більше"
                icon="arrow-right-up-line"
                @click="showMore"
            ></ButtonOutline>
        </div>
    </div>
</template>

<script setup>
import FilterGroup from "@/components/common/FilterGroup.vue";
import ButtonOutline from "./common/ButtonOutline.vue";
import ProductCell from "./ProductCell.vue";
import ProductView from "./ProductView.vue";
import Select from "@/components/common/Select.vue";
import useViewProduct from "@/composables/common/view-product";
import {
    ref,
    computed,
    watch,
    reactive,
    onMounted,
    nextTick,
    watchEffect,
} from "vue";

import { defineProps } from "vue";
import { useCatalogs } from "@/composables/use-catalogs";
import { useProductsPagination } from "@/composables/common/use-products-pagination";
import { useCart } from "@/store/cart";

const catalogs = useCatalogs();
const cartStore = useCart();

const props = defineProps({
    mainTitle: String,
    categories: Object,
    filters: Object,
    products: Array,
    id: String,
    loading: {
        type: Boolean,
        default: false,
    },
});

const {
    loading: vLoading,
    currentData,
    openedState,
    closeProductView,
    openProductView,
} = useViewProduct({
    catalogId: props.id,
});

const categoriesOptions = computed(() => {
    return props.categories.reduce((accumulator, currentValue) => {
        accumulator[currentValue.id] = currentValue.name;
        return accumulator;
    }, {});
});

const category = ref("");
const sort = ref("by_popularity");

const filterValues = reactive({});

const filteredProducts = computed(() => {
    // Фільтрування продуктів
    let filtered = props.products.filter((product) => {
        // Перевірка на каталог
        const categoryProduct = props.categories.find(
            (cat) => cat.id == product.category
        );
        if (!categoryProduct) {
            return false;
        }
        const catalogProduct = catalogs.catalogs.value.find(
            (cat) => categoryProduct.catalogId == cat.id
        );
        if (String(catalogProduct.id) !== String(props.id)) {
            return false;
        }
        // Перевірка на категорію
        if (product.category != category.value) {
            return false;
        }

        // Перевірка на фільтри
        for (let f of product.filters) {
            if (filterValues[f.filterId] != f.value) {
                return false;
            }
        }

        return true;
    });

    // Сортування продуктів
    if (sort.value) {
        if (sort.value === "by_popularity") {
        } else if (sort.value === "lower_price") {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sort.value === "bigger_price") {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }
    }

    return filtered;
});

const { paginatedProducts, showMore, isAll } =
    useProductsPagination(filteredProducts);

watchEffect(() => {
    for (let filter of props.filters) {
        filterValues[filter.id] = 0;
    }
});

watch(categoriesOptions, (newCategories) => {
    if (Object.keys(newCategories).length) {
        const newValue = Object.keys(newCategories)[0];
        category.value = newValue;
    }
});

const onAddToCart = (product) => {
    cartStore.addToCart(product);
};
const onRemoveFromCart = (productId) => {
    cartStore.removeFromCart(productId);
};
</script>
