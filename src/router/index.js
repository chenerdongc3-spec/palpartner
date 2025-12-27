import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SleepMode from '../views/SleepMode.vue'
import WakeUp from '../views/WakeUp.vue'
import DreamItem from '../views/DreamItem.vue'
import Interrupted from '../views/Interrupted.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sleep',
    name: 'SleepMode',
    component: SleepMode
  },
  {
    path: '/wake-up',
    name: 'WakeUp',
    component: WakeUp
  },
  {
    path: '/dream-item',
    name: 'DreamItem',
    component: DreamItem
  },
  {
    path: '/interrupted',
    name: 'Interrupted',
    component: Interrupted
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

