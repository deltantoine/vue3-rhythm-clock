<template>
  <i
    class="clock__needle"
    :style="needleStyle"
  />
</template>

<script setup lang="ts">
import { toRefs, reactive, onMounted, onUnmounted } from 'vue'

import { useStartTimeStore } from '@/store/startTime'
import { useSoundStore } from '@/store/sound'
import { storeToRefs } from 'pinia'

import { HALF_LOOP_DURATION } from '@/config'

import { Color } from '@/types'

// types declaration
interface Props {
  index: number
  color: Color
  note: string
}

interface Emits {
  (e: 'playSound', note: string): void
}

// props
const props = defineProps<Props>()
const { index, color, note } = toRefs(props)

// emits
const emit = defineEmits<Emits>()

// store
const startTimeStore = useStartTimeStore()
const soundStore = useSoundStore()
const { date } = storeToRefs(startTimeStore)
const { soundOn } = storeToRefs(soundStore)

// data
let timer = 0
const animationDuration = HALF_LOOP_DURATION / (1.5 * (index.value + 1))

// methods
const playSound = () => {
  if (soundOn.value) {
    emit('playSound', note.value)
  }
}

const calcWidth = () => {
  const widthPercentage = 50 - 3 * index.value
  return `${widthPercentage}%`
}

const calcInitialDelay = () => {
  const now = new Date()
  const secondsGap = Math.abs(now.getTime() - date.value.getTime()) / 1000
  const modulo = secondsGap % HALF_LOOP_DURATION
  const timeLeft = modulo % animationDuration
  return timeLeft
}

const setTimer = (midway: boolean) => {
  let lapTime
  if (midway) {
    lapTime = ((animationDuration * 1000) / 2) - ((calcInitialDelay() * 1000))
    if (lapTime < 0) {
      lapTime = lapTime + (animationDuration * 1000) / 2
    }
  } else {
    lapTime = (animationDuration * 1000) / 2
  }

  clearInterval(timer)

  timer = window.setInterval(() => {
    playSound()
    setTimer(false)
  }, lapTime)
}

const clearTimer = () => {
  window.clearInterval(timer)
}

// style
const needleStyle = reactive({
  width: calcWidth(),
  color: color.value,
  animationDuration: `${animationDuration}s`,
  animationDelay: `-${calcInitialDelay()}s`
})

// hooks
onMounted(() => {
  const now = new Date()
  const secondsGap = Math.abs(now.getTime() - date.value.getTime()) / 1000
  const midway = secondsGap > 0.5
  setTimer(midway)
})

onUnmounted(() => {
  clearTimer()
})
</script>
