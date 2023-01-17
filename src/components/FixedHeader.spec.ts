import {
  shallowMount,
  VueWrapper
} from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'
import { useSoundStore } from '@/store/sound'

import FixedHeader from '@/components/FixedHeader.vue'

const factory = (options = {}) => {
  return shallowMount(FixedHeader, options)
}

describe('components/FixedHeader.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any>

  let soundStore: ReturnType<typeof useSoundStore>

  beforeEach(() => {
    wrapper = factory({
      global: {
        plugins: [
          createTestingPinia()
        ]
      }
    })
    soundStore = useSoundStore()
  })

  afterEach(() => {
    soundStore.$reset()
  })

  describe('computed:', () => {
    it('buttonClassModifier is correctly calculated', () => {
      expect(wrapper.vm.buttonClassModifier).toBe('button--sound-off')

      soundStore.$patch({ soundOn: true })

      expect(wrapper.vm.buttonClassModifier).toBe('button--sound-on')
    })

    it('buttonDisabled is correctly calculated', () => {
      expect(wrapper.vm.buttonDisabled).toBe(true)

      soundStore.$patch({ soundsAreLoaded: true })

      expect(wrapper.vm.buttonDisabled).toBe(false)
    })
  })

  describe('methods:', () => {
    describe('toggleSound:', () => {
      it('When soundOn is false: call store turnOnSound() method:', () => {
        wrapper.vm.toggleSound()

        expect(soundStore.turnOnSound).toHaveBeenCalled()
        expect(soundStore.turnOffSound).not.toHaveBeenCalled()
      })

      it('When soundOn is true: call store turnOffSound() method:', () => {
        soundStore.$patch({ soundOn: true })
        wrapper.vm.toggleSound()

        expect(soundStore.turnOffSound).toHaveBeenCalled()
        expect(soundStore.turnOnSound).not.toHaveBeenCalled()
      })
    })
  })
})
