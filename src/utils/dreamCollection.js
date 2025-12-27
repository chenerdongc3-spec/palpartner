// 梦境收藏管理工具
const STORAGE_KEY = 'dream-collection'

export const dreamItems = [
  { emoji: '⭐', name: 'star', id: 'star' },
  { emoji: '🛏️', name: 'blanket', id: 'blanket' },
  { emoji: '💡', name: 'light', id: 'light' },
  { emoji: '🌙', name: 'moon', id: 'moon' },
  { emoji: '✨', name: 'sparkle', id: 'sparkle' },
  { emoji: '🦋', name: 'butterfly', id: 'butterfly' },
  { emoji: '🌸', name: 'flower', id: 'flower' },
  { emoji: '🍃', name: 'leaf', id: 'leaf' }
]

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

// 获取今天的收藏（按日期分组）
export function getTodayCollection() {
  const collectedIds = getCollectedItems()
  const today = new Date().toISOString().split('T')[0]
  
  // 这里简化处理，实际可以根据日期分组
  return collectedIds.map(id => {
    const item = dreamItems.find(i => i.id === id)
    return item ? { ...item, date: today } : null
  }).filter(Boolean)
}

