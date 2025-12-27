<template>
  <div class="dream-item-wrapper">
    <div class="dream-item-screen">
      <StatusBar />
      <div class="dream-item-content">
        <div class="item-container">
          <div class="dream-item-icon" :style="{ opacity: 0.8807780146598816 }" v-if="dreamItem">
            <span class="item-emoji">{{ dreamItem.emoji }}</span>
            <div class="rarity-indicator" :style="{ background: rarityConfig[dreamItem.rarity]?.color }">
              {{ rarityConfig[dreamItem.rarity]?.name }}
            </div>
          </div>
        </div>
        
        <div class="cat-section">
          <SleepyCat state="happy" />
        </div>
        
        <div class="text-section">
          <h1 class="dream-title">I found this in your dream</h1>
          <p class="dream-item-name" v-if="dreamItem">{{ dreamItem.name }}</p>
        </div>
        
        <button class="thank-button" @click="goHome">
          Thank you
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SleepyCat from '../components/SleepyCat.vue'
import StatusBar from '../components/StatusBar.vue'
import { addCollectedItem, getRandomItemByTheme, rarityConfig } from '../utils/dreamCollection.js'
import { useTheme } from '../composables/useTheme.js'

const router = useRouter()
const { currentThemeId } = useTheme()

const dreamItem = ref(null)

onMounted(() => {
  // 根据当前主题随机选择一个梦境物品
  const selectedItem = getRandomItemByTheme(currentThemeId.value)
  if (selectedItem) {
    dreamItem.value = selectedItem
    
    // 将物品添加到收藏中
    addCollectedItem(selectedItem.id)
  }
})

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.dream-item-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}

.dream-item-screen {
  width: 100%;
  max-width: 448px;
  height: 698px;
  background: linear-gradient(180deg, rgba(232, 213, 242, 1) 0%, rgba(212, 197, 232, 1) 100%);
  border-radius: 24px;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.dream-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 48px 0 32px;
  position: relative;
}

.item-container {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  z-index: 2;
}

.dream-item-icon {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.item-emoji {
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 8px;
}

.rarity-indicator {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin-top: 80px;
}

.text-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 280px;
  margin-top: 24px;
}

.dream-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -2.44140625%;
  color: #7B6B8E;
  text-align: center;
  width: 206px;
  margin: 0;
}

.dream-item-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.953125%;
  color: #9B8BAE;
  text-align: center;
  opacity: 0.7;
  width: 100%;
  margin: 0;
}

.thank-button {
  width: 320px;
  height: 64px;
  background: linear-gradient(135deg, #C8B6D6 0%, #B8A6C6 100%);
  border: none;
  border-radius: 32px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #FFFFFF;
  cursor: pointer;
  box-shadow: 0px 8px 24px rgba(200, 182, 214, 0.4);
  margin-top: 24px;
  margin-bottom: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.thank-button::before {
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

.thank-button:hover::before {
  opacity: 1;
}

.thank-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0px 12px 32px rgba(200, 182, 214, 0.5);
}

.thank-button:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0px 4px 16px rgba(200, 182, 214, 0.4);
}

.decorative-circle {
  position: absolute;
  background: #FFFFFF;
  border-radius: 50%;
  opacity: 0.5;
}

.circle-1 {
  width: 8px;
  height: 8px;
  top: 144px;
  left: 56px;
}

.circle-2 {
  width: 6px;
  height: 6px;
  top: 192px;
  right: 86px;
  opacity: 0.4238409996032715;
}

.circle-3 {
  width: 8px;
  height: 8px;
  bottom: 184px;
  left: 64px;
  opacity: 0.5663049817085266;
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
  .dream-item-wrapper {
    padding: 0;
    min-height: 100vh;
    height: 100vh;
  }
  
  .dream-item-screen {
    height: 100vh;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 100vw;
  }
  
  .text-section {
    width: calc(100% - 128px);
    max-width: 203px;
  }
  
  .thank-button {
    width: calc(100% - 128px);
    max-width: 320px;
  }
}

/* PWA Standalone mode specific styles */
@media (display-mode: standalone) {
  .dream-item-wrapper {
    padding: 0;
    min-height: 100vh;
    height: 100vh;
  }
  
  .dream-item-screen {
    height: 100vh;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 100vw;
  }
}
</style>
