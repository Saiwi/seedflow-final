import 'remixicon/fonts/remixicon.css'
import "./assets/main.scss";
import "vue-draggable-resizable/style.css";

import 'select2/dist/css/select2.min.css';
import $ from 'jquery';
window.$ = $;
import 'select2';

import VueDraggableResizable from 'vue-draggable-resizable';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import firebase from "./firebase";

window.db = firebase.firestore;
window.storage = firebase.storage;
window.f = function (amount, currency = true) {
    if (!amount) {
        return amount;
    }
    if (!currency) {
        return amount.toLocaleString('uk-UA');
    }
    return amount.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH' });
};
window.catalogsGlobal = {};

const app = createApp(App);

app.config.warnHandler = function (msg, vm, trace) {
    return null
}

const store = createPinia();

store.use(piniaPluginPersistedstate);

app.use(store);

app.component("vue-draggable-resizable", VueDraggableResizable)
app.use(router);

app.mount("#app");
