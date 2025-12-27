<template>
  <div class="dream-item-wrapper">
    <div class="dream-item-screen">
      <StatusBar />
      <div class="dream-item-content">
        <div class="item-container">
          <div class="dream-item-icon" :style="{ opacity: 0.8807780146598816 }">
            <span class="item-emoji">{{ dreamItem.emoji }}</span>
          </div>
        </div>
        
        <div class="cat-section">
          <SleepyCat state="happy" />
        </div>
        
        <div class="text-section">
          <h1 class="dream-title">I found this in your dream</h1>
          <p class="dream-item-name">{{ dreamItem.name }}</p>
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

const router = useRouter()

const dreamItems = [
  { emoji: '⭐', name: 'star' },
  { emoji: '🛏️', name: 'blanket' },
  { emoji: '💡', name: 'light' },
  { emoji: '🌙', name: 'moon' },
  { emoji: '✨', name: 'sparkle' },
  { emoji: '🦋', name: 'butterfly' },
  { emoji: '🌸', name: 'flower' },
  { emoji: '🍃', name: 'leaf' }
]

const dreamItem = ref(dreamItems[0])

onMounted(() => {
  // 随机选择一个梦境物品
  const randomIndex = Math.floor(Math.random() * dreamItems.length)
  dreamItem.value = dreamItems[randomIndex]
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
  border-radius: 0;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.dream-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  position: relative;
}

.item-container {
  position: absolute;
  top: 171px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
}

.dream-item-icon {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.item-emoji {
  font-size: 3rem;
  line-height: 1;
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin-top: 171px;
}

.text-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 203px;
  margin-top: 32px;
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
  background: #C8B6D6;
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

.thank-button:active {
  transform: scale(0.98);
  opacity: 0.9;
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
  }
  
  .dream-item-screen {
    height: 100vh;
    max-height: 698px;
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
</style>
