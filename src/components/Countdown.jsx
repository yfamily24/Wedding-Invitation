import { config } from '../config'
import { useCountdown } from '../hooks/useCountdown'

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(config.weddingDate)
  const boxes = [
    { num: days, unit: 'Hari' },
    { num: hours, unit: 'Jam' },
    { num: minutes, unit: 'Menit' },
    { num: seconds, unit: 'Detik' },
  ]
  return (
    <section id="countdown">
      <p className="eyebrow reveal" style={{ color: 'var(--gold-light)' }}>
        Menuju Hari Bahagia
      </p>
      <div className="cd-grid reveal">
        {boxes.map((b) => (
          <div className="cd-box" key={b.unit}>
            <div className="num">{b.num}</div>
            <div className="unit">{b.unit}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
