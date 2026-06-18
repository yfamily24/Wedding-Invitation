import { config } from '../config'
import Divider from './Divider'

export default function Closing() {
  return (
    <section id="closing" className="center">
      <p className="eyebrow reveal">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami
        <br />
        apabila Bapak/Ibu/Saudara/i berkenan hadir
        <br />
        untuk memberikan doa restu.
      </p>
      <Divider />
      <p className="serif reveal" style={{ fontSize: 18, color: 'var(--green-soft)' }}>
        Wassalamu'alaikum Warahmatullahi Wabarakatuh
      </p>
      <p className="reveal" style={{ marginTop: 30, fontSize: 13, letterSpacing: 3, color: 'var(--gold)' }}>
        KAMI YANG BERBAHAGIA
      </p>
      <h2 className="script closing-names reveal">
        {config.groom.name.split(' ')[0]} <span className="amp-reg">&amp;</span> {config.bride.name.split(' ')[0]}
      </h2>
    </section>
  )
}
