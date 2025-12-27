<template>
  <div class="cat-container" :class="state">
    <svg 
      class="cat-character" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 猫的身体 -->
      <ellipse cx="100" cy="140" rx="70" ry="50" :fill="catColor" class="cat-body"/>
      
      <!-- 猫的头 -->
      <circle cx="100" cy="80" r="55" :fill="catColor" class="cat-head"/>
      
      <!-- 耳朵 -->
      <path d="M 70 40 L 85 60 L 75 65 Z" :fill="catColor" class="cat-ear"/>
      <path d="M 130 40 L 115 60 L 125 65 Z" :fill="catColor" class="cat-ear"/>
      
      <!-- 眼睛 -->
      <g class="cat-eyes">
        <!-- 左眼 -->
        <ellipse 
          v-if="state === 'awake'" 
          cx="85" 
          cy="75" 
          rx="8" 
          ry="12" 
          fill="#2C3E5A"
          class="cat-eye"
        />
        <ellipse 
          v-if="state === 'awake'" 
          cx="85" 
          cy="72" 
          rx="5" 
          ry="5" 
          fill="#fff"
          class="cat-eye-shine"
        />
        <line 
          v-if="state === 'sleepy' || state === 'sleeping'" 
          x1="77" 
          y1="75" 
          x2="93" 
          y2="75" 
          stroke="#2C3E5A" 
          stroke-width="3" 
          stroke-linecap="round"
          class="cat-eye-closed"
        />
        <ellipse 
          v-if="state === 'confused'" 
          cx="85" 
          cy="78" 
          rx="8" 
          ry="10" 
          fill="#2C3E5A"
          class="cat-eye"
        />
        <ellipse 
          v-if="state === 'confused'" 
          cx="87" 
          cy="76" 
          rx="4" 
          ry="4" 
          fill="#fff"
          class="cat-eye-shine"
        />
        <ellipse 
          v-if="state === 'happy'" 
          cx="85" 
          cy="75" 
          rx="10" 
          ry="8" 
          fill="#2C3E5A"
          class="cat-eye"
        />
        <ellipse 
          v-if="state === 'happy'" 
          cx="87" 
          cy="73" 
          rx="5" 
          ry="5" 
          fill="#fff"
          class="cat-eye-shine"
        />
        
        <!-- 右眼 -->
        <ellipse 
          v-if="state === 'awake'" 
          cx="115" 
          cy="75" 
          rx="8" 
          ry="12" 
          fill="#2C3E5A"
          class="cat-eye"
        />
        <ellipse 
          v-if="state === 'awake'" 
          cx="115" 
          cy="72" 
          rx="5" 
          ry="5" 
          fill="#fff"
          class="cat-eye-shine"
        />
        <line 
          v-if="state === 'sleepy' || state === 'sleeping'" 
          x1="107" 
          y1="75" 
          x2="123" 
          y2="75" 
          stroke="#2C3E5A" 
          stroke-width="3" 
          stroke-linecap="round"
          class="cat-eye-closed"
        />
        <ellipse 
          v-if="state === 'confused'" 
          cx="115" 
          cy="78" 
          rx="8" 
          ry="10" 
          fill="#2C3E5A"
          class="cat-eye"
        />
        <ellipse 
          v-if="state === 'confused'" 
          cx="117" 
          cy="76" 
          rx="4" 
          ry="4" 
          fill="#fff"
          class="cat-eye-shine"
        />
        <ellipse 
          v-if="state === 'happy'" 
          cx="115" 
          cy="75" 
          rx="10" 
          ry="8" 
          fill="#2C3E5A"
          class="cat-eye"
        />
        <ellipse 
          v-if="state === 'happy'" 
          cx="117" 
          cy="73" 
          rx="5" 
          ry="5" 
          fill="#fff"
          class="cat-eye-shine"
        />
      </g>
      
      <!-- 鼻子 -->
      <ellipse cx="100" cy="85" rx="4" ry="3" fill="#E8B4B8" class="cat-nose"/>
      
      <!-- 嘴巴 -->
      <path 
        v-if="state === 'happy'"
        d="M 100 90 Q 95 100 90 95" 
        stroke="#2C3E5A" 
        stroke-width="2" 
        fill="none" 
        stroke-linecap="round"
        class="cat-mouth"
      />
      <path 
        v-if="state === 'happy'"
        d="M 100 90 Q 105 100 110 95" 
        stroke="#2C3E5A" 
        stroke-width="2" 
        fill="none" 
        stroke-linecap="round"
        class="cat-mouth"
      />
      <path 
        v-if="state === 'awake' || state === 'sleepy' || state === 'confused'"
        d="M 100 88 L 95 92 M 100 88 L 105 92" 
        stroke="#2C3E5A" 
        stroke-width="2" 
        stroke-linecap="round"
        class="cat-mouth"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  state: {
    type: String,
    default: 'awake', // awake, sleepy, sleeping, confused, happy
    validator: (value) => ['awake', 'sleepy', 'sleeping', 'confused', 'happy'].includes(value)
  },
  catColor: {
    type: String,
    default: '#D4C5B9' // 柔和的米色
  }
})

</script>

<style scoped>
.cat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}

.cat-character {
  width: 100%;
  max-width: 280px;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.cat-body,
.cat-head,
.cat-ear {
  transition: fill 0.3s ease;
}

.cat-eyes {
  transition: opacity 0.3s ease;
}

.cat-eye-closed {
  transition: opacity 0.5s ease;
}

/* 不同状态下的动画 */
.cat-container.sleepy .cat-character {
  animation: gentle-breathe 3s ease-in-out infinite;
}

.cat-container.sleeping .cat-character {
  animation: gentle-breathe 4s ease-in-out infinite;
  transform: translateY(20px);
}

.cat-container.happy .cat-character {
  animation: happy-bounce 2s ease-in-out infinite;
}

.cat-container.confused .cat-character {
  animation: gentle-tilt 2s ease-in-out infinite;
}

@keyframes gentle-breathe {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-5px) scale(1.02); }
}

@keyframes happy-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes gentle-tilt {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}

@media (min-width: 768px) {
  .cat-character {
    max-width: 320px;
  }
}
</style>

