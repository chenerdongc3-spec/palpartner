import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SleepMode from '../views/SleepMode.vue'
import WakeUp from '../views/WakeUp.vue'
import DreamItem from '../views/DreamItem.vue'
import Interrupted from '../views/Interrupted.vue'
import DreamCollection from '../views/DreamCollection.vue'

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
  },
  {
    path: '/collection',
    name: 'DreamCollection',
    component: DreamCollection
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

