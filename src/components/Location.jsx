import { config } from '../config'
import Divider from './Divider'

export default function Location() {
  const { name, address, mapsEmbed, mapsLink } = config.venue
  return (
    <section id="location">
      <p className="eyebrow reveal">Lokasi Acara</p>
      <h2 className="serif reveal" style={{ fontSize: 34, color: 'var(--green)', marginTop: 6 }}>
        {name}
      </h2>
      <Divider />
      <p className="addr reveal">
        {address.map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <div className="map-wrap reveal">
        <iframe
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapsEmbed}
          title={`Lokasi ${name}`}
        />
      </div>
      <a className="btn reveal" target="_blank" rel="noopener noreferrer" href={mapsLink}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        Buka di Google Maps
      </a>
    </section>
  )
}
