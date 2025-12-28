<template>
  <div class="sleep-mode-wrapper">
    <div class="sleep-mode-screen">
      <StatusBar />
      <div class="sleep-content" @click="goToInterrupted">
        <div class="cat-section">
          <LyingCat :state="'sleeping'" :custom-image="sleepGif" />
        </div>
        
        <p class="sleep-message">Let's lie down together</p>
      </div>
      
      <!-- Decorative circles -->
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
      <div class="decorative-circle circle-3"></div>
      <div class="decorative-circle circle-4"></div>
      
      <div class="bottom-indicator"></div>
    </div>
    
    <!-- 闹钟弹窗 -->
    <AlarmModal 
      :show="showAlarmModal" 
      @restMore="handleRestMore"
      @awakeNow="handleAwakeNow"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import LyingCat from '../components/LyingCat.vue'
import StatusBar from '../components/StatusBar.vue'
import AlarmModal from '../components/AlarmModal.vue'
import sleepGif from '../assets/images/sleep.gif'

const router = useRouter()
const showAlarmModal = ref(false)

const goToInterrupted = () => {
  if (!showAlarmModal.value) {
    router.push('/interrupted')
  }
}

// 监听闹钟触发事件
const handleAlarmTriggered = (event) => {
  console.log('睡眠页面：收到闹钟事件', event.detail)
  
  // 只有当前确实在睡眠页面时才处理
  if (router.currentRoute.value.path === '/sleep') {
    console.log('睡眠页面：确认在睡眠页面，显示闹钟弹窗')
    showAlarmModal.value = true
  } else {
    console.log('睡眠页面：不在睡眠页面，忽略事件')
  }
}

const handleRestMore = () => {
  console.log('用户选择继续睡觉')
  // 不关闭弹窗，让用户可以继续选择
  // showAlarmModal.value = false
  console.log('弹窗保持显示，用户可以继续选择')
}

const handleAwakeNow = () => {
  console.log('用户选择现在醒来')
  showAlarmModal.value = false
  // 直接跳转到梦境物品页面
  router.push('/dream-item')
}

onMounted(() => {
  console.log('睡眠页面：开始监听闹钟事件')
  // 监听闹钟事件
  window.addEventListener('alarmTriggered', handleAlarmTriggered)
})

onUnmounted(() => {
  console.log('睡眠页面：停止监听闹钟事件')
  // 清理事件监听
  window.removeEventListener('alarmTriggered', handleAlarmTriggered)
})
</script>

<style scoped>
.sleep-mode-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}

.sleep-mode-screen {
  width: 100%;
  max-width: 448px;
  height: 698px;
  background: linear-gradient(180deg, rgba(44, 62, 80, 1) 0%, rgba(52, 73, 94, 1) 100%);
  border-radius: 24px;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.sleep-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding: 48px 0;
  cursor: pointer;
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 200px;
}

.sleep-message {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -2.44140625%;
  color: #B8C5D6;
  text-align: center;
  width: 186px;
}

.decorative-circle {
  position: absolute;
  background: linear-gradient(135deg, #B8C5D6 0%, rgba(184, 197, 214, 0.8) 100%);
  border-radius: 50%;
  filter: blur(1px);
  animation: gentle-float 6s ease-in-out infinite;
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
  50% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
}

.circle-1 {
  width: 8px;
  height: 8px;
  top: 128px;
  left: 40px;
  opacity: 0.5068209767341614;
}

.circle-2 {
  width: 6px;
  height: 6px;
  top: 176px;
  right: 64px;
  opacity: 0.4311220049858093;
}

.circle-3 {
  width: 8px;
  height: 8px;
  bottom: 168px;
  left: 80px;
  opacity: 0.5;
}

.circle-4 {
  width: 4px;
  height: 4px;
  bottom: 228px;
  right: 52px;
  opacity: 0.46700799465179443;
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
  .sleep-mode-wrapper {
    padding: 0;
    min-height: 100vh;
    height: 100vh;
  }
  
  .sleep-mode-screen {
    height: 100vh;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 100vw;
  }
}

/* PWA Standalone mode specific styles */
@media (display-mode: standalone) {
  .sleep-mode-wrapper {
    padding: 0;
    min-height: 100vh;
    height: 100vh;
  }
  
  .sleep-mode-screen {
    height: 100vh;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 100vw;
  }
}
</style>

