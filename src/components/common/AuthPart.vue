<template>
    <Popover v-if="loggedIn">
        <template #target>
            <div class="auth-part">
                <span>{{ userName }}</span>
                <i class="ri-logout-box-fill"></i>
            </div>
        </template>
        <template #content>
            <div class="auth-dropdown">
                <a
                    href="javascript:void(0)"
                    @click="$emit('open-my-orders', $event)"
                    >Мої замовлення</a
                >
                <a @click="logout" href="javascript:void(0)">Вийти</a>
            </div>
        </template>
    </Popover>

    <div @click="router.push('/auth')" v-if="!loggedIn" class="auth-part">
        <span>Увійти</span>
        <i class="ri-login-box-fill"></i>
    </div>
</template>
<script setup>
import Popover from "@/components/common/Popover.vue";

import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

defineEmits(["open-my-orders"]);

const router = useRouter();

const loggedIn = ref(false);
const userName = ref("");

const auth = getAuth();
onAuthStateChanged(auth, function (user) {
    if (user) {
        userName.value = user.displayName;
        loggedIn.value = true;
    } else {
        loggedIn.value = false;
    }
});

const logout = () => {
    const sure = confirm("Ви дійсно хочете вийти з облікового запису?");
    if (sure) {
        signOut(auth).then(() => {
            router.push("/auth/login");
        });
    }
};
</script>
