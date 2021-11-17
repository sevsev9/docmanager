import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Home from '@/views/Home'
import About from "@/views/About";

import Login from "@/views/Login";
import Register from "@/views/Register";
import Profile from "@/views/Profile";
import Dashboard from "@/views/Dashboard";

import Stats from "../views/file/Stats";
import FileTable from "../views/file/FileTable";
import FileUpload from "../views/file/FileUpload";
import FileList from "../views/file/FileList";
import session_info from "@/views/debug/session_info";

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
    component: About
  },
  {
    path: '/session-info',
    name: "Debug Session Info",
    component: session_info
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
  },
  {
    path: '/file',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'stats',
        component: Stats
      },
      {
        path: 'table',
        component: FileTable
      },
      {
        path: 'upload',
        component: FileUpload
      },
      {
        path: 'list',
        component: FileList
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router