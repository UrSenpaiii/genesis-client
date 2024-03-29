import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000'
createApp(App).use(createPinia()).mount('#app')
