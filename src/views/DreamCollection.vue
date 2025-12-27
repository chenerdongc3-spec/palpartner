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
      
      <!-- Theme Tabs -->
      <div class="theme-tabs">
        <button 
          v-for="(theme, themeId) in dreamItemsByTheme" 
          :key="themeId"
          class="theme-tab"
          :class="{ active: selectedTheme === themeId }"
          @click="selectTheme(themeId)"
        >
          <span class="tab-icon">{{ theme.icon }}</span>
          <span class="tab-name">{{ theme.name }}</span>
          <div class="progress-indicator">
            {{ getThemeProgress(themeId).collected }}/{{ getThemeProgress(themeId).total }}
          </div>
        </button>
      </div>
      
      <!-- Collection Content -->
      <div class="collection-content">
        <div class="theme-header">
          <h2 class="theme-title">{{ dreamItemsByTheme[selectedTheme]?.name }}</h2>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${currentProgress.percentage}%` }"></div>
          </div>
          <p class="progress-text">{{ currentProgress.collected }}/{{ currentProgress.total }} 已收集</p>
        </div>
        
        <div class="items-grid">
          <div 
            v-for="item in currentThemeItems" 
            :key="item.id"
            class="dream-item-card"
            :class="{ 
              collected: isCollected(item.id),
              [item.rarity]: true
            }"
          >
            <div class="item-icon">
              <span class="item-emoji" v-if="isCollected(item.id)">{{ item.emoji }}</span>
              <span class="empty-placeholder" v-else>?</span>
              <div 
                class="rarity-border" 
                :style="{ borderColor: rarityConfig[item.rarity]?.color }"
              ></div>
            </div>
            <span class="item-name" :class="{ collected: isCollected(item.id) }">
              {{ isCollected(item.id) ? item.name : '未知' }}
            </span>
            <div class="rarity-tag" :style="{ background: rarityConfig[item.rarity]?.color }">
              {{ rarityConfig[item.rarity]?.name }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="bottom-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StatusBar from '../components/StatusBar.vue'
import { 
  dreamItemsByTheme, 
  getCollectedItemsByTheme, 
  getThemeProgress, 
  isCollected,
  rarityConfig 
} from '../utils/dreamCollection.js'
import { useTheme } from '../composables/useTheme.js'

const router = useRouter()
const { currentThemeId } = useTheme()

const selectedTheme = ref(currentThemeId.value)

// 当前主题的物品和进度
const currentThemeItems = computed(() => dreamItemsByTheme[selectedTheme.value]?.items || [])
const currentProgress = computed(() => getThemeProgress(selectedTheme.value))

const selectTheme = (themeId) => {
  selectedTheme.value = themeId
}

onMounted(() => {
  // 默认选择当前主题
  selectedTheme.value = currentThemeId.value
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
  padding: 16px 24px 8px;
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

.theme-tabs {
  display: flex;
  padding: 0 16px;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.theme-tabs::-webkit-scrollbar {
  display: none;
}

.theme-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  backdrop-filter: blur(10px);
}

.theme-tab.active {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.tab-icon {
  font-size: 20px;
  line-height: 1;
}

.tab-name {
  font-size: 12px;
  font-weight: 500;
  color: #8B7355;
}

.progress-indicator {
  font-size: 10px;
  color: #A8906F;
  opacity: 0.8;
}

.collection-content {
  flex: 1;
  padding: 16px 24px;
  overflow-y: auto;
}

.theme-header {
  margin-bottom: 20px;
}

.theme-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #8B7355;
  margin: 0 0 12px 0;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(139, 115, 85, 0.2);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #D4B5A0 0%, #C8A690 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 14px;
  color: #A8906F;
  margin: 0;
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
  gap: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 2px solid transparent;
  position: relative;
}

.dream-item-card.collected {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
}

.dream-item-card.legendary {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%);
}

.dream-item-card.epic {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%);
}

.dream-item-card.rare {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%);
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
  position: relative;
}

.rarity-border {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid;
  border-radius: 50%;
  opacity: 0.6;
}

.item-emoji {
  font-size: 1.8rem;
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
  font-size: 12px;
  line-height: 16px;
  color: #A8906F;
  text-align: center;
  opacity: 0.6;
}

.item-name.collected {
  color: #8B7355;
  opacity: 1;
  font-weight: 500;
}

.rarity-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 8px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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
    min-height: 100vh;
    height: 100vh;
  }
  
  .dream-collection-screen {
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
  .dream-collection-wrapper {
    padding: 0;
    min-height: 100vh;
    height: 100vh;
  }
  
  .dream-collection-screen {
    height: 100vh;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
    max-width: none;
    width: 100vw;
  }
}
</style>