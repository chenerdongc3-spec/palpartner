import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initAlarmManager } from './utils/alarmManager.js'

// 初始化闹钟管理器
initAlarmManager()

createApp(App).use(router).mount('#app')

