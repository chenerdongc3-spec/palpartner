<template>
  <div class="home-screen-wrapper">
    <div class="home-screen">
      <StatusBar />
      
      <!-- Theme Selector -->
      <div class="theme-selector-container">
        <ThemeSelector />
      </div>
      
      <!-- Achievement Button -->
      <div class="achievement-button-container">
        <button class="achievement-button" @click="goToCollection">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9C18 7.4087 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.4087 6 9Z" stroke="#D4B5A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15L8 21L12 19L16 21L12 15Z" stroke="#D4B5A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="home-content">
        <div class="cat-section">
          <SleepyCat :state="catState" />
        </div>
        
        <p class="sleepy-text">I'm getting sleepy…</p>
        
        <button class="rest-button" @click="showAlarm = true">
          Rest together
        </button>
      </div>
      <div class="bottom-indicator"></div>
    </div>
    
    <AlarmBottomSheet 
      :show="showAlarm" 
      @close="showAlarm = false"
      @set="handleSetAlarm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import SleepyCat from '../components/SleepyCat.vue'
import StatusBar from '../components/StatusBar.vue'
import AlarmBottomSheet from '../components/AlarmBottomSheet.vue'
import ThemeSelector from '../components/ThemeSelector.vue'
import { setAlarm, initAlarmManager, getActiveAlarm } from '../utils/alarmManager.js'
import { useTheme } from '../composables/useTheme.js'

const router = useRouter()
const catState = ref('awake')
const showAlarm = ref(false)
const { currentTheme } = useTheme()

const goToSleep = () => {
  router.push('/sleep')
}

const goToCollection = () => {
  router.push('/collection')
}

const handleSetAlarm = (alarmData) => {
  // 设置闹钟
  const alarmInfo = setAlarm(alarmData)
  console.log('闹钟设置成功:', alarmInfo)
  goToSleep()
}

// 监听闹钟触发事件
const handleAlarmTriggered = (event) => {
  const { currentPath } = event.detail
  console.log('🏠 主页收到闹钟事件，当前页面:', currentPath)
  console.log('🏠 事件详情:', event.detail)
  
  // 只有当前确实在主页时才处理
  if (router.currentRoute.value.path === '/') {
    console.log('🏠 确认在主页，跳转到唤醒页面')
    router.push('/wake-up')
  } else {
    console.log('🏠 不在主页，忽略事件')
  }
}

// 可以根据时间或状态改变猫的表情
onMounted(() => {
  // 初始化闹钟管理器
  initAlarmManager()
  
  // 监听闹钟事件
  window.addEventListener('alarmTriggered', handleAlarmTriggered)
  
  const hour = new Date().getHours()
  if (hour >= 21 || hour <= 6) {
    catState.value = 'sleepy'
  }
  
  // 检查是否有活跃的闹钟
  const activeAlarm = getActiveAlarm()
  if (activeAlarm) {
    console.log('发现活跃闹钟:', activeAlarm.time24)
  }
})

onUnmounted(() => {
  // 清理事件监听
  window.removeEventListener('alarmTriggered', handleAlarmTriggered)
})
</script>

<style scoped>
.home-screen-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}

.home-screen {
  width: 100%;
  max-width: 448px;
  height: 698px;
  background: var(--theme-background, linear-gradient(180deg, rgba(245, 235, 224, 1) 0%, rgba(232, 213, 196, 1) 100%));
  border-radius: 24px;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.home-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  position: relative;
}

.theme-selector-container {
  position: absolute;
  top: 60px;
  left: 24px;
  z-index: 10;
}

.achievement-button-container {
  position: absolute;
  top: 60px;
  right: 24px;
  z-index: 10;
}

.achievement-button {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.achievement-button:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.16);
}

.achievement-button:active {
  transform: translateY(0) scale(1);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 260px;
  margin-top: 100px;
}

.sleepy-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.953125%;
  color: #6B6B6B;
  text-align: center;
  opacity: 0.7;
  margin-top: 28px;
  width: 140px;
}

.rest-button {
  width: 320px;
  height: 64px;
  background: linear-gradient(135deg, var(--theme-primary, #D4B5A0) 0%, var(--theme-secondary, #C8A690) 100%);
  border: none;
  border-radius: 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #FFFFFF;
  cursor: pointer;
  box-shadow: 0px 8px 24px rgba(212, 181, 160, 0.4);
  margin-top: 40px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.rest-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  border-radius: 32px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.rest-button:hover::before {
  opacity: 1;
}

.rest-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0px 12px 32px rgba(212, 181, 160, 0.5);
}

.rest-button:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0px 4px 16px rgba(212, 181, 160, 0.4);
}

.bottom-indicator {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 128px;
  height: 4px;
  background: #000000;
  opacity: 0.3;
  border-radius: 9999px;
}

@media (max-width: 480px) {
  .home-screen-wrapper {
    padding: 0;
    min-height: 100vh;
    height: 100vh;
  }
  
  .home-screen {
    height: 100vh;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 100vw;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .rest-button {
    width: calc(100% - 128px);
    max-width: 320px;
  }
}

/* PWA Standalone mode specific styles */
@media (display-mode: standalone) {
  .home-screen-wrapper {
    padding: 0;
    min-height: 100vh;
    height: 100vh;
  }
  
  .home-screen {
    height: 100vh;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 100vw;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
