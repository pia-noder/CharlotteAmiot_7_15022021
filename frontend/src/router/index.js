import Vue from 'vue'

import Router from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import LogIn from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Notifications from '../views/Notifications.vue'
import Newsletter from '../views/Newsletter.vue'


Vue.use(Router)

const routes = [
  {
    path: '/home/:userId',
    name: 'Home',
    component: Home,
    meta:{ 
      requiresAuth: true
    }
  },
  
  {
    path: '/profile/:userId',
    name: 'Profile',
    component: Profil,
    meta:{ 
      requiresAuth: true
    }
  },

  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },

  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },

  {
    path: '/Notifications/:userId',
    name: 'Notifications',
    component: Notifications,
    meta:{ 
      requiresAuth: true
    }
  },

  {
    path: '/Newsletter',
    name: 'Newsletter',
    component: Newsletter,
    meta:{ 
      requiresAuth: true
    }
  }
  

]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to, from, next) => {
  if(to.meta.requiresAuth){

    if(!localStorage.getItem('userToken') || !localStorage.getItem('userID')){
      next({
        name: "LogIn"
      })
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
