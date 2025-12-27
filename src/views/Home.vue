<template>
  <div class="home-screen-wrapper">
    <div class="home-screen">
      <StatusBar />
      <div class="home-content">
        <div class="cat-section">
          <SleepyCat :state="catState" />
        </div>
        
        <p class="sleepy-text">I'm getting sleepy…</p>
        
        <button class="rest-button" @click="showAlarm = true">
          Rest together
        </button>
      </div>
      <div class="bottom-indicator"></div>
    </div>
    
    <AlarmBottomSheet 
      :show="showAlarm" 
      @close="showAlarm = false"
      @set="handleSetAlarm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SleepyCat from '../components/SleepyCat.vue'
import StatusBar from '../components/StatusBar.vue'
import AlarmBottomSheet from '../components/AlarmBottomSheet.vue'

const router = useRouter()
const catState = ref('awake')
const showAlarm = ref(false)

const goToSleep = () => {
  router.push('/sleep')
}

const handleSetAlarm = (alarmData) => {
  // Handle alarm setting logic here
  console.log('Alarm set:', alarmData)
  goToSleep()
}

// 可以根据时间或状态改变猫的表情
onMounted(() => {
  const hour = new Date().getHours()
  if (hour >= 21 || hour <= 6) {
    catState.value = 'sleepy'
  }
})
</script>

<style scoped>
.home-screen-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}

.home-screen {
  width: 100%;
  max-width: 448px;
  height: 698px;
  background: linear-gradient(180deg, rgba(245, 235, 224, 1) 0%, rgba(232, 213, 196, 1) 100%);
  border-radius: 0;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.home-content {
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
  width: 200px;
  height: 200px;
  margin-top: 141px;
}

.sleepy-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.953125%;
  color: #6B6B6B;
  text-align: center;
  opacity: 0.7;
  margin-top: 28px;
  width: 140px;
}

.rest-button {
  width: 320px;
  height: 64px;
  background: #D4B5A0;
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
  margin-top: 93px;
  transition: all 0.2s;
}

.rest-button:active {
  transform: scale(0.98);
  opacity: 0.9;
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
  .home-screen-wrapper {
    padding: 0;
  }
  
  .home-screen {
    height: 100vh;
    max-height: 698px;
  }
  
  .rest-button {
    width: calc(100% - 128px);
    max-width: 320px;
  }
}
</style>
