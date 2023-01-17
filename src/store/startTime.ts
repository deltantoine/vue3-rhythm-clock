import { defineStore } from 'pinia'

import { StartTime } from '@/types'

export const useStartTimeStore = defineStore('startTime', {
  state: (): StartTime => ({
    date: new Date()
  })
})
