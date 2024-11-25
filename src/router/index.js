import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Regist from '../components/Regist.vue'
import ShowSchedule from '../components/ShowSchedule.vue'
import { userStore } from '../stores/userStore.js'

import pinia from '../pinia.js'
let user = userStore(pinia)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/showSchedule',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/regist',
      component: Regist,
    },
    {
      path: '/showSchedule',
      component: ShowSchedule,
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log(user)
  if (to.path == '/showSchedule' && user.username == '') {
    alert("You haven't login, please login to check the schedule")
    next('/login')
  } else {
    next()
  }
})

export default router
