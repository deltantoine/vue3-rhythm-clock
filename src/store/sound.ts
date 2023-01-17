import { defineStore } from 'pinia'

import { SoundState } from '@/types'

export const useSoundStore = defineStore('sound', {
  state: (): SoundState => ({
    soundOn: false,
    soundsAreLoaded: false
  }),
  actions: {
    turnOffSound () {
      this.soundOn = false
    },
    turnOnSound () {
      this.soundOn = true
    },
    soundsReady () {
      this.soundsAreLoaded = true
    }
  }
})
