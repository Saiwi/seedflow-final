import 'remixicon/fonts/remixicon.css'
import "./assets/main.scss";
import "vue-draggable-resizable/style.css";

import 'select2/dist/css/select2.min.css';
import $ from 'jquery';
window.$ = $;
import 'select2';

import VueDraggableResizable from 'vue-draggable-resizable'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import firebase from "./firebase";

window.db = firebase.firestore;
window.storage = firebase.storage;
window.f = function (amount) {
    if (!amount) {
        return amount;
    }
    return amount.toLocaleString('uk-UA', { style: 'currency', currency: 'UAH' });
};

const app = createApp(App);

app.config.warnHandler = function (msg, vm, trace) {
    return null
}

app.use(createPinia());
app.component("vue-draggable-resizable", VueDraggableResizable)
app.use(router);

app.mount("#app");
