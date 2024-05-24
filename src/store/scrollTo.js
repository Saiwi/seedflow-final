import { defineStore } from 'pinia'

export const useScrollTo = defineStore('scroll_to', {
    state: () => ({
        selector: null,
    }),
    actions: {
        setNextScroll(selector) {
            this.selector = selector;
        },
        scrollToSection() {
            const temp = this.selector;
            if (this.selector) {
                this.selector = null;
                setTimeout(() => {
                    console.log(temp);
                    $(temp).get(0)?.scrollIntoView({ behavior: "smooth", block: "end" });
                }, 100);
            }
        },
    },
});
