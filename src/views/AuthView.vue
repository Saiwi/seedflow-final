<template>
  <div
    class="d-flex align-items-center flex-column p-69x98 max-width-380"
    v-if="authChecked"
  >
    <div class="logo mb-18">
      <RouterLink to="/">
        <img src="@/assets/images/logo.svg" alt="" />
      </RouterLink>
    </div>
    <span class="text-center"
      >Станьте архітектором свого смачного світу — реєструйтесь, і найкращі
      врожаї почнуться вже з першого кліку</span
    >

    <div class="d-flex flex-column gap-8 mt-34">
      <button
        v-if="!userExists"
        @click="router.push('/login')"
        class="auth_button login_button"
      >
        Увійти
      </button>
      <button
        @click="router.push('/register')"
        class="auth_button register_button"
      >
        Реєстрація
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authChecked = ref(false);
    const userExists = ref(false);
    const auth = getAuth();
    const router = useRouter();

    onAuthStateChanged(auth, (user) => {
      userExists.value = !!user;
      authChecked.value = true;
    });

    return {
      authChecked,
      userExists,
      router,
    };
  },
};
</script>

<style lang="scss" scoped>
.auth_button {
  border: 2px solid black;
  outline: none;
  font-size: 16px;
  padding: 14px;
  width: 250px;
}

.login_button {
  background-color: white;
  transition: all 0.3s;
  &:hover {
    transition: all 0.3s;
    background-color: #1b1b1b;
    color: white;
  }
}
.register_button {
  transition: filter 0.3s;
  &:hover {
    filter: saturate(1.5);
    transition: filter 0.3s;
  }
  background-color: #e9d591;
}

.mt-34 {
  margin-top: 34px;
}

.gap-8 {
  gap: 8px;
}

.max-width-380 {
  max-width: 360px;
}
.d-flex {
  display: flex;
}
.p-69x98 {
  padding: 69px 58px;
}
.text-center {
  text-align: center;
}
.flex-column {
  flex-direction: column;
}
.align-items-center {
  align-items: center;
}
.mb-18 {
  margin-bottom: 18px;
}
</style>
