// 闹钟管理工具
const ALARM_STORAGE_KEY = 'sleep-companion-alarm'

let alarmTimeout = null
let alarmCheckInterval = null

export function setAlarm(alarmData) {
  // 清除之前的闹钟
  clearAlarm()
  
  const { hours, minutes, time24 } = alarmData
  const now = new Date()
  const alarmTime = new Date()
  
  alarmTime.setHours(hours, minutes, 0, 0)
  
  // 如果设置的时间已经过了今天，则设置为明天
  if (alarmTime <= now) {
    alarmTime.setDate(alarmTime.getDate() + 1)
  }
  
  // 保存闹钟信息到本地存储
  const alarmInfo = {
    time: alarmTime.getTime(),
    hours,
    minutes,
    time24,
    isActive: true
  }
  
  localStorage.setItem(ALARM_STORAGE_KEY, JSON.stringify(alarmInfo))
  
  // 设置闹钟检查
  startAlarmCheck()
  
  console.log(`闹钟已设置: ${time24}, 将在 ${alarmTime.toLocaleString()} 响起`)
  
  return alarmInfo
}

export function clearAlarm() {
  if (alarmTimeout) {
    clearTimeout(alarmTimeout)
    alarmTimeout = null
  }
  
  if (alarmCheckInterval) {
    clearInterval(alarmCheckInterval)
    alarmCheckInterval = null
  }
  
  localStorage.removeItem(ALARM_STORAGE_KEY)
  console.log('闹钟已清除')
}

export function getActiveAlarm() {
  try {
    const stored = localStorage.getItem(ALARM_STORAGE_KEY)
    if (stored) {
      const alarmInfo = JSON.parse(stored)
      if (alarmInfo.isActive) {
        // 只有当闹钟时间超过当前时间很久（比如1分钟）才清除
        // 这样可以避免在触发时被意外清除
        const timeDiff = Date.now() - alarmInfo.time
        if (timeDiff > 60000) { // 超过1分钟才清除
          console.log('闹钟已过期超过1分钟，清除闹钟')
          clearAlarm()
          return null
        }
        return alarmInfo
      }
    }
  } catch (error) {
    console.error('获取闹钟信息失败:', error)
  }
  return null
}

function startAlarmCheck() {
  console.log('开始闹钟检查...')
  // 每秒检查一次是否到了闹钟时间
  alarmCheckInterval = setInterval(() => {
    // 直接从存储中获取闹钟信息，避免被getActiveAlarm清除
    try {
      const stored = localStorage.getItem(ALARM_STORAGE_KEY)
      if (stored) {
        const alarm = JSON.parse(stored)
        if (alarm.isActive) {
          const now = Date.now()
          const timeLeft = alarm.time - now
          console.log(`闹钟检查: 剩余时间 ${Math.floor(timeLeft / 1000)} 秒, 闹钟时间: ${new Date(alarm.time).toLocaleString()}, 当前时间: ${new Date(now).toLocaleString()}`)
          
          if (now >= alarm.time) {
            console.log('闹钟时间到！触发闹钟')
            triggerAlarm(alarm)
          }
        }
      } else {
        console.log('没有活跃的闹钟')
      }
    } catch (error) {
      console.error('闹钟检查出错:', error)
    }
  }, 1000)
}

function triggerAlarm(alarmInfo) {
  console.log('🚨 闹钟响起！', alarmInfo.time24)
  console.log('🚨 触发闹钟事件，当前路径:', window.location.pathname)
  
  // 清除闹钟
  clearAlarm()
  
  // 显示通知
  showAlarmNotification(alarmInfo)
  
  // 播放提示音（如果浏览器支持）
  playAlarmSound()
  
  // 触发自定义事件，让应用知道闹钟响了
  // 传递当前页面信息，让不同页面有不同的处理逻辑
  const event = new CustomEvent('alarmTriggered', {
    detail: {
      ...alarmInfo,
      currentPath: window.location.pathname
    }
  })
  
  console.log('🚨 派发闹钟事件:', event.detail)
  window.dispatchEvent(event)
}

function showAlarmNotification(alarmInfo) {
  // 检查浏览器是否支持通知
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification('睡眠伴侣提醒', {
        body: `该起床了！现在是 ${alarmInfo.time24}`,
        icon: '/favicon.ico', // 可以替换为应用图标
        tag: 'sleep-companion-alarm'
      })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('睡眠伴侣提醒', {
            body: `该起床了！现在是 ${alarmInfo.time24}`,
            icon: '/favicon.ico',
            tag: 'sleep-companion-alarm'
          })
        }
      })
    }
  }
  
  // 不再使用 alert，改为通过事件系统处理
  console.log('闹钟通知已发送')
}

function playAlarmSound() {
  // 创建一个简单的提示音
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.5)
    
    // 重复几次
    setTimeout(() => {
      const osc2 = audioContext.createOscillator()
      const gain2 = audioContext.createGain()
      osc2.connect(gain2)
      gain2.connect(audioContext.destination)
      osc2.frequency.setValueAtTime(600, audioContext.currentTime)
      gain2.gain.setValueAtTime(0.3, audioContext.currentTime)
      osc2.start()
      osc2.stop(audioContext.currentTime + 0.5)
    }, 600)
  } catch (error) {
    console.log('无法播放提示音:', error)
  }
}

// 初始化：检查是否有活跃的闹钟
export function initAlarmManager() {
  const activeAlarm = getActiveAlarm()
  if (activeAlarm) {
    startAlarmCheck()
    console.log('发现活跃闹钟，继续监听:', activeAlarm.time24)
  }
}

// 格式化剩余时间
export function getTimeUntilAlarm() {
  const alarm = getActiveAlarm()
  if (!alarm) return null
  
  const now = Date.now()
  const timeLeft = alarm.time - now
  
  if (timeLeft <= 0) return null
  
  const hours = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  
  return { hours, minutes, totalMinutes: Math.floor(timeLeft / (1000 * 60)) }
}

// 测试功能：设置一个10秒后的闹钟
export function setTestAlarm() {
  const now = new Date()
  const testTime = new Date(now.getTime() + 10000) // 10秒后
  
  // 直接使用时间戳，不依赖小时分钟的计算
  const alarmInfo = {
    time: testTime.getTime(),
    hours: testTime.getHours(),
    minutes: testTime.getMinutes(),
    time24: `${testTime.getHours().toString().padStart(2, '0')}:${testTime.getMinutes().toString().padStart(2, '0')}`,
    isActive: true
  }
  
  // 清除之前的闹钟
  clearAlarm()
  
  // 保存闹钟信息到本地存储
  localStorage.setItem(ALARM_STORAGE_KEY, JSON.stringify(alarmInfo))
  
  // 设置闹钟检查
  startAlarmCheck()
  
  console.log(`测试闹钟已设置: ${alarmInfo.time24}, 将在 ${testTime.toLocaleString()} 响起`)
  console.log(`当前时间: ${now.toLocaleString()}, 闹钟时间: ${testTime.toLocaleString()}`)
  
  return alarmInfo
}