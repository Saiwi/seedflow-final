import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import firestore from "./firebase";
import { Firestore } from "@firebase/firestore";
declare global {
    interface Window {
        db: Firestore,
    }
}
window.db = firestore;

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
