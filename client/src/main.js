import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import axiosPlugin from './plugins/axios.js';
import 'dotenv';
createApp(App)
    .use(axiosPlugin)
    .use(router)  
    .mount('#app')
