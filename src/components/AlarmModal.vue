<template>
  <div class="alarm-modal-overlay" v-if="show" @click.self="handleRestMore">
    <div class="alarm-modal">
      <!-- 装饰性圆圈 -->
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
      <div class="decorative-circle circle-3"></div>
      
      <div class="modal-content">
        <div class="cat-section">
          <div class="cat-character">
            <svg 
              viewBox="0 0 120 120" 
              xmlns="http://www.w3.org/2000/svg"
              class="cat-svg"
            >
              <!-- 猫的头 -->
              <circle cx="60" cy="60" r="45" fill="#D4C5B9" class="cat-head"/>
              
              <!-- 耳朵 -->
              <path d="M 30 25 L 40 45 L 35 50 Z" fill="#D4C5B9" class="cat-ear"/>
              <path d="M 90 25 L 80 45 L 85 50 Z" fill="#D4C5B9" class="cat-ear"/>
              
              <!-- 眼睛（睁开的，表示醒来） -->
              <circle cx="50" cy="55" r="4" fill="#2C3E5A"/>
              <circle cx="70" cy="55" r="4" fill="#2C3E5A"/>
              <circle cx="50" cy="54" r="1.5" fill="#FFFFFF"/>
              <circle cx="70" cy="54" r="1.5" fill="#FFFFFF"/>
              
              <!-- 鼻子 -->
              <ellipse cx="60" cy="65" rx="3" ry="2" fill="#E8B4B8"/>
              
              <!-- 嘴巴（微笑） -->
              <path d="M 60 68 Q 55 75 50 70" stroke="#2C3E5A" stroke-width="2" fill="none" stroke-linecap="round"/>
              <path d="M 60 68 Q 65 75 70 70" stroke="#2C3E5A" stroke-width="2" fill="none" stroke-linecap="round"/>
              
              <!-- 胡须 -->
              <line x1="25" y1="60" x2="35" y2="58" stroke="#2C3E5A" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="25" y1="65" x2="35" y2="65" stroke="#2C3E5A" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="85" y1="58" x2="95" y2="60" stroke="#2C3E5A" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="85" y1="65" x2="95" y2="65" stroke="#2C3E5A" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        
        <div class="text-section">
          <h2 class="alarm-title">Time to wake up!</h2>
          <p class="alarm-subtitle">Your sleep companion is ready to help you start the day</p>
        </div>
        
        <div class="button-group">
          <button class="rest-more-btn" @click="handleRestMore">
            <span class="button-icon">😴</span>
            Rest more
          </button>
          <button class="awake-now-btn" @click="handleAwakeNow">
            <span class="button-icon">☀️</span>
            Awake now!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['restMore', 'awakeNow'])

const { currentTheme } = useTheme()

const handleRestMore = () => {
  emit('restMore')
}

const handleAwakeNow = () => {
  emit('awakeNow')
}

// 防止背景滚动
onMounted(() => {
  if (props.show) {
    document.body.style.overflow = 'hidden'
  }
  
  return () => {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.alarm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--alarm-overlay, linear-gradient(135deg, rgba(44, 62, 80, 0.9) 0%, rgba(58, 79, 99, 0.9) 100%));
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(20px);
  animation: overlayFadeIn 0.3s ease-out;
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.alarm-modal {
  width: 100%;
  max-width: 380px;
  background: var(--alarm-background, linear-gradient(180deg, rgba(58, 79, 99, 1) 0%, rgba(44, 62, 80, 1) 100%));
  border-radius: 32px;
  box-shadow: 0px 32px 64px -12px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-content {
  padding: 48px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 2;
}

.decorative-circle {
  position: absolute;
  background: linear-gradient(135deg, #B8C5D6 0%, rgba(184, 197, 214, 0.6) 100%);
  border-radius: 50%;
  filter: blur(1px);
  animation: gentle-float 8s ease-in-out infinite;
}

@keyframes gentle-float {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
  50% { transform: translateY(-15px) scale(1.2); opacity: 0.7; }
}

.circle-1 {
  width: 12px;
  height: 12px;
  top: 60px;
  left: 40px;
  animation-delay: 0s;
}

.circle-2 {
  width: 8px;
  height: 8px;
  top: 100px;
  right: 50px;
  animation-delay: 2s;
}

.circle-3 {
  width: 10px;
  height: 10px;
  bottom: 80px;
  left: 60px;
  animation-delay: 4s;
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cat-character {
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  padding: 15px;
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cat-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  animation: gentle-breathe 4s ease-in-out infinite;
}

@keyframes gentle-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

.text-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.alarm-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: var(--alarm-text, #FFFFFF);
  margin: 0;
  animation: gentle-pulse 3s ease-in-out infinite;
}

@keyframes gentle-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.02); }
}

.alarm-subtitle {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: var(--alarm-text-secondary, #B8C5D6);
  opacity: 0.8;
  margin: 0;
  max-width: 280px;
}

.button-group {
  display: flex;
  gap: 16px;
  width: 100%;
}

.rest-more-btn,
.awake-now-btn {
  flex: 1;
  height: 64px;
  border: none;
  border-radius: 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.button-icon {
  font-size: 18px;
  line-height: 1;
}

.rest-more-btn {
  background: var(--alarm-button-secondary, rgba(255, 255, 255, 0.1));
  color: var(--alarm-text-secondary, #B8C5D6);
  border: 2px solid rgba(184, 197, 214, 0.3);
  backdrop-filter: blur(10px);
}

.rest-more-btn::before {
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

.rest-more-btn:hover::before {
  opacity: 1;
}

.rest-more-btn:hover {
  background: var(--alarm-button-secondary, rgba(255, 255, 255, 0.15));
  border-color: rgba(184, 197, 214, 0.5);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0px 8px 24px rgba(184, 197, 214, 0.2);
}

.rest-more-btn:active {
  transform: translateY(0) scale(0.98);
  background: var(--alarm-button-secondary, rgba(255, 255, 255, 0.08));
}

.awake-now-btn {
  background: var(--alarm-button-primary, linear-gradient(135deg, #5A6F84 0%, #4A5F74 100%));
  color: var(--alarm-text, #FFFFFF);
  box-shadow: 0px 8px 24px rgba(90, 111, 132, 0.4);
}

.awake-now-btn::before {
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

.awake-now-btn:hover::before {
  opacity: 1;
}

.awake-now-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0px 12px 32px rgba(90, 111, 132, 0.5);
}

.awake-now-btn:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0px 4px 16px rgba(90, 111, 132, 0.4);
}

@media (max-width: 480px) {
  .alarm-modal {
    max-width: calc(100vw - 40px);
    border-radius: 24px;
  }
  
  .modal-content {
    padding: 40px 24px 24px;
    gap: 24px;
  }
  
  .cat-character {
    width: 120px;
    height: 120px;
  }
  
  .alarm-title {
    font-size: 20px;
    line-height: 28px;
  }
  
  .alarm-subtitle {
    font-size: 14px;
    line-height: 20px;
  }
  
  .button-group {
    flex-direction: column;
    gap: 12px;
  }
  
  .rest-more-btn,
  .awake-now-btn {
    width: 100%;
    height: 56px;
  }
}

/* PWA Standalone mode adjustments */
@media (display-mode: standalone) {
  .alarm-modal-overlay {
    padding: 16px;
  }
  
  .alarm-modal {
    max-width: calc(100vw - 32px);
  }
}
</style>