import '@babel/polyfill'
import 'mutationobserver-shim'
import dotenv from 'dotenv'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false
dotenv.config();
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.API_ENDPOINT_BASE_URL
});

Vue.prototype.$axios = axiosInstance;


const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
