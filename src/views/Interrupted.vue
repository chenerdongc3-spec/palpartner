<template>
  <div class="interrupted-wrapper">
    <div class="interrupted-screen">
      <StatusBar />
      <div class="interrupted-content">
        <div class="cat-section">
          <LyingCat state="confused" />
        </div>
        
        <p class="interrupted-message">Are we still awake?</p>
        
        <div class="button-group">
          <button class="rest-more-button" @click="continueSleep">
            Let's rest more
          </button>
          <button class="awake-button" @click="wakeUp">
            I'm awake now
          </button>
        </div>
      </div>
      <div class="bottom-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LyingCat from '../components/LyingCat.vue'
import StatusBar from '../components/StatusBar.vue'

const router = useRouter()

const continueSleep = () => {
  router.push('/sleep')
}

const wakeUp = () => {
  router.push('/wake-up')
}
</script>

<style scoped>
.interrupted-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}

.interrupted-screen {
  width: 100%;
  max-width: 448px;
  height: 698px;
  background: linear-gradient(180deg, rgba(58, 79, 99, 1) 0%, rgba(44, 62, 80, 1) 100%);
  border-radius: 0;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.interrupted-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
  position: relative;
  justify-content: space-between;
}

.cat-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
}

.interrupted-message {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -2.44140625%;
  color: #B8C5D6;
  text-align: center;
  width: 154px;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: 320px;
  padding: 13px 0 16px;
  margin-top: auto;
}

.rest-more-button {
  width: 320px;
  height: 64px;
  background: #5A6F84;
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
  transition: all 0.2s;
}

.rest-more-button:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.awake-button {
  width: 320px;
  height: 66px;
  background: transparent;
  border: 1px solid #B8C5D6;
  border-radius: 9999px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.953125%;
  color: #B8C5D6;
  cursor: pointer;
  transition: all 0.2s;
}

.awake-button:active {
  transform: scale(0.98);
  opacity: 0.8;
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
  .interrupted-wrapper {
    padding: 0;
  }
  
  .interrupted-screen {
    height: 100vh;
    max-height: 698px;
  }
  
  .button-group {
    width: calc(100% - 128px);
  }
  
  .rest-more-button,
  .awake-button {
    width: 100%;
  }
}
</style>

