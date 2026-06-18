import { config } from '../config'

export default function Footer() {
  const { music } = config
  return (
    <footer>
      <p>
        The Wedding of {config.groom.name} &amp; {config.bride.name} · 14.11.2026
      </p>
      <p style={{ marginTop: 8, opacity: 0.7 }}>
        Musik: &ldquo;{music.title}&rdquo; oleh {music.artist} —{' '}
        <a href={music.licenseUrl} target="_blank" rel="noopener noreferrer">
          {music.licenseLabel}
        </a>
      </p>
    </footer>
  )
}
