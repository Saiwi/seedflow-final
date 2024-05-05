import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import firebase from "./firebase";

window.db = firebase.firestore;

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
