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
                ></ProductView>

                <ProductCell
                    v-for="product of props.products"
                    :key="product.id"
                    :product="product"
                    :is-in-cart="false"
                    @view-product="openProductView($event)"
                ></ProductCell>

                <div class="more-divider"></div>
            </div>
        </div>
        <div class="products more"></div>
        <div class="d-flex justify-content-end w-100 mt-28">
            <ButtonOutline
                v-if="!loading"
                text="Переглянути більше"
                icon="arrow-right-up-line"
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
import { ref, computed, watch, reactive, onMounted, nextTick } from "vue";

import { defineProps } from "vue";

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

watch(categoriesOptions, (newCategories) => {
    if (Object.keys(newCategories).length) {
        const newValue = Object.keys(newCategories)[0];
        category.value = newValue;
    }
});
</script>
