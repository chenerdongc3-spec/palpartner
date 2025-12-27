<template>
  <div class="dream-collection-wrapper">
    <div class="dream-collection-screen">
      <StatusBar />
      
      <!-- Header -->
      <div class="header">
        <button class="back-button" @click="goBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#8B7355" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="title">梦境收藏</h1>
        <div class="header-spacer"></div>
      </div>
      
      <!-- Date Section -->
      <div class="date-section">
        <span class="date-label">今天</span>
      </div>
      
      <!-- Collection Grid -->
      <div class="collection-content">
        <div class="items-grid">
          <div 
            v-for="item in collectedItems" 
            :key="item.id"
            class="dream-item-card"
          >
            <div class="item-icon">
              <span class="item-emoji">{{ item.emoji }}</span>
            </div>
            <span class="item-name">{{ item.name }}</span>
          </div>
          
          <!-- Empty slots -->
          <div 
            v-for="n in emptySlots" 
            :key="`empty-${n}`"
            class="dream-item-card empty"
          >
            <div class="item-icon empty-icon">
              <span class="empty-placeholder">?</span>
            </div>
            <span class="item-name empty-name">未知</span>
          </div>
        </div>
      </div>
      
      <!-- Bottom Stats -->
      <div class="bottom-stats">
        <p class="stats-text">总共收集了 {{ collectedItems.length }} 个梦境物品</p>
      </div>
      
      <div class="bottom-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StatusBar from '../components/StatusBar.vue'
import { getCollectedItems, dreamItems } from '../utils/dreamCollection.js'

const router = useRouter()
const collectedItems = ref([])

// 计算空白槽位数量（显示网格布局）
const emptySlots = computed(() => {
  const totalSlots = 8 // 总共显示8个槽位
  return Math.max(0, totalSlots - collectedItems.value.length)
})

onMounted(() => {
  const collectedIds = getCollectedItems()
  collectedItems.value = collectedIds.map(id => {
    return dreamItems.find(item => item.id === id)
  }).filter(Boolean)
})

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.dream-collection-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}

.dream-collection-screen {
  width: 100%;
  max-width: 448px;
  height: 698px;
  background: linear-gradient(180deg, rgba(245, 235, 224, 1) 0%, rgba(232, 213, 196, 1) 100%);
  border-radius: 24px;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  height: 56px;
}

.back-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-2px);
}

.title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #8B7355;
  margin: 0;
}

.header-spacer {
  width: 40px;
}

.date-section {
  padding: 0 24px 16px;
}

.date-label {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #A8906F;
}

.collection-content {
  flex: 1;
  padding: 0 24px;
  overflow-y: auto;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding-bottom: 24px;
}

.dream-item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dream-item-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.9);
}

.dream-item-card.empty {
  background: rgba(255, 255, 255, 0.3);
  opacity: 0.6;
  border: 2px dashed rgba(139, 115, 85, 0.3);
}

.dream-item-card.empty:hover {
  transform: none;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
}

.item-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  background: rgba(255, 255, 255, 0.4);
}

.item-emoji {
  font-size: 2rem;
  line-height: 1;
}

.empty-placeholder {
  font-size: 1.5rem;
  color: #A8906F;
  opacity: 0.5;
}

.item-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #8B7355;
  text-align: center;
}

.empty-name {
  color: #A8906F;
  opacity: 0.5;
}

.bottom-stats {
  padding: 16px 24px;
  border-top: 1px solid rgba(139, 115, 85, 0.1);
}

.stats-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #A8906F;
  text-align: center;
  margin: 0;
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
  .dream-collection-wrapper {
    padding: 0;
  }
  
  .dream-collection-screen {
    height: 100vh;
    max-height: 698px;
  }
}
</style>