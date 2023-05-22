import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import axiosPlugin from './plugins/axios.js';
import VueSSE from 'vue-sse';

import 'dotenv';
createApp(App)
    .use(axiosPlugin)
    .use(router)  
    .use(VueSSE, {
        url: `${import.meta.env.VITE_API_BASE_URL}`
    })
    .mount('#app')
    
