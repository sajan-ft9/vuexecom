import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store';
import router from './router';
import apiClient from './axios';
import Toast, {POSITION} from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(Toast, {
    position:POSITION.BOTTOM_RIGHT,
    timeout:5000,
    closeOnClick:true,
    pauseOnHover:true,
});

app.use(store);
app.use(router);

app.config.globalProperties.$axios = apiClient;

app.mount('#app');
