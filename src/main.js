import './assets/styles.css'
import SimpleAnalytics from "simple-analytics-vue";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(SimpleAnalytics, { skip: process.env.NODE_ENV !== "production" });

app.mount('#app')
