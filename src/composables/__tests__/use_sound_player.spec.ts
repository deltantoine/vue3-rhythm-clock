import { useSoundPlayer } from '@/composables/use_sound_player'

import { createTestingPinia } from '@pinia/testing'
import { useSoundStore } from '@/store/sound'

vi.mock('tone', () => {
  const Sampler = vi.fn(() => ({
    toDestination: vi.fn(),
    triggerAttack: vi.fn()
  }))
  return { Sampler }
})

describe('composables/use_sound_player.spec', () => {
  let soundPlayer: ReturnType<typeof useSoundPlayer>
  let soundStore: ReturnType<typeof useSoundStore>

  beforeEach(() => {
    const pinia = createTestingPinia()
    soundStore = useSoundStore(pinia)

    soundPlayer = useSoundPlayer()
    soundPlayer.playSound = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
    soundStore.$reset()
  })

  it('playSound:', () => {
    soundPlayer.playSound('A3')
    expect(soundPlayer.playSound).toHaveBeenCalledWith('A3')
  })
})
