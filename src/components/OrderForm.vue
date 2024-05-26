<script setup>
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import { useProfile } from "@/composables/use-profile";
defineEmits(["prev"]);

const auth = getAuth();
const profile = useProfile();

const orderDone = ref(false);
</script>

<template>
    <div class="modal-head">
        <h4 v-if="!orderDone">Вибір доставки</h4>
        <h4 v-if="orderDone">Дякуємо за покупку!</h4>
        <i class="ri-close-line" @click="$emit('close', $event)"></i>
    </div>
    <template v-if="orderDone">
        <div style="padding: 19px">
            Заявку на ім'я <b>{{ auth.currentUser.displayName }}</b> було
            створено. <small class="emoji">😊</small> <br /><br />
            Наш менеджер незабаром зв'яжеться з Вами за номером
            <b>{{ profile.phone.value }}</b>
        </div>
    </template>
    <div v-if="!orderDone" class="modal-content">
        <div class="cart-column">
            <div class="order-form">
                <input type="text" placeholder="Місто" />

                <div class="select-post">
                    <div class="ukr-post post-variant">
                        <input
                            id="ukr-post"
                            value="ukr"
                            name="post"
                            type="radio"
                        />
                        <label for="ukr-post">Укр пошта</label>
                    </div>
                    <div class="nova-post post-variant">
                        <input
                            id="nova-post"
                            value="nova"
                            name="post"
                            type="radio"
                        />
                        <label for="nova-post">Нова пошта</label>
                    </div>
                </div>

                <input type="text" placeholder="№ відділення Нової пошти" />
                <span
                    >Оплата замовлення відбувається<br />
                    накладеним платежем відразу на пошті</span
                >
            </div>
            <div class="cart-continue">
                <Button :disabled="false" @click="orderDone = true"
                    >Створити замовлення</Button
                >
            </div>
        </div>
    </div>
</template>