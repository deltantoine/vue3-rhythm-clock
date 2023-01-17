import { setActivePinia, createPinia } from 'pinia'
import { useSoundStore } from '@/store/sound'

import { SoundState } from '@/types'

const initialState: SoundState = {
  soundOn: false,
  soundsAreLoaded: false
}
const soundOnStore: SoundState = {
  soundOn: true,
  soundsAreLoaded: true
}

describe('store/sound.ts', () => {
  let soundStore: ReturnType<typeof useSoundStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    soundStore = useSoundStore()
    soundStore.$patch(initialState)
  })

  afterEach(() => {
    soundStore.$reset()
  })

  describe('state :', () => {
    it('original state', () => {
      expect(soundStore.$state).toEqual(initialState)
    })

    it('sound on state', () => {
      soundStore.$patch(soundOnStore)
      expect(soundStore.$state).toEqual(soundOnStore)
    })
  })

  describe('actions :', () => {
    describe('turnOffSound', () => {
      it('soundOn become false', () => {
        soundStore.$patch(soundOnStore)

        soundStore.turnOffSound()
        expect(soundStore.soundOn).toBe(false)
      })
    })

    describe('turnOnSound', () => {
      it('soundOn become true', () => {
        soundStore.turnOnSound()
        expect(soundStore.soundOn).toBe(true)
      })
    })

    describe('soundsReady', () => {
      it('soundsAreLoaded become true', () => {
        soundStore.soundsReady()
        expect(soundStore.soundsAreLoaded).toBe(true)
      })
    })
  })
})
