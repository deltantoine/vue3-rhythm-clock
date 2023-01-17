import {
  afterAll,
  beforeAll
} from 'vitest'

beforeAll(() => {
  // @ts-expect-error type
  global.jest = vi
})

afterAll(() => {
  // @ts-expect-error type
  delete global.jest
})
