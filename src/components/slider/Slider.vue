<script setup>
import { Carousel, Pagination, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

defineProps({
    title: String,
    subtitle: String,
    slides: Array,
});

function getImgUrl(pic) {
    return require(`@/assets/images/slider/${pic}`);
}
</script>

<template>
    <h2>{{ title }}</h2>
    <small>{{ subtitle }}</small>
    <Carousel
        :itemsToShow="3.95"
        :wrapAround="true"
        :snapAlign="center"
        :transition="500"
        :breakpoints="{
            320: { itemsToShow: 1 },
            700: { itemsToShow: 2 },
            974: { itemsToShow: 3 },
            1285: { itemsToShow: 4 },
        }"
    >
        <Slide v-for="slide in slides" :key="slide.id">
            <div class="carousel__item">
                <div class="slide-content" :data-content="slide.text">
                    <img :src="getImgUrl(slide.url)" alt="Slide" />
                </div>
            </div>
        </Slide>
        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>

<style scoped lang="scss">
.carousel {
    margin-top: 40px;
    margin-bottom: 160px;
}
.carousel__slide {
    padding: 20px;
    height: 325px;
    width: 325px;
    img {
        object-fit: cover;
    }
}

.carousel__viewport {
    perspective: 150px;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.85);
}

.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1);
}
</style>