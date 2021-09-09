import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import(/* webpackChunkName: "about" */ '../views/Table')
  },
  {
    path: '/cards',
    name: 'Cards',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cards')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard')
  },
  {
    path: '/auth',
    name: 'Authenticate',
    component: () => import(/* webpackChunkName: "about" */ '../views/Authenticate')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () =>  import('../views/Upload')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
