<script setup>
import PriceSelector from "@/components/common/PriceSelector.vue";
import Button from "@/components/common/Button.vue";

defineProps({
    opened: Boolean,
    loading: Boolean,
});
defineEmits(["back"]);
</script>

<template>
    <div :class="`product-view ${opened && 'visible'} ${loading && 'loading'}`">
        <div class="view-content">
            <div class="head">
                <i @click="$emit('back')" class="ri-arrow-left-line"></i>
            </div>
            <main>
                <div class="image">
                    <img
                        src="@/assets/images/image-product.svg"
                        alt="Image product"
                    />
                </div>
                <div class="information">
                    <div class="d-flex flex-column">
                        <h5>Корн-салат Акцент</h5>
                        <small class="exist-statis">
                            <p>В наявності</p>
                            <i class="ri-check-line"></i>
                        </small>
                        <div class="pricing-row">
                            <div class="price">16,40 грн / пачка</div>
                            <PriceSelector></PriceSelector>
                            <Button>Додати в корзину</Button>

                            <div class="description">
                                Крес салат віддає перевагу сонячному місцю.
                                Забезпечте йому добру дренажу та родючий ґрунт.
                                Посійте насіння кресу в грунт у весняно-літній
                                період, коли ґрунт прогріється до 10-15°C.
                                Глибина посіву повинна бути близько 1-2 см. Крес
                                салат потребує регулярного поливу, особливо в
                                період сухожильних умов. Щоб зберегти рослину
                                компактною та збільшити врожай, вирізайте листя
                                регулярно. Це також допомагає уникнути цвітіння
                                та насіння. Вносіть органічні добрива для
                                підживлення рослин. Постійно контролюйте рослини
                                на наявність шкідників та захищайте їх, якщо
                                необхідно.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>