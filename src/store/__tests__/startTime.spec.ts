import { setActivePinia, createPinia } from 'pinia'
import { useStartTimeStore } from '@/store/startTime'

const initialState = {
  date: new Date()
}

describe('store/startTime.ts', () => {
  let startTimeStore: ReturnType<typeof useStartTimeStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    startTimeStore = useStartTimeStore()
    startTimeStore.$patch(initialState)
  })

  afterEach(() => {
    startTimeStore.$reset()
  })

  describe('state :', () => {
    it('original state', () => {
      expect(startTimeStore.$state).toEqual(initialState)
    })
  })
})
