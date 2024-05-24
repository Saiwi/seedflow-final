<script setup>
import { useRouter } from "vue-router";
import { onBeforeMount, ref, computed } from "vue";
import vue3StarRatings from "vue3-star-ratings";
import Message from "@/components/Message.vue";
import StarComponent from "@/components/common/StarComponent.vue";
import ButtonOutline from "./common/ButtonOutline.vue";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { useComments } from "@/store/comments/comments";
import { useScrollTo } from "@/store/scrollTo";

const rating = ref(0);
const message = ref("");
const profileName = ref("");
const allowToWriteComment = ref(null);

const currentUserComment = computed(() => commentsStore.myComment);
const comments = computed(() => commentsStore.comments);
const commentWasSentByThisUser = ref(false);

const disableCommentButton = ref(false);
const commentError = ref("");

const router = useRouter();
const auth = getAuth();

const commentsStore = useComments();
const scroll = useScrollTo();

const writeMessage = async () => {
    if (!message.value && !rating.value) {
        commentError.value = "Відгук не може бути пустим 😔";
        return false;
    }

    const confirm = window.confirm("Ви готові залишити цей відгук?");
    if (!confirm) {
        return false;
    }

    commentError.value = "";

    disableCommentButton.value = true;
    const { result, message: sentMessage } = await commentsStore.writeMessage({
        message: message.value,
        rating: rating.value,
    });
    if (!result) {
        commentError.value =
            "Щось пішло не так 😔. Вибачте, відгук не опубліковано, спробуйте будь-ласка пізніше";
    } else {
        commentsStore.fetchMessages();
    }

    message.value = "";
    rating.value = "";
    disableCommentButton.value = false;
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        profileName.value = user.displayName;
        scroll.scrollToSection();

        commentsStore.fetchMessages();

        allowToWriteComment.value = true;
    } else {
        allowToWriteComment.value = false;
    }
});
</script>

<template>
    <h2>Що кажуть наші покупці?</h2>
    <div class="communications">
        <div class="comments" v-if="comments.length">
            <Message
                v-for="comment of comments"
                :key="comment.id"
                :name="comment.author"
                :date="comment.date"
                :rating="comment.rating"
            >
                {{ comment.message }}
            </Message>
        </div>
        <div v-else class="message">Поки що немає відгуків</div>
        <div v-if="currentUserComment" style="flex-grow: 1">
            <h3>Дякуємо, ваш відгук опубліковано 😊</h3>
            <div style="margin-top: 24px"></div>
            <Message
                :name="currentUserComment.author"
                :date="currentUserComment.date"
                :rating="currentUserComment.rating"
            >
                {{ currentUserComment.message }}
            </Message>
        </div>
        <form class="form" v-else-if="allowToWriteComment">
            <h4>Нам також цікава Ваша думка про наші товари</h4>
            <small>* За відгук даруємо знижку 5 % на наступне замовлення</small>
            <div class="inputs">
                <span class="comment-error">
                    {{ commentError }}
                </span>
                <div class="user">
                    <div class="avatar">
                        <i class="ri-chat-smile-2-line"></i>
                    </div>
                    <div class="name">
                        <input
                            readonly
                            type="text"
                            :value="profileName"
                            placeholder="Ваше прізвище та ім’я"
                        />
                    </div>
                </div>

                <textarea
                    name="message"
                    placeholder="Написати..."
                    v-model="message"
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
                            @click="writeMessage"
                            icon="arrow-right-line"
                            :disabled="disableCommentButton"
                        ></ButtonOutline>
                    </div>
                </div>
            </div>
        </form>
        <div v-else>
            <ButtonOutline
                text="Авторизуйтесь, щоб написати відгук"
                icon="arrow-right-line"
                @click="router.push('/auth?returnScroll=.form')"
            ></ButtonOutline>
        </div>
    </div>
</template>
