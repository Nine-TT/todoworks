import "./assets/main.css"

import { createApp } from 'vue'
import App from './App.vue'

import router from "./router/router";
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from "./store";

const app = createApp(App);

app.use(store)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
