<template>
    <div :id="id" class="d-flex align-items-center catalog-list">
        <h2>{{ mainTitle }}</h2>
        <div class="catalog-filter">
            <Select
                :is-gray="true"
                :id="`${id}_category`"
                v-model="category"
                :options="{ seed: 'Seed' }"
            />
            <Select
                :is-gray="true"
                :id="`${id}_sort`"
                v-model="sort"
                :options="{ up: 'Up', down: 'Down' }"
            />
        </div>
        <small>* Щоб бачити більше товарів змініть параметри пошуку</small>
        <div class="catalog-layout">
            <div class="filter-form">
                <div class="filter-group">
                    <h3>Термін дозрівання</h3>
                    <div class="filter-items">
                        <div class="filter-item">
                            <input
                                type="radio"
                                id="term_early"
                                name="term"
                                value="early"
                                checked
                            />
                            <label for="term_early"></label>
                            <label for="term_early">Ранній</label>
                        </div>
                        <div class="filter-item">
                            <input
                                type="radio"
                                id="term_rare"
                                name="term"
                                value="rare"
                            />
                            <label for="term_rare"></label>
                            <label for="term_rare">Середньо-ранній</label>
                        </div>
                        <div class="filter-item">
                            <input
                                type="radio"
                                id="term_mid_rare"
                                name="term"
                                value="mid_rare"
                            />
                            <label for="term_mid_rare"></label>
                            <label for="term_mid_rare">Середньо-стиглий</label>
                        </div>
                    </div>
                </div>
                <div class="filter-group">
                    <h3>Фасовка</h3>
                    <div class="filter-items">
                        <div class="filter-item">
                            <input
                                type="radio"
                                id="pack_03"
                                name="pack"
                                value="03"
                                checked
                            />
                            <label for="pack_03"></label>
                            <label for="pack_03">0,3 г</label>
                        </div>
                        <div class="filter-item">
                            <input
                                type="radio"
                                id="pack_1"
                                name="pack"
                                value="1"
                            />
                            <label for="pack_1"></label>
                            <label for="pack_1">1 г</label>
                        </div>
                        <div class="filter-item">
                            <input
                                type="radio"
                                id="pack_2"
                                name="pack"
                                value="2"
                            />
                            <label for="pack_2"></label>
                            <label for="pack_2">2 г</label>
                        </div>
                        <div class="filter-item">
                            <input
                                type="radio"
                                id="pack_5"
                                name="pack"
                                value="5"
                            />
                            <label for="pack_5"></label>
                            <label for="pack_5">5 г</label>
                        </div>
                    </div>
                </div>
                <div class="filter-group">
                    <h3>Спосіб вирощування</h3>
                    <div class="filter-items">
                        <div class="filter-item">
                            <input
                                type="radio"
                                id="method_open"
                                name="method"
                                value="open"
                                checked
                            />
                            <label for="method_open"></label>
                            <label for="method_open"
                                >на відкритому грунті</label
                            >
                        </div>
                        <div class="filter-item">
                            <input
                                type="radio"
                                id="method_hot"
                                name="method"
                                value="hot"
                            />
                            <label for="method_hot"></label>
                            <label for="method_hot">в парниках</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="products">
                <ProductView
                    :loading="false"
                    :opened="openedState"
                    @back="closeProductView"
                ></ProductView>

                <ProductCell @click="openProductView"></ProductCell>
                <ProductCell></ProductCell>
                <ProductCell></ProductCell>

                <div class="more-divider"></div>
            </div>
        </div>
        <div class="products more">
            <ProductCell></ProductCell>
            <ProductCell></ProductCell>
            <ProductCell></ProductCell>
            <ProductCell></ProductCell>
        </div>
        <div class="d-flex justify-content-end w-100 mt-28">
            <ButtonOutline
                text="Переглянути більше"
                icon="arrow-right-up-line"
            ></ButtonOutline>
        </div>
    </div>
</template>

<script setup>
import ButtonOutline from "./common/ButtonOutline.vue";
import ProductCell from "./ProductCell.vue";
import ProductView from "./ProductView.vue";
import Select from "@/components/common/Select.vue";
import useViewProduct from "@/composables/common/view-product";
import { ref } from "vue";

import { defineProps } from "vue";

const props = defineProps({
    mainTitle: String,
    id: String,
});

const { openedState, closeProductView, openProductView } = useViewProduct({
    catalogId: props.id,
});

const category = ref("seed");
const sort = ref("up");
</script>
