import { config } from '../config'
import Divider from './Divider'

export default function Events() {
  return (
    <section id="events">
      <div className="center">
        <p className="eyebrow reveal">Save The Date</p>
        <h2 className="serif reveal" style={{ fontSize: 34, color: 'var(--green)', marginTop: 6 }}>
          Akad &amp; Resepsi
        </h2>
        <Divider />
      </div>

      {config.events.map((ev) => (
        <div className="event-card reveal" key={ev.title}>
          <h3>{ev.title}</h3>
          <p className="big-date">{ev.day}</p>
          <p className="when">
            <strong>{ev.dateLabel}</strong>
          </p>
          <p className="when muted">{ev.time}</p>
          {ev.note && (
            <p className="when muted" style={{ fontSize: 13 }}>
              {ev.note}
            </p>
          )}
        </div>
      ))}

      <p className="center reveal" style={{ marginTop: 22, color: 'var(--green-soft)' }}>
        Bertempat di <strong>{config.venue.name}</strong>, Bandung
      </p>
    </section>
  )
}
