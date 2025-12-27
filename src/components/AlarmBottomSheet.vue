<template>
  <div class="alarm-overlay" @click.self="close" v-if="show">
    <div class="alarm-bottom-sheet">
      <div class="drag-handle"></div>
      
      <div class="content">
        <div class="header-section">
          <div class="cat-character">
            <!-- Cat SVG will be replaced with actual component -->
            <div class="cat-placeholder"></div>
          </div>
          <p class="question">When should I wake you?</p>
        </div>
        
        <div class="time-picker">
          <div class="time-selector">
            <div class="hour-selector">
              <button class="arrow-btn" @click="decreaseHour">
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M5 0L10 5H0L5 0Z" stroke="#B8C5D6" stroke-width="2.5"/>
                </svg>
              </button>
              <div class="time-display">{{ formatTime(hours) }}</div>
              <button class="arrow-btn" @click="increaseHour">
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M5 5L0 0H10L5 5Z" stroke="#B8C5D6" stroke-width="2.5"/>
                </svg>
              </button>
            </div>
            
            <div class="colon">:</div>
            
            <div class="minute-selector">
              <button class="arrow-btn" @click="decreaseMinute">
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M5 0L10 5H0L5 0Z" stroke="#B8C5D6" stroke-width="2.5"/>
                </svg>
              </button>
              <div class="time-display">{{ formatTime(minutes) }}</div>
              <button class="arrow-btn" @click="increaseMinute">
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none">
                  <path d="M5 5L0 0H10L5 5Z" stroke="#B8C5D6" stroke-width="2.5"/>
                </svg>
              </button>
            </div>
            
            <div class="am-pm-selector">
              <button 
                class="ampm-btn" 
                :class="{ active: period === 'AM' }"
                @click="period = 'AM'"
              >
                AM
              </button>
              <button 
                class="ampm-btn" 
                :class="{ active: period === 'PM' }"
                @click="period = 'PM'"
              >
                PM
              </button>
            </div>
          </div>
        </div>
        
        <div class="button-group">
          <button class="skip-btn" @click="skip">Skip</button>
          <button class="set-btn" @click="setAlarm">Set alarm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'set'])

const hours = ref(7)
const minutes = ref(0)
const period = ref('AM')

const formatTime = (value) => {
  return value.toString().padStart(2, '0')
}

const increaseHour = () => {
  hours.value = (hours.value % 12) + 1
}

const decreaseHour = () => {
  hours.value = hours.value === 1 ? 12 : hours.value - 1
}

const increaseMinute = () => {
  minutes.value = (minutes.value + 1) % 60
}

const decreaseMinute = () => {
  minutes.value = minutes.value === 0 ? 59 : minutes.value - 1
}

const close = () => {
  emit('close')
}

const skip = () => {
  close()
}

const setAlarm = () => {
  emit('set', { hours: hours.value, minutes: minutes.value, period: period.value })
  close()
}
</script>

<style scoped>
.alarm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(44, 62, 80, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.alarm-bottom-sheet {
  width: 100%;
  max-width: 448px;
  background: linear-gradient(180deg, rgba(58, 79, 99, 1) 0%, rgba(44, 62, 80, 1) 100%);
  border-radius: 32px 32px 0px 0px;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.drag-handle {
  width: 48px;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  margin: 12px auto;
}

.content {
  padding: 16px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  padding-top: 25px;
}

.cat-character {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cat-placeholder {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.question {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #B8C5D6;
  text-align: center;
  opacity: 0.8;
}

.time-picker {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px 24px 0;
}

.time-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 136px;
}

.hour-selector,
.minute-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  height: 136px;
}

.arrow-btn {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.arrow-btn:active {
  opacity: 0.6;
}

.time-display {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 40px;
  color: #FFFFFF;
  text-align: center;
}

.colon {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 40px;
  color: rgba(255, 255, 255, 0.7);
  padding: 0 4px;
}

.am-pm-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 48.63px;
  height: 80px;
}

.ampm-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 10px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s;
}

.ampm-btn.active {
  background: #B8C5D6;
  color: #2C3E50;
}

.ampm-btn:active {
  opacity: 0.8;
}

.button-group {
  display: flex;
  gap: 12px;
  padding-bottom: 24px;
}

.skip-btn,
.set-btn {
  flex: 1;
  height: 56px;
  border: none;
  border-radius: 9999px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.2s;
}

.skip-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #B8C5D6;
}

.set-btn {
  background: #B8C5D6;
  color: #2C3E50;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.skip-btn:active,
.set-btn:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

