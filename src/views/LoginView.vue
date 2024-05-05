<template>
  <div v-if="authChecked" class="login_view">
    <div class="logo">
      <RouterLink to="/">
        <img src="@/assets/images/logo.svg" alt="" />
      </RouterLink>
    </div>
    <div class="form">
      <div class="input-wrapper">
        <input type="email" v-model="email" placeholder="Електронна пошта" />
        <small class="input-error">{{ error.email }}</small>
      </div>
      <div class="input-wrapper">
        <input type="password" v-model="password" placeholder="Пароль" />
        <small class="input-error">{{ error.password }}</small>
      </div>
    </div>
    <div class="button-wrapper">
      <button
        id="submit-button"
        :disabled="processing"
        type="button"
        @click="login"
      >
        Увійти
      </button>
      <div class="input-wrapper">
        <small class="input-error">{{ serverError }}</small>
      </div>
    </div>

    <div class="go-to-login">
      <RouterLink to="/auth/register">
        Немає акаунту? Зареєструйтесь
      </RouterLink>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import validator from "validator";
import { ref, reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    function parseErrorMessage(errorMessage) {
      const errors = [];
      if (
        errorMessage.includes("auth/invalid-value-(email)") ||
        errorMessage.includes("auth/invalid-email")
      ) {
        errors.push("Невірна адреса електронної пошти");
      }

      if (errorMessage.includes("auth/invalid-credential")) {
        errors.push("Такого користувача неіснує, або пароль введено невірно");
      }

      if (
        errorMessage.includes(
          "-starting-an-object-on-a-scalar-field-invalid-value-(password)"
        )
      ) {
        errors.push("Невірний пароль");
      }
      return errors.join(", ");
    }

    const auth = getAuth();
    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const processing = ref(false);
    const serverError = ref("");
    const authChecked = ref(false);

    const error = reactive({
      password: "",
      email: "",
    });

    onBeforeMount(async () => {
      await router.isReady();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push("/");
        }
        authChecked.value = true;
      });
    });

    const login = () => {
      error.email = "";
      error.password = "";
      processing.value = true;

      let isError = false;

      if (validator.isEmpty(email.value)) {
        error.email = "*Введіть електронну адресу";
        isError = true;
      }
      if (validator.isEmpty(password.value)) {
        error.password = "*Введіть пароль";
        isError = true;
      }

      if (isError) {
        processing.value = false;
        return false;
      }

      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          serverError.value = parseErrorMessage(error.code);
          processing.value = false;
        });
    };

    return {
      error,
      processing,
      serverError,
      email,
      password,
      login,
      authChecked,
    };
  },
};
</script>

<style lang="scss">
.go-to-login {
  margin-top: 8px;

  a {
    text-decoration: none;
    opacity: 0.5;
    transition: opacity 0.5s;
    color: black;

    &:hover {
      opacity: 1;
      transition: opacity 0.5s;
    }

    font-size: 12px;
  }
}

.login_view {
  max-width: 320px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 50px;

  @media (max-width: 600px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .input-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
  }

  .input-error {
    color: rgb(199, 31, 31);
    display: inline;

    &:not(:empty) {
      margin-top: 8px;
    }
  }

  .form {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 18px;
    gap: 8px;

    .row {
      display: flex;
      gap: 8px;

      @media (max-width: 600px) {
        flex-direction: column;
      }
    }
  }

  @keyframes border-b-rot {
    from {
      bottom: -3px;
      left: 0%;
    }

    to {
      left: -100%;
      bottom: -3px;
    }
  }

  @keyframes border-t-rot {
    from {
      top: -3px;
      left: -100%;
    }

    to {
      left: 100%;
      top: -3px;
    }
  }

  .button-wrapper {
    overflow: hidden;
    width: 100%;
  }

  button {
    position: relative;
    margin-top: 20px;
    width: 100%;
    background-color: #e9d591;
    font-size: 16px;
    padding: 14px 0;
    transition: filter 0.5s;
    z-index: 0;

    &:disabled {
      opacity: 0.7;
    }

    &:after {
      content: "";
      display: flex;
      position: absolute;
      width: calc(100% - 4px);
      height: 3px;
      bottom: 0;
      background-color: #e9d591;
      z-index: 10;
    }

    &:before {
      content: "";
      display: flex;
      position: absolute;
      width: calc(100% - 4px);
      height: 3px;
      top: 0;
      background-color: #e9d591;
      z-index: 10;
    }

    &:hover {
      transition: filter 0.5s;
      filter: saturate(1.5);

      &::after {
        animation: border-b-rot 0.5s forwards;
      }

      &::before {
        animation: border-t-rot 0.5s forwards;
      }
    }
  }
}
</style>
