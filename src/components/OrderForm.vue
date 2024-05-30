<script setup>
import { reactive, ref, computed } from "vue";
import { getAuth } from "firebase/auth";
import { useProfile } from "@/composables/use-profile";
import { useProfileStore } from "@/store/profile";
import OrderService from "@/services/OrderService";
import { useCart } from "@/store/cart";
import { useMyOrdersStore } from "@/store/my-orders";

defineEmits(["prev"]);

const auth = getAuth();
const profile = useProfile();
const cart = useCart();

const orderDone = ref(false);
const profileStore = useProfileStore();

const myOrders = useMyOrdersStore();

const formData = reactive({
    city: null,
    post: "ukr",
    postNumber: null,
});

const validate = computed(
    () => !!formData.city && !!formData.post && !!formData.postNumber
);

const resetForm = () => {
    formData.city = null;
    formData.post = "ukr";
    formData.postNumber = null;

    formInvalid.value = false;
    ocurredError.value = false;
    orderDone.value = false;
};

const formInvalid = ref(false);
const ocurredError = ref(false);
const tryMakeOrder = async () => {
    formInvalid.value = false;
    if (!validate.value) {
        formInvalid.value = true;
        return false;
    }

    const result = await OrderService.makeOrder({
        ...formData,
        profile: { ...profileStore.profile },
        products: [...cart.items],
    });
    if (result) {
        orderDone.value = true;
        cart.clearCart();
        myOrders.fetchOrders(profileStore.profile.id);
    } else {
        ocurredError.value = true;
    }
};
</script>

<template>
    <div class="modal-head">
        <h4 v-if="!orderDone">Вибір доставки</h4>
        <h4 v-if="orderDone">Дякуємо за покупку!</h4>
        <i
            class="ri-close-line"
            @click="
                $emit('close', $event);
                resetForm();
            "
        ></i>
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
                <input
                    type="text"
                    v-model="formData.city"
                    placeholder="Місто"
                />

                <div class="select-post">
                    <div class="ukr-post post-variant">
                        <input
                            id="ukr-post"
                            value="ukr"
                            checked
                            name="post"
                            type="radio"
                            v-model="formData.post"
                        />
                        <label for="ukr-post">Укр пошта</label>
                    </div>
                    <div class="nova-post post-variant">
                        <input
                            id="nova-post"
                            value="nova"
                            v-model="formData.post"
                            name="post"
                            type="radio"
                        />
                        <label for="nova-post">Нова пошта</label>
                    </div>
                </div>

                <input
                    type="number"
                    v-model="formData.postNumber"
                    placeholder="№ відділення Нової пошти"
                />
                <span
                    >Оплата замовлення відбувається<br />
                    накладеним платежем відразу на пошті</span
                >
            </div>
            <div
                style="color: #ff0000; font-size: 12px; padding: 8px 19px"
                v-if="formInvalid"
            >
                *Вкажіть будь-ласка обов"язкові дані
            </div>
            <div
                style="color: #ff0000; font-size: 12px; padding: 8px 19px"
                v-if="ocurredError"
            >
                *Схоже сталась помилка під час створення замовлення =(
            </div>
            <div class="cart-continue">
                <Button :disabled="false" @click="tryMakeOrder"
                    >Створити замовлення</Button
                >
            </div>
        </div>
    </div>
</template>