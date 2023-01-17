<template>
  <section class="clock">
    <div class="clock__frame">
      <ClockNeedle
        v-for="(item) in needleArray"
        :key="item.key"
        :index="item.index"
        :color="item.color"
        :note="item.note"
        @play-sound="playNote"
      />
    </div>
    <div class="title">
      <h2>Settings</h2>
    </div>
    <div class="clock__settings">
      <div class="clock__needle-number">
        <div class="label">
          <label for="needleNumber">Needle Number</label>
        </div>
        <div class="inputs">
          <div class="input">
            <input
              id="needleNumber"
              v-model="needleNumber"
              type="number"
              min="1"
              max="16"
            >
          </div>
        </div>
      </div>
      <div class="clock__needle-colors">
        <div class="label">
          <label for="startColor">Needle Colors</label>
        </div>
        <div class="inputs">
          <div class="input">
            <input
              id="startColor"
              v-model="startColor"
              type="color"
            >
          </div>
          <div class="input">
            <input
              id="endColor"
              v-model="endColor"
              type="color"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { useStartTimeStore } from '@/store/startTime'

import ClockNeedle from '@/components/ClockNeedle.vue'

import Gradient from 'javascript-color-gradient'

import { useSoundPlayer } from '@/composables/use_sound_player'

import {
  DEFAULT_NEEDLE_NUMBER,
  DEFAULT_START_COLOR,
  DEFAULT_END_COLOR
} from '@/config'

// store
const startTimeStore = useStartTimeStore()
startTimeStore.date = new Date()

// composables
const { playSound } = useSoundPlayer()

// datas
const needleNumber = ref<number>(DEFAULT_NEEDLE_NUMBER)
const startColor = ref<string>(DEFAULT_START_COLOR)
const endColor = ref<string>(DEFAULT_END_COLOR)
const notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4']

// computed
const gradientArray = computed(() => {
  return new Gradient()
    .setColorGradient(startColor.value, endColor.value)
    .setMidpoint(needleNumber.value)
    .getColors()
})

const needleArray = computed(() => {
  const arr = []
  for (let i = 0; i < needleNumber.value; i++) {
    arr.push({
      index: i,
      color: gradientArray.value[i],
      key: i + gradientArray.value[i],
      note: notes[i]
    })
  }
  return arr
})

// methods
const playNote = (note: string) => {
  playSound(note)
}
</script>
