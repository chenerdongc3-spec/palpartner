<template>
  <div class="theme-selector">
    <!-- 主题按钮 -->
    <button class="theme-button" @click="toggleThemePanel" :class="{ active: showPanel }">
      <span class="theme-icon">{{ currentTheme.icon }}</span>
    </button>
    
    <!-- 主题选择面板 -->
    <div class="theme-panel" v-if="showPanel" @click.stop :class="{ 'panel-right': shouldAlignRight }">
      <div class="panel-header">
        <h3 class="panel-title">选择主题</h3>
        <button class="close-button" @click="closePanel">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      
      <div class="themes-grid">
        <div 
          v-for="theme in allThemes" 
          :key="theme.id"
          class="theme-card"
          :class="{ selected: currentThemeId === theme.id }"
          @click="selectTheme(theme.id)"
        >
          <div class="theme-preview" :style="{ background: theme.colors.background }">
            <div class="preview-content">
              <span class="theme-emoji">{{ theme.icon }}</span>
              <div class="preview-button" :style="{ background: theme.colors.primary }"></div>
            </div>
          </div>
          <div class="theme-info">
            <span class="theme-name">{{ theme.name }}</span>
            <div class="selected-indicator" v-if="currentThemeId === theme.id">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 背景遮罩 -->
    <div class="theme-overlay" v-if="showPanel" @click="closePanel"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { currentTheme, currentThemeId, setTheme, getAllThemes } = useTheme()

const showPanel = ref(false)
const allThemes = getAllThemes()

// 检测是否应该右对齐面板（避免超出屏幕）
const shouldAlignRight = computed(() => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 400
})

const toggleThemePanel = () => {
  showPanel.value = !showPanel.value
}

const closePanel = () => {
  showPanel.value = false
}

const selectTheme = (themeId) => {
  setTheme(themeId)
  closePanel()
}

// 点击外部关闭面板
const handleClickOutside = (event) => {
  if (showPanel.value && !event.target.closest('.theme-selector')) {
    closePanel()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.theme-selector {
  position: relative;
  z-index: 100;
}

.theme-button {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.theme-button:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.16);
}

.theme-button.active {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.2);
}

.theme-icon {
  font-size: 24px;
  line-height: 1;
}

.theme-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
  backdrop-filter: blur(4px);
}

.theme-panel {
  position: absolute;
  top: 60px;
  left: 0;
  width: 300px;
  max-width: calc(100vw - 48px);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 999;
  animation: panelSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.theme-panel.panel-right {
  left: auto;
  right: 0;
}

@keyframes panelSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.panel-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #2C3E5A;
  margin: 0;
}

.close-button {
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6B6B6B;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #2C3E5A;
}

.themes-grid {
  padding: 16px 24px 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.theme-card {
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.theme-card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
}

.theme-card.selected {
  border-color: var(--theme-primary, #D4B5A0);
  box-shadow: 0px 8px 24px rgba(212, 181, 160, 0.3);
}

.theme-preview {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.preview-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.theme-emoji {
  font-size: 24px;
  line-height: 1;
}

.preview-button {
  width: 32px;
  height: 16px;
  border-radius: 8px;
  opacity: 0.8;
}

.theme-info {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.theme-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #2C3E5A;
}

.selected-indicator {
  color: var(--theme-primary, #D4B5A0);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 480px) {
  .theme-panel {
    width: calc(100vw - 48px);
    left: 50%;
    transform: translateX(-50%);
    max-width: 340px;
  }
  
  .theme-panel.panel-right {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
  
  .themes-grid {
    grid-template-columns: 1fr;
  }
}

/* 确保在所有屏幕尺寸下都不超出边界 */
@media (max-width: 380px) {
  .theme-panel {
    width: calc(100vw - 32px);
    left: 50%;
    transform: translateX(-50%);
  }
  
  .theme-panel.panel-right {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
}
</style>