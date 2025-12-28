<template>
  <div class="stretching-cat-container">
    <img 
      v-if="customImage"
      :src="customImage" 
      alt="Character"
      class="cat-character"
    />
    <svg 
      v-else
      class="cat-character" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 猫的身体（伸懒腰姿势） -->
      <ellipse cx="100" cy="140" rx="60" ry="45" fill="#D4C5B9" class="cat-body"/>
      
      <!-- 前爪（向上伸展） -->
      <ellipse cx="85" cy="100" rx="12" ry="25" fill="#D4C5B9" class="cat-paw"/>
      <ellipse cx="115" cy="100" rx="12" ry="25" fill="#D4C5B9" class="cat-paw"/>
      
      <!-- 猫的头（稍微向上） -->
      <circle cx="100" cy="75" r="50" fill="#D4C5B9" class="cat-head"/>
      
      <!-- 耳朵 -->
      <path d="M 70 35 L 85 55 L 75 60 Z" fill="#D4C5B9" class="cat-ear"/>
      <path d="M 130 35 L 115 55 L 125 60 Z" fill="#D4C5B9" class="cat-ear"/>
      
      <!-- 眼睛（开心） -->
      <ellipse cx="85" cy="70" rx="10" ry="8" fill="#2C3E5A" class="cat-eye"/>
      <ellipse cx="85" cy="68" rx="5" ry="5" fill="#fff" class="cat-eye-shine"/>
      <ellipse cx="115" cy="70" rx="10" ry="8" fill="#2C3E5A" class="cat-eye"/>
      <ellipse cx="115" cy="68" rx="5" ry="5" fill="#fff" class="cat-eye-shine"/>
      
      <!-- 鼻子 -->
      <ellipse cx="100" cy="80" rx="4" ry="3" fill="#E8B4B8" class="cat-nose"/>
      
      <!-- 嘴巴（微笑） -->
      <path 
        d="M 100 85 Q 95 95 90 90" 
        stroke="#2C3E5A" 
        stroke-width="2.5" 
        fill="none" 
        stroke-linecap="round"
        class="cat-mouth"
      />
      <path 
        d="M 100 85 Q 105 95 110 90" 
        stroke="#2C3E5A" 
        stroke-width="2.5" 
        fill="none" 
        stroke-linecap="round"
        class="cat-mouth"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  customImage: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
.stretching-cat-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cat-character {
  width: 100%;
  max-width: 280px;
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  animation: stretch-animation 2s ease-in-out infinite;
  object-fit: contain;
}

.cat-paw {
  animation: paw-stretch 2s ease-in-out infinite;
}

@keyframes stretch-animation {
  0%, 100% { 
    transform: translateY(0) scale(1); 
  }
  50% { 
    transform: translateY(-15px) scale(1.05); 
  }
}

@keyframes paw-stretch {
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-8px); 
  }
}

@media (min-width: 768px) {
  .cat-character {
    max-width: 320px;
  }
}
</style>

