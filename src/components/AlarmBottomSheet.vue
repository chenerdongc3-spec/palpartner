<template>
  <div class="alarm-overlay" @click.self="close" v-if="show">
    <div class="alarm-bottom-sheet">
      <div class="drag-handle"></div>
      
      <div class="content">
        <div class="header-section">
          <div class="cat-character">
            <img 
              src="/src/standby2.gif" 
              alt="Character"
              class="cat-image"
            />
          </div>
          <p class="question">When should I wake you?</p>
        </div>
        
        <div class="time-picker">
          <div class="time-selector">
            <div class="hour-selector">
              <div class="scroll-container" ref="hourScrollRef" @scroll="handleHourScroll">
                <div 
                  v-for="hour in 24" 
                  :key="hour - 1"
                  class="time-option"
                  :class="{ active: selectedHour === hour - 1 }"
                  @click="selectHour(hour - 1)"
                >
                  {{ formatTime(hour - 1) }}
                </div>
              </div>
            </div>
            
            <div class="colon">:</div>
            
            <div class="minute-selector">
              <div class="scroll-container" ref="minuteScrollRef" @scroll="handleMinuteScroll">
                <div 
                  v-for="minute in 60" 
                  :key="minute - 1"
                  class="time-option"
                  :class="{ active: selectedMinute === minute - 1 }"
                  @click="selectMinute(minute - 1)"
                >
                  {{ formatTime(minute - 1) }}
                </div>
              </div>
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
import { ref, nextTick, onMounted, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'set'])

const selectedHour = ref(7)
const selectedMinute = ref(0)
const hourScrollRef = ref(null)
const minuteScrollRef = ref(null)

const formatTime = (value) => {
  return value.toString().padStart(2, '0')
}

const selectHour = (hour) => {
  selectedHour.value = hour
  scrollToHour(hour)
}

const selectMinute = (minute) => {
  selectedMinute.value = minute
  scrollToMinute(minute)
}

const scrollToHour = (hour) => {
  if (hourScrollRef.value) {
    const itemHeight = 40
    const scrollTop = hour * itemHeight
    hourScrollRef.value.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    })
  }
}

const scrollToMinute = (minute) => {
  if (minuteScrollRef.value) {
    const itemHeight = 40
    const scrollTop = minute * itemHeight
    minuteScrollRef.value.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    })
  }
}

const handleHourScroll = () => {
  if (hourScrollRef.value) {
    const itemHeight = 40
    const scrollTop = hourScrollRef.value.scrollTop
    const centerIndex = Math.round(scrollTop / itemHeight)
    selectedHour.value = Math.max(0, Math.min(23, centerIndex))
  }
}

const handleMinuteScroll = () => {
  if (minuteScrollRef.value) {
    const itemHeight = 40
    const scrollTop = minuteScrollRef.value.scrollTop
    const centerIndex = Math.round(scrollTop / itemHeight)
    selectedMinute.value = Math.max(0, Math.min(59, centerIndex))
  }
}

// 监听显示状态，初始化滚动位置
watch(() => props.show, (newShow) => {
  if (newShow) {
    nextTick(() => {
      scrollToHour(selectedHour.value)
      scrollToMinute(selectedMinute.value)
    })
  }
})

const close = () => {
  emit('close')
}

const skip = () => {
  close()
}

const setAlarm = () => {
  emit('set', { 
    hours: selectedHour.value, 
    minutes: selectedMinute.value,
    time24: `${formatTime(selectedHour.value)}:${formatTime(selectedMinute.value)}`
  })
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
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
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
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cat-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  gap: 16px;
  height: 200px;
}

.hour-selector,
.minute-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 200px;
  position: relative;
}

.scroll-container {
  height: 200px;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 80px 0;
  position: relative;
  
  /* 隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.time-option {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  border-radius: 8px;
  margin: 0 8px;
  position: relative;
  z-index: 1;
}

.time-option.active {
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.time-option:hover:not(.active) {
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.05);
}

/* 添加渐变遮罩效果 */
.hour-selector::before,
.minute-selector::before,
.hour-selector::after,
.minute-selector::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 80px;
  pointer-events: none;
  z-index: 1;
}

.hour-selector::before,
.minute-selector::before {
  top: 0;
  background: linear-gradient(to bottom, rgba(58, 79, 99, 1), rgba(58, 79, 99, 0));
}

.hour-selector::after,
.minute-selector::after {
  bottom: 0;
  background: linear-gradient(to top, rgba(58, 79, 99, 1), rgba(58, 79, 99, 0));
}

/* 中心选择指示器 */
.hour-selector .scroll-container::before,
.minute-selector .scroll-container::before {
  content: '';
  position: absolute;
  left: 4px;
  right: 4px;
  top: 50%;
  height: 48px;
  transform: translateY(-50%);
  background: rgba(184, 197, 214, 0.1);
  border: 1px solid rgba(184, 197, 214, 0.2);
  border-radius: 12px;
  pointer-events: none;
  z-index: 0;
}

.colon {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 40px;
  color: rgba(255, 255, 255, 0.7);
  padding: 0 8px;
  align-self: center;
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
  border-radius: 28px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.skip-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #B8C5D6;
  border: 1px solid rgba(184, 197, 214, 0.3);
}

.skip-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.set-btn {
  background: linear-gradient(135deg, #B8C5D6 0%, #A8B5C6 100%);
  color: #2C3E50;
  box-shadow: 0px 8px 24px rgba(184, 197, 214, 0.3);
}

.set-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0px 12px 32px rgba(184, 197, 214, 0.4);
}

.skip-btn:active,
.set-btn:active {
  transform: translateY(0) scale(0.98);
}
</style>

