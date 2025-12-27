<template>
  <div class="offline-indicator" v-if="!isOnline">
    <div class="offline-content">
      <div class="offline-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 9L12 2L21 9H19L12 4.5L5 9H3Z" fill="currentColor"/>
          <path d="M5 11V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V11" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <span class="offline-text">Offline Mode</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOnline = ref(navigator.onLine)

const handleOnline = () => {
  isOnline.value = true
}

const handleOffline = () => {
  isOnline.value = false
}

onMounted(() => {
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
})

onUnmounted(() => {
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
})
</script>

<style scoped>
.offline-indicator {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.offline-content {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
  border-radius: 12px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0px 4px 16px rgba(255, 107, 107, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.offline-icon {
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.offline-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #FFFFFF;
  white-space: nowrap;
}
</style>