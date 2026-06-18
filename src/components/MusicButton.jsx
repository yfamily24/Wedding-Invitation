export default function MusicButton({ playing, onToggle }) {
  return (
    <button
      id="music-btn"
      className={playing ? 'playing' : ''}
      onClick={onToggle}
      aria-label="Putar / hentikan musik"
    >
      {playing ? (
        // Nada musik — sedang diputar
        <svg className="ico-note" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ) : (
        // Speaker disilang — musik dimatikan (mute)
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  )
}
