<template>
    <RouterView />
</template>

<script>
import { RouterView } from "vue-router";

export default {
    components: {
        RouterView,
    },
    mounted() {
        function addPreloader(image) {
            const src = image.getAttribute("data-src");
            const img = new Image();
            img.src = src;

            img.onload = function () {
                image.src = src;
                image.classList.remove("preloader");
            };

            img.onerror = function () {
                image.classList.remove("preloader");
                image.alt = "Failed to load image";
            };
        }

        function handleNewImages() {
            const preloaders = document.querySelectorAll(
                "img.preloader[data-src]"
            );
            preloaders.forEach((image) => {
                addPreloader(image);
            });
        }

        // Initial call to handle existing images
        handleNewImages();

        // MutationObserver to handle dynamically added images
        const observer = new MutationObserver(handleNewImages);
        observer.observe(document.body, { childList: true, subtree: true });
    },
};
</script>
