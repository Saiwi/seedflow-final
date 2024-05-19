<script setup>
import { ref } from "vue";
import vue3StarRatings from "vue3-star-ratings";
import Message from "@/components/Message.vue";
import StarComponent from "@/components/common/StarComponent.vue";
import ButtonOutline from "./common/ButtonOutline.vue";

const rating = ref(0);
</script>

<template>
    <h2>Що кажуть наші покупці?</h2>
    <div class="communications">
        <div class="comments">
            <!-- <div class="message">No messages yet</div> -->
            <Message name="Олександра Бойко" date="21 січня 2024" :rating="4">
                Знайшла всі необхідні сорти, і ще й з доставкою під двері)))
            </Message>
            <Message name="Іван Григорчук" date="14 березня 2024" :rating="2">
                Купив насіння овочів в інтернеті – мегакруто! Швидка доставка,
                кльовий вибір. Тепер чекаю, як мої овочі виростуть.
            </Message>
            <Message name="Лілія Мельник" date="28 березня 2024" :rating="6">
                Замовила насіння в інтернеті – тепер чекаю, як у мене вдома
                виросте овочевий рай. Класно, що все так просто! 🌱🛒
            </Message>
        </div>
        <form class="form">
            <h4>Нам також цікава Ваша думка про наші товари</h4>
            <small>* За відгук даруємо знижку 5 % на наступне замовлення</small>
            <div class="inputs">
                <div class="user">
                    <div class="avatar">
                        <i class="ri-chat-smile-2-line"></i>
                    </div>
                    <div class="name">
                        <input
                            type="text"
                            placeholder="Ваше прізвище та ім’я"
                        />
                    </div>
                </div>

                <textarea
                    name="message"
                    placeholder="Написати..."
                    rows="10"
                ></textarea>

                <div class="rating">
                    <p>Оцініть, будь-ласка, як пройшло замовлення</p>
                    <vue3-star-ratings
                        inactive-color="#000"
                        :star-size="36"
                        star-color="#E9D591"
                        :number-of-stars="5"
                        :custom-svg="StarComponent"
                        v-model="rating"
                    />
                    <div class="submit">
                        <ButtonOutline
                            text="Відправити"
                            icon="arrow-right-line"
                        ></ButtonOutline>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
