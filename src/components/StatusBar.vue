<template>
  <div class="status-bar">
    <div class="time">{{ currentTime }}</div>
    <div class="battery">
      <div class="battery-container">
        <div class="battery-fill" :style="{ width: '60%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('4:04 PM')

const updateTime = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  currentTime.value = `${displayHours}:${minutes} ${ampm}`
}

let timeInterval = null

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  width: 100%;
  height: 48px;
}

.time {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #0A0A0A;
}

.battery {
  display: flex;
  align-items: center;
}

.battery-container {
  width: 16px;
  height: 12px;
  border: 1px solid #0A0A0A;
  border-radius: 6px;
  padding: 3px -1px 1px 15px;
  position: relative;
  overflow: hidden;
}

.battery-fill {
  position: absolute;
  right: 0;
  top: 1px;
  bottom: 1px;
  width: 60%;
  background-color: #0A0A0A;
  border-radius: 0px 4px 4px 0px;
}
</style>

