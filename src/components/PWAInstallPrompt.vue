<template>
  <div class="pwa-install-prompt" v-if="showPrompt" @click="handleInstall">
    <div class="prompt-content">
      <div class="prompt-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L12 14M12 14L8 10M12 14L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 17L3 19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19L21 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="prompt-text">
        <span class="prompt-title">Install Sleep Pet</span>
        <span class="prompt-subtitle">Add to home screen for better experience</span>
      </div>
      <button class="close-button" @click.stop="dismissPrompt">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showPrompt = ref(false)
let deferredPrompt = null

const handleBeforeInstallPrompt = (e) => {
  // 阻止默认的安装提示
  e.preventDefault()
  // 保存事件
  deferredPrompt = e
  // 显示自定义提示
  showPrompt.value = true
}

const handleInstall = async () => {
  if (!deferredPrompt) return
  
  // 显示安装提示
  deferredPrompt.prompt()
  
  // 等待用户响应
  const { outcome } = await deferredPrompt.userChoice
  
  console.log(`User response to the install prompt: ${outcome}`)
  
  // 清理
  deferredPrompt = null
  showPrompt.value = false
}

const dismissPrompt = () => {
  showPrompt.value = false
  deferredPrompt = null
  
  // 记住用户的选择，一段时间内不再显示
  localStorage.setItem('pwa-install-dismissed', Date.now().toString())
}

const handleAppInstalled = () => {
  console.log('PWA was installed')
  showPrompt.value = false
  deferredPrompt = null
}

onMounted(() => {
  // 检查是否已经安装或最近被拒绝
  const dismissed = localStorage.getItem('pwa-install-dismissed')
  if (dismissed) {
    const dismissedTime = parseInt(dismissed)
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000)
    if (dismissedTime > oneDayAgo) {
      return // 24小时内不再显示
    }
  }
  
  // 检查是否已经在 standalone 模式下运行
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return // 已经安装，不显示提示
  }
  
  // 监听安装提示事件
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.addEventListener('appinstalled', handleAppInstalled)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 10000;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prompt-content {
  background: linear-gradient(135deg, #D4B5A0 0%, #C8A690 100%);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.prompt-content:hover {
  transform: translateY(-2px);
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.2);
}

.prompt-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  flex-shrink: 0;
}

.prompt-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.prompt-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
}

.prompt-subtitle {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.close-button {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
}

@media (max-width: 480px) {
  .pwa-install-prompt {
    left: 16px;
    right: 16px;
    bottom: 16px;
  }
  
  .prompt-content {
    padding: 12px;
  }
  
  .prompt-title {
    font-size: 13px;
  }
  
  .prompt-subtitle {
    font-size: 11px;
  }
}
</style>