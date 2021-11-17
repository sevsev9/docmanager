import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import GAuth from 'vue-google-oauth2'
import axios from 'axios'

Vue.config.productionTip = false;

Vue.use(GAuth, {
  clientId: '1055699999570-uh87rtjeqqvhbpa0gctkqmiinbskjttb.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
  fetch_basic_profile: true
})

const instance = axios.create({
  withCredentials: true
})

Vue.prototype.$axios = instance;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
