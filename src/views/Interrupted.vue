<template>
  <div class="interrupted-wrapper">
    <div class="interrupted-screen">
      <StatusBar />
      <div class="interrupted-content">
        <div class="cat-section">
          <LyingCat state="confused" :custom-image="sleepGif" />
        </div>
        
        <p class="interrupted-message" :class="{ 'alarm-message': isAlarmTriggered }">
          {{ isAlarmTriggered ? "Time to wake up!" : "Are we still awake?" }}
        </p>
        
        <div class="button-group">
          <button class="rest-more-button" @click="continueSleep" v-if="!isAlarmTriggered">
            Let's rest more
          </button>
          <button class="awake-button" @click="wakeUp">
            {{ isAlarmTriggered ? "I'm awake!" : "I'm awake now" }}
          </button>
        </div>
      </div>
      <div class="bottom-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LyingCat from '../components/LyingCat.vue'
import StatusBar from '../components/StatusBar.vue'
import sleepGif from '../assets/images/sleep.gif'

const router = useRouter()
const route = useRoute()
const isAlarmTriggered = ref(false)

const continueSleep = () => {
  router.push('/sleep')
}

const wakeUp = () => {
  router.push('/wake-up')
}

// 监听闹钟触发事件
const handleAlarmTriggered = (event) => {
  console.log('中断页面：检测到闹钟触发')
  isAlarmTriggered.value = true
}

onMounted(() => {
  // 检查是否是通过闹钟触发进入的页面
  if (route.query.alarm === 'true') {
    isAlarmTriggered.value = true
  }
  
  // 监听闹钟事件
  window.addEventListener('alarmTriggered', handleAlarmTriggered)
})

onUnmounted(() => {
  // 清理事件监听
  window.removeEventListener('alarmTriggered', handleAlarmTriggered)
})
</script>

<style scoped>
.interrupted-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}

.interrupted-screen {
  width: 100%;
  max-width: 448px;
  height: 698px;
  background: linear-gradient(180deg, rgba(58, 79, 99, 1) 0%, rgba(44, 62, 80, 1) 100%);
  border-radius: 24px;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.interrupted-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  position: relative;
  justify-content: space-between;
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 260px;
  margin-top: 80px;
}

.interrupted-message {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -2.44140625%;
  color: #B8C5D6;
  text-align: center;
  width: 154px;
  transition: all 0.3s ease;
}

.interrupted-message.alarm-message {
  color: #FFD700;
  font-weight: 500;
  animation: gentle-pulse 2s ease-in-out infinite;
}

@keyframes gentle-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: 320px;
  padding: 13px 0 16px;
  margin-top: auto;
}

.rest-more-button {
  width: 320px;
  height: 64px;
  background: linear-gradient(135deg, #5A6F84 0%, #4A5F74 100%);
  border: none;
  border-radius: 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #FFFFFF;
  cursor: pointer;
  box-shadow: 0px 8px 24px rgba(90, 111, 132, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.rest-more-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 32px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.rest-more-button:hover::before {
  opacity: 1;
}

.rest-more-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0px 12px 32px rgba(90, 111, 132, 0.5);
}

.rest-more-button:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0px 4px 16px rgba(90, 111, 132, 0.4);
}

.awake-button {
  width: 320px;
  height: 66px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(184, 197, 214, 0.3);
  border-radius: 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #B8C5D6;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.awake-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(184, 197, 214, 0.5);
  transform: translateY(-1px);
  box-shadow: 0px 8px 24px rgba(184, 197, 214, 0.2);
}

.awake-button:active {
  transform: translateY(0) scale(0.98);
  background: rgba(255, 255, 255, 0.08);
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
  .interrupted-wrapper {
    padding: 0;
    min-height: 100vh;
    height: 100vh;
  }
  
  .interrupted-screen {
    height: 100vh;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 100vw;
  }
  
  .button-group {
    width: calc(100% - 128px);
  }
  
  .rest-more-button,
  .awake-button {
    width: 100%;
  }
}

/* PWA Standalone mode specific styles */
@media (display-mode: standalone) {
  .interrupted-wrapper {
    padding: 0;
    min-height: 100vh;
    height: 100vh;
  }
  
  .interrupted-screen {
    height: 100vh;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 100vw;
  }
}
</style>

