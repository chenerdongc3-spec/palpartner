<template>
  <div class="alarm-modal-overlay" v-if="show">
    <div class="alarm-modal">
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
            
            <!-- 眼睛（闭着的） -->
            <line x1="45" y1="55" x2="55" y2="55" stroke="#2C3E5A" stroke-width="3" stroke-linecap="round"/>
            <line x1="65" y1="55" x2="75" y2="55" stroke="#2C3E5A" stroke-width="3" stroke-linecap="round"/>
            
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
      
      <div class="message">
        睡觉时间到啦！
      </div>
      
      <div class="button-group">
        <button class="rest-more-btn" @click="handleRestMore">
          Rest more
        </button>
        <button class="awake-now-btn" @click="handleAwakeNow">
          Awake now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['restMore', 'awakeNow'])

const handleRestMore = () => {
  emit('restMore')
}

const handleAwakeNow = () => {
  emit('awakeNow')
}
</script>

<style scoped>
.alarm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(44, 62, 80, 0.8);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.alarm-modal {
  width: 100%;
  max-width: 360px;
  background: linear-gradient(180deg, rgba(58, 79, 99, 1) 0%, rgba(44, 62, 80, 1) 100%);
  border-radius: 24px;
  padding: 40px 32px 32px;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cat-character {
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 10px;
}

.cat-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: gentle-breathe 3s ease-in-out infinite;
}

@keyframes gentle-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.message {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #B8C5D6;
  text-align: center;
  animation: gentle-pulse 2s ease-in-out infinite;
}

@keyframes gentle-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.button-group {
  display: flex;
  gap: 16px;
  width: 100%;
}

.rest-more-btn,
.awake-now-btn {
  flex: 1;
  height: 56px;
  border: none;
  border-radius: 28px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.2s;
}

.rest-more-btn {
  background: rgba(255, 255, 255, 0.15);
  color: #B8C5D6;
  border: 1px solid rgba(184, 197, 214, 0.3);
}

.rest-more-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.rest-more-btn:active {
  transform: translateY(0);
  opacity: 0.8;
}

.awake-now-btn {
  background: #5A6F84;
  color: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.awake-now-btn:hover {
  background: #6B7F94;
  transform: translateY(-1px);
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
}

.awake-now-btn:active {
  transform: translateY(0);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 480px) {
  .alarm-modal {
    max-width: calc(100vw - 40px);
    padding: 32px 24px 24px;
  }
  
  .button-group {
    flex-direction: column;
    gap: 12px;
  }
  
  .rest-more-btn,
  .awake-now-btn {
    width: 100%;
  }
}
</style>