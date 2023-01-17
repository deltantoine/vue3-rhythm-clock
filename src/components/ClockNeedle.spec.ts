import {
  shallowMount,
  VueWrapper
} from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'
import { useSoundStore } from '@/store/sound'
import { useStartTimeStore } from '@/store/startTime'

import ClockNeedle from '@/components/ClockNeedle.vue'

const index = 2
const color = '#FF0000'
const note = 'C3'

const props = {
  index,
  color,
  note
}

const dayDate = new Date(2018, 11, 24, 10, 33, 30, 0)

const factory = (options = {}) => {
  return shallowMount(ClockNeedle, options)
}

describe('components/ClockNeedle.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any>

  let soundStore: ReturnType<typeof useSoundStore>
  let startTimeStore: ReturnType<typeof useStartTimeStore>

  beforeEach(() => {
    vi.useFakeTimers()

    vi.setSystemTime(dayDate)

    wrapper = factory({
      props,
      global: {
        plugins: [
          createTestingPinia()
        ]
      }
    })
    soundStore = useSoundStore()
    startTimeStore = useStartTimeStore()

    startTimeStore.$patch({ date: dayDate })
  })

  afterEach(() => {
    soundStore.$reset()
    startTimeStore.$reset()

    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('props:', () => {
    it('index: props is correctly set', () => {
      expect(wrapper.props().index).toBe(index)
    })

    it('color: props is correctly set', () => {
      expect(wrapper.props().color).toBe(color)
    })

    it('note: props is correctly set', () => {
      expect(wrapper.props().note).toBe(note)
    })
  })

  describe('methods:', () => {
    describe('playSound:', () => {
      it('When sound is on: emit sound event', () => {
        soundStore.$patch({ soundOn: true })

        wrapper.vm.playSound()

        expect(wrapper.emitted().playSound[0]).toEqual([note])
      })

      it("When sound is off: don't emit sound event", () => {
        wrapper.vm.playSound()

        expect(wrapper.emitted().playSound).toBe(undefined)
      })
    })

    describe('calcWidth:', () => {
      it('return a correct width', () => {
        expect(wrapper.vm.calcWidth()).toBe('44%')
      })
    })

    describe('calcInitialDelay:', () => {
      it('When the needle is created at the start:', () => {
        expect(wrapper.vm.calcInitialDelay()).toBe(0)
      })

      it('When the needle is created after:', () => {
        const createDate = new Date(2018, 11, 24, 10, 33, 40, 0)
        startTimeStore.$patch({ date: createDate })

        expect(wrapper.vm.calcInitialDelay()).toBe(10)
      })
    })
  })

  describe('style:', () => {
    it('needleStyle: is correctly calculated', () => {
      const expectedStyle = {
        animationDelay: '-0s',
        animationDuration: '13.333333333333334s',
        color: '#FF0000',
        width: '44%'
      }
      expect(wrapper.vm.needleStyle).toEqual(expectedStyle)
    })
  })
})
