<template>
  <div class="sleep-mode-wrapper">
    <div class="sleep-mode-screen">
      <StatusBar />
      <div class="sleep-content" @click="goToInterrupted">
        <div class="cat-section">
          <LyingCat :state="'sleeping'" />
        </div>
        
        <p class="sleep-message">Let's lie down together</p>
      </div>
      
      <!-- Decorative circles -->
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
      <div class="decorative-circle circle-3"></div>
      <div class="decorative-circle circle-4"></div>
      
      <div class="bottom-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LyingCat from '../components/LyingCat.vue'
import StatusBar from '../components/StatusBar.vue'

const router = useRouter()

const goToInterrupted = () => {
  router.push('/interrupted')
}
</script>

<style scoped>
.sleep-mode-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}

.sleep-mode-screen {
  width: 100%;
  max-width: 448px;
  height: 698px;
  background: linear-gradient(180deg, rgba(44, 62, 80, 1) 0%, rgba(52, 73, 94, 1) 100%);
  border-radius: 0;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.sleep-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding: 48px 0;
  cursor: pointer;
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 160px;
}

.sleep-message {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -2.44140625%;
  color: #B8C5D6;
  text-align: center;
  width: 186px;
}

.decorative-circle {
  position: absolute;
  background: #B8C5D6;
  border-radius: 50%;
}

.circle-1 {
  width: 8px;
  height: 8px;
  top: 128px;
  left: 40px;
  opacity: 0.5068209767341614;
}

.circle-2 {
  width: 6px;
  height: 6px;
  top: 176px;
  right: 64px;
  opacity: 0.4311220049858093;
}

.circle-3 {
  width: 8px;
  height: 8px;
  bottom: 168px;
  left: 80px;
  opacity: 0.5;
}

.circle-4 {
  width: 4px;
  height: 4px;
  bottom: 228px;
  right: 52px;
  opacity: 0.46700799465179443;
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
  .sleep-mode-wrapper {
    padding: 0;
  }
  
  .sleep-mode-screen {
    height: 100vh;
    max-height: 698px;
  }
}
</style>

