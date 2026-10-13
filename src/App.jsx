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
import Gallery from './components/Gallery'
import BankAccount from './components/BankAccount'
import Closing from './components/Closing'
import Footer from './components/Footer'

export default function App() {
  const [opened, setOpened] = useState(false)
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef(null)
  const readyRef = useRef(false)

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

  // Load YouTube IFrame API + create hidden player on mount.
  useEffect(() => {
    const createPlayer = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        videoId: config.music.youtubeId,
        width: '200',
        height: '200',
        playerVars: { controls: 0, playsinline: 1, rel: 0, disablekb: 1 },
        events: {
          onReady: () => {
            readyRef.current = true
          },
          onStateChange: (e) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (e.data === 1) setPlaying(true)
            if (e.data === 2) setPlaying(false)
            if (e.data === 0) {
              e.target.seekTo(0)
              e.target.playVideo() // loop
            }
          },
          onError: () => setPlaying(false), // mis. embed dinonaktifkan pemilik video
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
      window.onYouTubeIframeAPIReady = createPlayer
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy()
    }
  }, [])

  const openInvitation = () => {
    setOpened(true)
    const player = playerRef.current
    if (player && readyRef.current) {
      player.setVolume(60)
      player.playVideo()
    }
    window.scrollTo({ top: 0 })
  }

  const toggleMusic = () => {
    const player = playerRef.current
    if (!player || !readyRef.current) return
    if (player.getPlayerState() === 1) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
  }

  return (
    <>
      <Cover guestName={guestName} opened={opened} onOpen={openInvitation} />

      {/* Player YouTube: ditaruh di luar layar, bukan display:none */}
      <div style={{ position: 'fixed', left: -9999, top: 0, width: 200, height: 200 }}>
        <div id="yt-player" />
      </div>

      {opened && <MusicButton playing={playing} onToggle={toggleMusic} />}

      <main>
        <Intro />
        <Couple />
        <Events />
        <Countdown />
        <Location />
        <Rsvp />
        <Gallery />
        <BankAccount />
        <Closing />
        <Footer />
      </main>
    </>
  )
}
