import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import LogIn from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Notifications from '../views/Notifications.vue'
import Newsletter from '../views/Newsletter.vue'






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
    path: '/profil',
    name: 'Profil',
    component: Profil
  },

  {
    path: '/LogIn',
    name: 'LogIn',
    component: LogIn
  },

  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },

  {
    path: '/Notifications',
    nom: 'Notifiations',
    component: Notifications
  },

  {
    path: '/Newsletter',
    nom: Newsletter,
    component: Newsletter
  }
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
