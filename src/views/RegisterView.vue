<template>
    <div class="register_view">
        <div class="logo">
            <RouterLink to="/">
                <img src="@/assets/images/logo.svg" alt="" />
            </RouterLink>
        </div>

        <div class="form">
            <div class="input-wrapper">
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="Електронна пошта"
                />

                <small class="input-error">{{ error.email }}</small>
            </div>

            <div class="input-wrapper">
                <input
                    type="text"
                    id="phone"
                    v-model="phone"
                    placeholder="Номер телефону"
                />

                <small class="input-error">{{ error.phone }}</small>
            </div>

            <div class="input-wrapper">
                <input
                    type="password"
                    v-model="password"
                    id="password"
                    placeholder="Пароль"
                />

                <small class="input-error">{{ error.password }}</small>
            </div>

            <div class="row">
                <div class="input-wrapper">
                    <input
                        type="text"
                        v-model="surname"
                        id="surname"
                        placeholder="Прізвище"
                    />

                    <small class="input-error">{{ error.surname }}</small>
                </div>

                <div class="input-wrapper">
                    <input
                        type="text"
                        v-model="name"
                        id="name"
                        placeholder="Ім'я"
                    />

                    <small class="input-error">{{ error.name }}</small>
                </div>
            </div>
        </div>

        <div class="button-wrapper">
            <button
                id="submit-button"
                :disabled="processing"
                type="button"
                @click="send"
            >
                Зареєструватись
            </button>

            <div class="input-wrapper">
                <small class="input-error">{{ serverError }}</small>
            </div>

            <div id="captca"></div>
        </div>
    </div>
</template>

<script>
import Inputmask from "inputmask";
import { RouterLink } from "vue-router";
import validator from "validator";

import ProfileManager from "@/services/ProfileManager";

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

export default {
    name: "RegisterView",
    data() {
        return {
            processing: false,
            phone: "",
            email: "",
            password: "",
            name: "",
            surname: "",

            serverError: "",
            error: {
                email: "",
                phone: "",
                password: "",
                name: "",
                surname: "",
            },
        };
    },
    mounted() {
        Inputmask({ mask: "+380 999 999 999" }).mask(
            document.getElementById("phone")
        );
    },
    methods: {
        send() {
            let isError = false;
            this.error = {
                email: "",
                phone: "",
                password: "",
                name: "",
                surname: "",
            };
            this.serverError = "";

            const auth = getAuth();

            // Перевірка email
            const isValidEmail = validator.isEmail(this.email);
            if (!isValidEmail) {
                this.error.email = "Недійсна адреса електронної пошти";
                isError = true;
            }

            // Перевірка номера телефону
            const isValidPhone = validator.isMobilePhone(
                this.phone.replaceAll(" ", ""),
                "uk-UA"
            );
            if (!isValidPhone) {
                this.error.phone = "Недійсний номер телефону";
                isError = true;
            }

            // Перевірка пароля
            const isValidPassword = validator.isStrongPassword(this.password, {
                minLength: 8,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 0,
            });
            if (!isValidPassword) {
                this.error.password =
                    "Пароль повинен містити принаймні 8 символів латиницею";
                isError = true;
            }

            // Перевірка імені
            const isValidName = !validator.isEmpty(this.name);
            if (!isValidName) {
                this.error.name = "Поле імені не може бути порожнім";
                isError = true;
            }

            // Перевірка прізвища
            const isValidSurname = !validator.isEmpty(this.surname);
            if (!isValidSurname) {
                this.error.surname = "Поле прізвища не може бути порожнім";
                isError = true;
            }

            if (isError) {
                return false;
            }

            this.processing = true;
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: `${this.name} ${this.surname}`,
                    })
                        .then(() => {
                            const manager = new ProfileManager();
                            manager
                                .addProfile(this.phone, user.uid)
                                .then(() => {
                                    this.$router.push("/");
                                });
                        })
                        .catch((error) => {
                            this.serverError = error.message.replace(
                                "Firebase: ",
                                ""
                            );
                            this.processing = false;
                        });
                })
                .catch((error) => {
                    this.serverError = error.message.replace("Firebase: ", "");
                    this.processing = false;
                });
        },
    },
    components: {
        RouterLink,
    },
};
</script>

<style lang="scss">
.register_view {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    @media (max-width: 600px) {
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
    }
    #code {
        margin-top: 20px;
    }
    .input-wrapper {
        display: flex;
        max-width: 320px;
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
    .row {
        .input-wrapper {
            @media (max-width: 600px) {
                max-width: 320px;
            }
            max-width: 156px;
        }
    }
    .form {
        display: flex;
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
