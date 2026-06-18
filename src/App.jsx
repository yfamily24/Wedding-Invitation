import { useEffect, useMemo, useRef, useState } from 'react'
import { config } from './config'
import { useReveal } from './hooks/useReveal'

import Cover from './components/Cover'
import MusicButton from './components/MusicButton'
import Intro from './components/Intro'
import Couple from './components/Couple'
import Events from './components/Events'
import Countdown from './components/Countdown'
import Location from './components/Location'
import Rsvp from './components/Rsvp'
import Closing from './components/Closing'
import Footer from './components/Footer'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  // Guest name from URL: ?to=Nama  (or ?kepada=Nama)
  const guestName = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get('to') || params.get('kepada')
    return to ? decodeURIComponent(to.replace(/\+/g, ' ')) : 'Tamu Undangan'
  }, [])

  // Lock background scroll while the cover is showing.
  useEffect(() => {
    document.body.classList.toggle('locked', !opened)
  }, [opened])

  // Re-scan reveal targets once the invitation is opened.
  useReveal([opened])

  const openInvitation = () => {
    setOpened(true)
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.6
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }
    window.scrollTo({ top: 0 })
  }

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <Cover guestName={guestName} opened={opened} onOpen={openInvitation} />

      <audio ref={audioRef} loop preload="auto" src={config.music.src} />
      {opened && <MusicButton playing={playing} onToggle={toggleMusic} />}

      <main>
        <Intro />
        <Couple />
        <Events />
        <Countdown />
        <Location />
        <Rsvp />
        <Closing />
        <Footer />
      </main>
    </>
  )
}
