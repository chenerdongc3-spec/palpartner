<template>
  <div class="lying-cat-container" :class="state">
    <img 
      v-if="customImage"
      :src="customImage" 
      alt="Character"
      class="cat-character"
    />
    <svg 
      v-else
      class="cat-character" 
      viewBox="0 0 200 150" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 猫的身体（躺下） -->
      <ellipse cx="100" cy="90" rx="80" ry="40" fill="#D4C5B9" class="cat-body"/>
      
      <!-- 猫的头（稍微抬起） -->
      <ellipse cx="100" cy="60" rx="50" ry="45" fill="#D4C5B9" class="cat-head"/>
      
      <!-- 耳朵（躺下时的角度） -->
      <path d="M 70 35 L 80 55 L 70 60 Z" fill="#D4C5B9" class="cat-ear"/>
      <path d="M 130 35 L 120 55 L 130 60 Z" fill="#D4C5B9" class="cat-ear"/>
      
      <!-- 眼睛 -->
      <g class="cat-eyes">
        <!-- 左眼 -->
        <line 
          v-if="state === 'sleeping'"
          x1="85" 
          y1="60" 
          x2="95" 
          y2="60" 
          stroke="#2C3E5A" 
          stroke-width="3" 
          stroke-linecap="round"
          class="cat-eye-closed"
        />
        <ellipse 
          v-if="state === 'confused'"
          cx="90" 
          cy="62" 
          rx="7" 
          ry="9" 
          fill="#2C3E5A"
          class="cat-eye"
        />
        <ellipse 
          v-if="state === 'confused'"
          cx="92" 
          cy="60" 
          rx="3" 
          ry="3" 
          fill="#fff"
          class="cat-eye-shine"
        />
        
        <!-- 右眼 -->
        <line 
          v-if="state === 'sleeping'"
          x1="105" 
          y1="60" 
          x2="115" 
          y2="60" 
          stroke="#2C3E5A" 
          stroke-width="3" 
          stroke-linecap="round"
          class="cat-eye-closed"
        />
        <ellipse 
          v-if="state === 'confused'"
          cx="110" 
          cy="62" 
          rx="7" 
          ry="9" 
          fill="#2C3E5A"
          class="cat-eye"
        />
        <ellipse 
          v-if="state === 'confused'"
          cx="112" 
          cy="60" 
          rx="3" 
          ry="3" 
          fill="#fff"
          class="cat-eye-shine"
        />
      </g>
      
      <!-- 鼻子 -->
      <ellipse cx="100" cy="70" rx="3" ry="2" fill="#E8B4B8" class="cat-nose"/>
      
      <!-- 嘴巴 -->
      <path 
        v-if="state === 'confused'"
        d="M 100 73 L 95 77 M 100 73 L 105 77" 
        stroke="#2C3E5A" 
        stroke-width="2" 
        stroke-linecap="round"
        class="cat-mouth"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  state: {
    type: String,
    default: 'sleeping', // sleeping, confused
    validator: (value) => ['sleeping', 'confused'].includes(value)
  },
  customImage: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.lying-cat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
}

.cat-character {
  width: 100%;
  max-width: 300px;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  object-fit: contain;
}

.lying-cat-container.sleeping .cat-character {
  animation: gentle-breathe 4s ease-in-out infinite;
}

.lying-cat-container.confused .cat-character {
  animation: gentle-lift 2s ease-in-out infinite;
}

@keyframes gentle-breathe {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-3px) scale(1.01); }
}

@keyframes gentle-lift {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(-2deg); }
}

@media (min-width: 768px) {
  .cat-character {
    max-width: 340px;
  }
}
</style>

