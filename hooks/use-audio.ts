import { RefObject } from 'react'

export function useAudio(audio: RefObject<HTMLAudioElement> | null): {
  playAudio: (file: string) => void
  stopAudio: () => void
} {
  function playAudio(file: string) {
    if (audio == null || audio.current == null) return

    stopAudio()
    audio.current.src = file
    audio.current.volume = 0.2
    audio.current.loop = true
    audio.current.play()
  }

  function stopAudio() {
    if (audio == null || audio.current == null) return

    audio.current.pause()
    audio.current.currentTime = 0
  }

  return {
    playAudio,
    stopAudio,
  }
}
