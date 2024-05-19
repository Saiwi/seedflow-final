import 'remixicon/fonts/remixicon.css'
import "./assets/main.css";
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

const app = createApp(App);

app.config.warnHandler = function (msg, vm, trace) {
    return null
}

app.use(createPinia());
app.component("vue-draggable-resizable", VueDraggableResizable)
app.use(router);

app.mount("#app");
