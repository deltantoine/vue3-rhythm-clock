import { Sampler } from 'tone'

import { useSoundStore } from '@/store/sound'

import C3 from '@/assets/sounds/301-C3.mp3'
import CS3 from '@/assets/sounds/302-CS3.mp3'
import D3 from '@/assets/sounds/303-D3.mp3'
import DS3 from '@/assets/sounds/304-DS3.mp3'
import E3 from '@/assets/sounds/305-E3.mp3'
import F3 from '@/assets/sounds/306-F3.mp3'
import FS3 from '@/assets/sounds/307-FS3.mp3'
import G3 from '@/assets/sounds/308-G3.mp3'
import GS3 from '@/assets/sounds/309-GS3.mp3'
import A3 from '@/assets/sounds/310-A3.mp3'
import AS3 from '@/assets/sounds/311-AS3.mp3'
import B3 from '@/assets/sounds/312-B3.mp3'
import C4 from '@/assets/sounds/401-C4.mp3'
import CS4 from '@/assets/sounds/402-CS4.mp3'
import D4 from '@/assets/sounds/403-D4.mp3'
import DS4 from '@/assets/sounds/404-DS4.mp3'
import E4 from '@/assets/sounds/405-E4.mp3'
import F4 from '@/assets/sounds/406-F4.mp3'
import FS4 from '@/assets/sounds/407-FS4.mp3'
import G4 from '@/assets/sounds/408-G4.mp3'
import GS4 from '@/assets/sounds/409-GS4.mp3'
import A4 from '@/assets/sounds/410-A4.mp3'
import AS4 from '@/assets/sounds/411-AS4.mp3'
import B4 from '@/assets/sounds/412-B4.mp3'

export const useSoundPlayer = () => {
  // store
  const soundStore = useSoundStore()

  const soundPlayer = new Sampler(
    { C3, 'C#3': CS3, D3, 'D#3': DS3, E3, F3, 'F#3': FS3, G3, 'G#3': GS3, A3, 'A#3': AS3, B3, C4, 'C#4': CS4, D4, 'D#4': DS4, E4, F4, 'F#4': FS4, G4, 'G#4': GS4, A4, 'A#4': AS4, B4 },
    {
      onload: () => {
        soundStore.soundsReady()
      }
    }
  ).toDestination()

  console.log(soundPlayer)

  const playSound = (note = 'C3') => {
    soundPlayer.triggerAttack(note)
  }

  return {
    playSound
  }
}
