import Vue from 'vue'
import VueRouter from 'vue-router'
import MainActivity from '../views/MainActivity.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainActivity',
    component: MainActivity
  },
]

const router = new VueRouter({
  routes
})

export default router
