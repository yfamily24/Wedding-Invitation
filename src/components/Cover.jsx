import { config } from '../config'

export default function Cover({ guestName, opened, onOpen }) {
  return (
    <div id="cover" className={opened ? 'hide' : ''}>
      <div className="cover-frame">
        <p className="cover-eyebrow">The Wedding Of</p>
        <h1 className="script cover-names">
          <span className="cn-line">{config.groom.name.split(' ')[0]}</span>
          <span className="amp-reg cn-amp">&amp;</span>
          <span className="cn-line">{config.bride.name.split(' ')[0]}</span>
        </h1>
        <p className="cover-date">{config.dateLabel.toUpperCase()}</p>
        <div className="guest-box">
          <p className="lbl">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="name">{guestName}</p>
        </div>
        <button className="btn btn-solid" onClick={onOpen}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7l9 6 9-6" />
            <rect x="3" y="5" width="18" height="14" rx="2" />
          </svg>
          Buka Undangan
        </button>
      </div>
    </div>
  )
}
