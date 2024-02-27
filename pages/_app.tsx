import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import { useAudio } from 'hooks/use-audio'

import flicker from '../assets/flicker.ogg'
import working from '../assets/working.ogg'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }: AppProps) {
  const signRef = useRef<HTMLHeadingElement | null>(null)
  const audioElementRef = useRef<HTMLAudioElement>(null)

  const [lightsOn, setLightsOn] = useState(false)
  const { playAudio, stopAudio } = useAudio(audioElementRef)

  useEffect(() => {
    signRef.current = document.querySelector('h2 sup span') as HTMLHeadingElement
  }, [])

  useEffect(() => {
    const sign = signRef.current
    let timeoutPause: NodeJS.Timeout | null = null
    let timeoutPlay: NodeJS.Timeout | null = null

    if (sign == null) return

    sign.style.cursor = 'pointer'

    function playSounds() {
      playAudio(flicker)
      timeoutPause = setTimeout(() => stopAudio(), 3000)
      timeoutPlay = setTimeout(() => playAudio(working), 3200)
    }

    function stopSounds() {
      stopAudio()
      if (timeoutPause) clearTimeout(timeoutPause)
      if (timeoutPlay) clearTimeout(timeoutPlay)
    }

    if (lightsOn) {
      playSounds()
      sign.style.animation = 'flicker 3s 1 alternate, pulsate 0.4s ease-in-out 3.2s infinite'
    } else {
      stopSounds()
      sign.style.animation = 'none'
    }

    return () => {
      stopSounds()
    }
  }, [lightsOn, playAudio, stopAudio])

  return (
    <main className={clsx(inter.variable, 'font-sans')} onClick={() => setLightsOn(!lightsOn)}>
      <Component {...pageProps} />
      <audio id="audio" ref={audioElementRef} />
    </main>
  )
}

export default MyApp
