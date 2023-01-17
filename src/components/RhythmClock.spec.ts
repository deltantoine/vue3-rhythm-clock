import {
  shallowMount,
  VueWrapper
} from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'
import { useSoundStore } from '@/store/sound'

import { useSoundPlayer } from '@/composables/use_sound_player'

import RhythmClock from '@/components/RhythmClock.vue'

import {
  MAX_NEEDLE_NUMBER,
  MIN_NEEDLE_NUMBER
} from '@/config'

vi.mock('@/composables/use_sound_player', () => ({
  useSoundPlayer: vi.fn(() => ({
    playSound: vi.fn()
  }))
}))

const factory = (options = {}) => {
  return shallowMount(RhythmClock, options)
}

describe('components/RhythmClock.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any>

  const mockUseSoundPlayer = useSoundPlayer as ReturnType<typeof vi.fn>
  const playSound = vi.fn()

  let soundStore: ReturnType<typeof useSoundStore>

  beforeEach(() => {
    mockUseSoundPlayer.mockImplementation(() => ({
      playSound
    }))

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
    it('gradientArray is correctly calculated', () => {
      const expectedBaseColors = [
        '#0aeaff', '#15d7ff',
        '#1fc3ff', '#2ab0ff',
        '#349cff', '#3f89ff',
        '#4975ff', '#5462ff',
        '#5e4eff', '#693bff',
        '#7327ff', '#7e14ff',
        '#8800ff'
      ]

      expect(wrapper.vm.gradientArray).toEqual(expectedBaseColors)

      wrapper.vm.startColor = '#FF9500'
      wrapper.vm.endColor = '#FF0000'
      wrapper.vm.needleNumber = 5

      const expectedChangedColors = [
        '#ff7700', '#ff5900',
        '#ff3c00', '#ff1e00',
        '#ff0000'
      ]

      expect(wrapper.vm.gradientArray).toEqual(expectedChangedColors)
    })

    it('needleArray is correctly calculated', () => {
      const expectedBaseNeedles = [
        { index: 0, color: '#0aeaff', key: '0#0aeaff', note: 'C3' },
        { index: 1, color: '#15d7ff', key: '1#15d7ff', note: 'C#3' },
        { index: 2, color: '#1fc3ff', key: '2#1fc3ff', note: 'D3' },
        { index: 3, color: '#2ab0ff', key: '3#2ab0ff', note: 'D#3' },
        { index: 4, color: '#349cff', key: '4#349cff', note: 'E3' },
        { index: 5, color: '#3f89ff', key: '5#3f89ff', note: 'F3' },
        { index: 6, color: '#4975ff', key: '6#4975ff', note: 'F#3' },
        { index: 7, color: '#5462ff', key: '7#5462ff', note: 'G3' },
        { index: 8, color: '#5e4eff', key: '8#5e4eff', note: 'G#3' },
        { index: 9, color: '#693bff', key: '9#693bff', note: 'A3' },
        { index: 10, color: '#7327ff', key: '10#7327ff', note: 'A#3' },
        { index: 11, color: '#7e14ff', key: '11#7e14ff', note: 'B3' },
        { index: 12, color: '#8800ff', key: '12#8800ff', note: 'C4' }
      ]

      expect(wrapper.vm.needleArray).toEqual(expectedBaseNeedles)

      wrapper.vm.startColor = '#FF9500'
      wrapper.vm.endColor = '#FF0000'
      wrapper.vm.needleNumber = 3

      const expectedChangedNeedles = [
        { index: 0, color: '#ff6300', key: '0#ff6300', note: 'C3' },
        { index: 1, color: '#ff3200', key: '1#ff3200', note: 'C#3' },
        { index: 2, color: '#ff0000', key: '2#ff0000', note: 'D3' }
      ]

      expect(wrapper.vm.needleArray).toEqual(expectedChangedNeedles)
    })
  })

  describe('methods:', () => {
    describe('playNote:', () => {
      it('Play sound method will be called', () => {
        wrapper.vm.playNote('C3')
        expect(playSound).toHaveBeenCalledWith('C3')

        wrapper.vm.playNote('A5')
        expect(playSound).toHaveBeenCalledWith('A5')
      })
    })
  })

  describe('watchers:', () => {
    describe('needleNumber:', () => {
      it('When the value exceed the max', async () => {
        wrapper.vm.needleNumber = 20
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.needleNumber).toBe(MAX_NEEDLE_NUMBER)
      })

      it('When the value exceed the min', async () => {
        wrapper.vm.needleNumber = 0
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.needleNumber).toBe(MIN_NEEDLE_NUMBER)
      })
    })
  })
})
