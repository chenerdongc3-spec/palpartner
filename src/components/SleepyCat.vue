<template>
  <div class="cat-container" :class="state">
    <img 
      :src="imageSrc" 
      alt="Character"
      class="cat-character"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import beTouchedGif from '../assets/images/be touched.gif'
import awakeGif from '../assets/images/awake & gifts.gif'
import sleepGif from '../assets/images/sleep.gif'

const props = defineProps({
  state: {
    type: String,
    default: 'awake', // awake, sleepy, sleeping, confused, happy
    validator: (value) => ['awake', 'sleepy', 'sleeping', 'confused', 'happy'].includes(value)
  },
  catColor: {
    type: String,
    default: '#D4C5B9' // 柔和的米色
  },
  customImage: {
    type: String,
    default: null
  }
})

const imageSrc = computed(() => {
  if (props.customImage) {
    return props.customImage
  }
  // 默认返回 be touched gif
  return beTouchedGif
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

.cat-character {
  object-fit: contain;
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

