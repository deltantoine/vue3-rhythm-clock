<template>
  <header class="header">
    <div class="header__inner">
      <div
        class="button button--sound"
        :class="buttonClassModifier"
      >
        <button
          type="button"
          :disabled="buttonDisabled"
          @click="toggleSound"
        >
          Sound
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useSoundStore } from '@/store/sound'
import { storeToRefs } from 'pinia'

// store
const soundStore = useSoundStore()
const { soundOn, soundsAreLoaded } = storeToRefs(soundStore)

// computed
const buttonClassModifier = computed(() => {
  return soundOn.value ? 'button--sound-on' : 'button--sound-off'
})

const buttonDisabled = computed(() => {
  return !soundsAreLoaded.value
})

// methods
const toggleSound = () => {
  soundOn.value ? soundStore.turnOffSound() : soundStore.turnOnSound()
}
</script>
