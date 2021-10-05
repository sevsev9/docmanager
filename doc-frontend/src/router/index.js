import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
import Login from "@/views/Login";
import Register from "@/views/Register";
import Profile from "@/views/Profile";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    get component() {
      if (store.getters.loggedIn) {
        return Home;
      } else return Login;
    }
  },
  {
    path: '/register',
    name: 'Register',
    get component() {
      if (store.getters.isAdmin) {
        return Home;
      } else return Register;
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    get component() {
      if (store.getters.loggedIn) {
        return Profile;
      } else return Login;
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
