import { config } from '../config'
import Divider from './Divider'

export default function Intro() {
  return (
    <section id="intro" className="center">
      <img className="welcome-photo reveal" src="assets/welcome_photo.jpg" alt="Ilham & Devi" />
      <p className="basmalah serif">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
      <p className="eyebrow">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
      <Divider />
      <p className="verse reveal">&ldquo;{config.verse.text}&rdquo;</p>
      <p className="muted reveal" style={{ marginTop: 14, fontSize: 13, letterSpacing: 2 }}>
        — {config.verse.ref} —
      </p>
    </section>
  )
}
