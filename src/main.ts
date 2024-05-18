import { createApp } from "vue";
import { createPinia } from "pinia";
import Vue3Toastify, { toast, type ToastContainerOptions } from 'vue3-toastify'
import App from "@/App.vue";
import router from "@/router";
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import { registerLayouts } from './components/layouts/register'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import 'vue3-toastify/dist/index.css'

const app = createApp(App);
const pinia = createPinia(); 
pinia.use(piniaPluginPersistedstate)

app.use(pinia);
app.use(router);
app.use(vuetify)
app.use(i18n)
app.use(Vue3Toastify, {
	autoClose: 5000,
	position: toast.POSITION.TOP_RIGHT,
	transition: toast.TRANSITIONS.ZOOM,
	theme: toast.THEME.COLORED,
	hideProgressBar: true,
} as ToastContainerOptions)

// Register all layout components
registerLayouts(app)

app.mount("#app");
