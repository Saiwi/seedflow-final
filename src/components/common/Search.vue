<script setup>
import ProductsService from "@/services/ProductsService";

import { useCategories } from "@/composables/use-categories";
import { useCatalogs } from "@/composables/use-catalogs";

// Composables
const categories = useCategories();
const catalogs = useCatalogs();

import { ref } from "vue";

const foundResult = ref([]);
const processing = ref(false);

const model = defineModel();

const onInput = async () => {
    processing.value = true;

    foundResult.value =
        await ProductsService.searchProductsByNameAndDescription(model.value);

    processing.value = false;
};
</script>

<template>
    <div class="search-wrapper">
        <input
            type="text"
            class="search"
            v-model="model"
            placeholder="Пошук товарів"
            @input="onInput"
        />
        <Transition>
            <div tabindex="1" v-if="modelValue" class="search-dropdown">
                <a v-if="processing" href="javascript:void(0)">Пошук...</a>
                <a v-else-if="!foundResult.length" href="javascript:void(0)"
                    >Не знайдено</a
                >
                <a
                    v-else
                    v-for="(product, index) of foundResult"
                    href="javascript:void(0)"
                    :key="index"
                >
                    <div class="search-result-item">
                        <div>
                            <b>{{ product.name }}</b>
                        </div>
                        <div>{{ product.price }} грн</div>
                        <div>
                            {{
                                catalogs.getCatalogName(
                                    categories.getCatalog(product.category)
                                )
                            }}
                        </div>
                        <div>
                            {{ categories.getCategoryName(product.category) }}
                        </div>
                        <div :data-in-stock="product.status">
                            {{ product.status ? "в наявності" : "немає" }}
                        </div>
                    </div>
                </a>
            </div>
        </Transition>
    </div>
</template>

<style>
.search-result-item div {
    flex: 1;
}
.search-result-item {
    display: flex;
    width: 100%;
    font-size: 12px;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 16px;
}
[data-in-stock="true"] {
    color: green;
}
[data-in-stock="false"] {
    color: red;
}

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