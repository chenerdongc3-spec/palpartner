// 梦境收藏管理工具
const STORAGE_KEY = 'dream-collection'

// 按主题分类的梦境物品
export const dreamItemsByTheme = {
  sleepyCat: {
    name: '困倦猫咪',
    icon: '😴',
    items: [
      { emoji: '🛏️', name: '温暖毛毯', id: 'sleepy_blanket', rarity: 'common' },
      { emoji: '🧸', name: '泰迪熊', id: 'sleepy_teddy', rarity: 'common' },
      { emoji: '🕯️', name: '香薰蜡烛', id: 'sleepy_candle', rarity: 'uncommon' },
      { emoji: '🌙', name: '月亮枕头', id: 'sleepy_moon_pillow', rarity: 'uncommon' },
      { emoji: '☁️', name: '云朵被子', id: 'sleepy_cloud_blanket', rarity: 'rare' },
      { emoji: '✨', name: '梦境之尘', id: 'sleepy_dream_dust', rarity: 'rare' },
      { emoji: '🎭', name: '睡眠面具', id: 'sleepy_mask', rarity: 'epic' },
      { emoji: '🌟', name: '安眠星辰', id: 'sleepy_star', rarity: 'legendary' }
    ]
  },
  
  morningBird: {
    name: '晨鸟',
    icon: '🐦',
    items: [
      { emoji: '🌅', name: '日出光芒', id: 'morning_sunrise', rarity: 'common' },
      { emoji: '🐦', name: '歌唱小鸟', id: 'morning_bird', rarity: 'common' },
      { emoji: '🌻', name: '向日葵', id: 'morning_sunflower', rarity: 'uncommon' },
      { emoji: '☕', name: '晨间咖啡', id: 'morning_coffee', rarity: 'uncommon' },
      { emoji: '🦋', name: '彩色蝴蝶', id: 'morning_butterfly', rarity: 'rare' },
      { emoji: '🌈', name: '晨间彩虹', id: 'morning_rainbow', rarity: 'rare' },
      { emoji: '🎵', name: '鸟鸣乐章', id: 'morning_melody', rarity: 'epic' },
      { emoji: '☀️', name: '黄金太阳', id: 'morning_golden_sun', rarity: 'legendary' }
    ]
  },
  
  dreamyPurple: {
    name: '梦幻紫',
    icon: '🌙',
    items: [
      { emoji: '🔮', name: '水晶球', id: 'dreamy_crystal', rarity: 'common' },
      { emoji: '🦄', name: '独角兽', id: 'dreamy_unicorn', rarity: 'common' },
      { emoji: '💜', name: '紫色心形', id: 'dreamy_purple_heart', rarity: 'uncommon' },
      { emoji: '🌸', name: '樱花花瓣', id: 'dreamy_sakura', rarity: 'uncommon' },
      { emoji: '🧚‍♀️', name: '梦境精灵', id: 'dreamy_fairy', rarity: 'rare' },
      { emoji: '🌌', name: '星河漩涡', id: 'dreamy_galaxy', rarity: 'rare' },
      { emoji: '👑', name: '梦境皇冠', id: 'dreamy_crown', rarity: 'epic' },
      { emoji: '🌠', name: '流星许愿', id: 'dreamy_shooting_star', rarity: 'legendary' }
    ]
  },
  
  oceanBreeze: {
    name: '海洋微风',
    icon: '🌊',
    items: [
      { emoji: '🐚', name: '海螺贝壳', id: 'ocean_shell', rarity: 'common' },
      { emoji: '🐠', name: '热带鱼', id: 'ocean_fish', rarity: 'common' },
      { emoji: '🌊', name: '海浪泡沫', id: 'ocean_wave', rarity: 'uncommon' },
      { emoji: '⚓', name: '船锚', id: 'ocean_anchor', rarity: 'uncommon' },
      { emoji: '🐙', name: '章鱼朋友', id: 'ocean_octopus', rarity: 'rare' },
      { emoji: '🏝️', name: '神秘岛屿', id: 'ocean_island', rarity: 'rare' },
      { emoji: '🧜‍♀️', name: '美人鱼', id: 'ocean_mermaid', rarity: 'epic' },
      { emoji: '🔱', name: '海神三叉戟', id: 'ocean_trident', rarity: 'legendary' }
    ]
  }
}

// 稀有度配置
export const rarityConfig = {
  common: { name: '普通', color: '#9CA3AF', probability: 0.5 },
  uncommon: { name: '不常见', color: '#10B981', probability: 0.3 },
  rare: { name: '稀有', color: '#3B82F6', probability: 0.15 },
  epic: { name: '史诗', color: '#8B5CF6', probability: 0.04 },
  legendary: { name: '传说', color: '#F59E0B', probability: 0.01 }
}

// 获取所有梦境物品（扁平化）
export const dreamItems = Object.values(dreamItemsByTheme)
  .flatMap(theme => theme.items)

// 根据主题获取物品
export function getItemsByTheme(themeId) {
  return dreamItemsByTheme[themeId]?.items || []
}

// 根据稀有度随机选择物品
export function getRandomItemByTheme(themeId) {
  const themeItems = getItemsByTheme(themeId)
  if (themeItems.length === 0) return null
  
  const random = Math.random()
  let cumulativeProbability = 0
  
  // 按稀有度排序（从传说到普通）
  const sortedByRarity = [...themeItems].sort((a, b) => {
    const rarityOrder = ['legendary', 'epic', 'rare', 'uncommon', 'common']
    return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
  })
  
  for (const item of sortedByRarity) {
    cumulativeProbability += rarityConfig[item.rarity].probability
    if (random <= cumulativeProbability) {
      return item
    }
  }
  
  // 如果没有选中，返回普通物品
  return themeItems.find(item => item.rarity === 'common') || themeItems[0]
}

// 获取所有收藏的物品
export function getCollectedItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading collected items:', error)
  }
  return []
}

// 添加收藏物品
export function addCollectedItem(itemId) {
  try {
    const collected = getCollectedItems()
    if (!collected.includes(itemId)) {
      collected.push(itemId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collected))
      return true
    }
  } catch (error) {
    console.error('Error saving collected item:', error)
  }
  return false
}

// 检查是否已收藏
export function isCollected(itemId) {
  const collected = getCollectedItems()
  return collected.includes(itemId)
}

// 获取收藏数量
export function getCollectionCount() {
  return getCollectedItems().length
}

// 按主题获取收藏的物品
export function getCollectedItemsByTheme(themeId) {
  const collectedIds = getCollectedItems()
  const themeItems = getItemsByTheme(themeId)
  
  return themeItems.filter(item => collectedIds.includes(item.id))
}

// 获取主题收藏进度
export function getThemeProgress(themeId) {
  const themeItems = getItemsByTheme(themeId)
  const collectedItems = getCollectedItemsByTheme(themeId)
  
  return {
    collected: collectedItems.length,
    total: themeItems.length,
    percentage: themeItems.length > 0 ? Math.round((collectedItems.length / themeItems.length) * 100) : 0
  }
}

// 获取今天的收藏（按日期分组）
export function getTodayCollection() {
  const collectedIds = getCollectedItems()
  const today = new Date().toISOString().split('T')[0]
  
  return collectedIds.map(id => {
    const item = dreamItems.find(i => i.id === id)
    return item ? { ...item, date: today } : null
  }).filter(Boolean)
}

