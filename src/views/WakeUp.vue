<template>
  <div class="wake-up-wrapper">
    <div class="wake-up-screen">
      <StatusBar />
      <div class="wake-up-content">
        <div class="cat-section">
          <StretchingCat />
        </div>
        
        <div class="text-section">
          <h1 class="greeting">Good morning!</h1>
          <p class="sub-text">I brought you something from your dream</p>
        </div>
        
        <button class="awake-button" @click="handleWakeUp">
          I'm awake
        </button>
      </div>
      
      <!-- Decorative circles -->
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
      <div class="decorative-circle circle-3"></div>
      
      <div class="bottom-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import StretchingCat from '../components/StretchingCat.vue'
import StatusBar from '../components/StatusBar.vue'

const router = useRouter()

const handleWakeUp = () => {
  // 可以在这里添加检查是否有梦境物品的逻辑
  // 如果有，跳转到梦境物品页面；否则返回主页
  const hasDreamItem = Math.random() > 0.5 // 示例逻辑
  
  if (hasDreamItem) {
    router.push('/dream-item')
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.wake-up-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}

.wake-up-screen {
  width: 100%;
  max-width: 448px;
  height: 698px;
  background: linear-gradient(180deg, rgba(255, 244, 230, 1) 0%, rgba(255, 232, 204, 1) 50%, rgba(255, 217, 168, 1) 100%);
  border-radius: 0;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.wake-up-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  position: relative;
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 200px;
  margin-top: 125px;
}

.text-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 300px;
  padding: 0 16px;
  margin-top: 32px;
}

.greeting {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -2.44140625%;
  color: #8B7355;
  text-align: center;
  width: 121px;
  margin: 0;
}

.sub-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -1.07421875%;
  color: #A8906F;
  text-align: center;
  opacity: 0.8;
  width: 269px;
  margin: 0;
}

.awake-button {
  width: 320px;
  height: 64px;
  background: #FFB366;
  border: none;
  border-radius: 9999px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.953125%;
  color: #FFFFFF;
  cursor: pointer;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-top: 32px;
  transition: all 0.2s;
}

.awake-button:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.decorative-circle {
  position: absolute;
  background: #FFD700;
  border-radius: 50%;
}

.circle-1 {
  width: 12px;
  height: 12px;
  top: 112px;
  right: 60px;
  opacity: 0.5610049962997437;
}

.circle-2 {
  width: 8px;
  height: 8px;
  top: 160px;
  left: 64px;
  opacity: 0.4819749891757965;
}

.circle-3 {
  width: 10px;
  height: 10px;
  bottom: 202px;
  right: 90px;
  opacity: 0.5;
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
  .wake-up-wrapper {
    padding: 0;
  }
  
  .wake-up-screen {
    height: 100vh;
    max-height: 698px;
  }
  
  .text-section {
    width: calc(100% - 32px);
  }
  
  .awake-button {
    width: calc(100% - 128px);
    max-width: 320px;
  }
}
</style>

