import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: "Login",
    component: () => import('../views/Login.vue')
  },
  {
    path:'/Evento',
    name: 'Evento',
    component: () => import('../views/Evento.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
