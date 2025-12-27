import { ref, computed } from 'vue'

// 主题数据
const themes = {
  sleepyCat: {
    id: 'sleepyCat',
    name: '困倦猫咪',
    icon: '🐈',
    colors: {
      primary: '#D4B5A0',
      secondary: '#C8A690',
      background: 'linear-gradient(180deg, rgba(245, 235, 224, 1) 0%, rgba(232, 213, 196, 1) 100%)',
      text: '#8B7355',
      textSecondary: '#A8906F',
      accent: '#E8B4B8'
    },
    alarmModal: {
      background: 'linear-gradient(180deg, rgba(58, 79, 99, 1) 0%, rgba(44, 62, 80, 1) 100%)',
      overlay: 'linear-gradient(135deg, rgba(44, 62, 80, 0.9) 0%, rgba(58, 79, 99, 0.9) 100%)',
      text: '#FFFFFF',
      textSecondary: '#B8C5D6',
      buttonPrimary: 'linear-gradient(135deg, #5A6F84 0%, #4A5F74 100%)',
      buttonSecondary: 'rgba(255, 255, 255, 0.1)'
    }
  },
  
  morningBird: {
    id: 'morningBird',
    name: '晨鸟',
    icon: '🐔',
    colors: {
      primary: '#FFB366',
      secondary: '#FF9F4A',
      background: 'linear-gradient(180deg, rgba(255, 244, 230, 1) 0%, rgba(255, 232, 204, 1) 50%, rgba(255, 217, 168, 1) 100%)',
      text: '#8B5A2B',
      textSecondary: '#A67C52',
      accent: '#FFD700'
    },
    alarmModal: {
      background: 'linear-gradient(180deg, rgba(255, 152, 74, 1) 0%, rgba(255, 179, 102, 1) 100%)',
      overlay: 'linear-gradient(135deg, rgba(255, 152, 74, 0.9) 0%, rgba(255, 179, 102, 0.9) 100%)',
      text: '#FFFFFF',
      textSecondary: '#FFF3E6',
      buttonPrimary: 'linear-gradient(135deg, #FF8C42 0%, #FF7A29 100%)',
      buttonSecondary: 'rgba(255, 255, 255, 0.2)'
    }
  },
  
  dreamyPurple: {
    id: 'dreamyPurple',
    name: '星河',
    icon: '🌙',
    colors: {
      primary: '#C8B6D6',
      secondary: '#B8A6C6',
      background: 'linear-gradient(180deg, rgba(232, 213, 242, 1) 0%, rgba(212, 197, 232, 1) 100%)',
      text: '#7B6B8E',
      textSecondary: '#9B8BAE',
      accent: '#E8B4E8'
    },
    alarmModal: {
      background: 'linear-gradient(180deg, rgba(139, 107, 142, 1) 0%, rgba(123, 107, 142, 1) 100%)',
      overlay: 'linear-gradient(135deg, rgba(139, 107, 142, 0.9) 0%, rgba(123, 107, 142, 0.9) 100%)',
      text: '#FFFFFF',
      textSecondary: '#E8D5E8',
      buttonPrimary: 'linear-gradient(135deg, #A67CA6 0%, #8B6B8E 100%)',
      buttonSecondary: 'rgba(255, 255, 255, 0.15)'
    }
  },
  
  oceanBreeze: {
    id: 'oceanBreeze',
    name: '海洋微风',
    icon: '🌊',
    colors: {
      primary: '#7FB3D3',
      secondary: '#5A9BD4',
      background: 'linear-gradient(180deg, rgba(173, 216, 230, 1) 0%, rgba(135, 206, 235, 1) 100%)',
      text: '#2E5984',
      textSecondary: '#4682B4',
      accent: '#87CEEB'
    },
    alarmModal: {
      background: 'linear-gradient(180deg, rgba(70, 130, 180, 1) 0%, rgba(46, 89, 132, 1) 100%)',
      overlay: 'linear-gradient(135deg, rgba(70, 130, 180, 0.9) 0%, rgba(46, 89, 132, 0.9) 100%)',
      text: '#FFFFFF',
      textSecondary: '#E6F3FF',
      buttonPrimary: 'linear-gradient(135deg, #4682B4 0%, #2E5984 100%)',
      buttonSecondary: 'rgba(255, 255, 255, 0.2)'
    }
  }
}

// 当前主题状态
const currentThemeId = ref(localStorage.getItem('selectedTheme') || 'sleepyCat')

// 计算属性
const currentTheme = computed(() => themes[currentThemeId.value])

// 主题管理函数
export function useTheme() {
  const setTheme = (themeId) => {
    if (themes[themeId]) {
      currentThemeId.value = themeId
      localStorage.setItem('selectedTheme', themeId)
      
      // 应用CSS变量到根元素
      applyThemeToRoot(themes[themeId])
    }
  }
  
  const applyThemeToRoot = (theme) => {
    const root = document.documentElement
    
    // 应用主要颜色
    root.style.setProperty('--theme-primary', theme.colors.primary)
    root.style.setProperty('--theme-secondary', theme.colors.secondary)
    root.style.setProperty('--theme-background', theme.colors.background)
    root.style.setProperty('--theme-text', theme.colors.text)
    root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary)
    root.style.setProperty('--theme-accent', theme.colors.accent)
    
    // 应用闹钟弹窗颜色
    root.style.setProperty('--alarm-background', theme.alarmModal.background)
    root.style.setProperty('--alarm-overlay', theme.alarmModal.overlay)
    root.style.setProperty('--alarm-text', theme.alarmModal.text)
    root.style.setProperty('--alarm-text-secondary', theme.alarmModal.textSecondary)
    root.style.setProperty('--alarm-button-primary', theme.alarmModal.buttonPrimary)
    root.style.setProperty('--alarm-button-secondary', theme.alarmModal.buttonSecondary)
  }
  
  const getAllThemes = () => Object.values(themes)
  
  // 初始化时应用当前主题
  applyThemeToRoot(currentTheme.value)
  
  return {
    currentTheme,
    currentThemeId,
    setTheme,
    getAllThemes,
    themes
  }
}