import { config } from '../config'

function Person({ role, person, photo }) {
  return (
    <div className="person reveal">
      <p className="role">{role}</p>
      <img className="person-photo" src={`assets/${photo}`} alt={person.name} />
      <h2 className="script pname">{person.name}</h2>
      <p className="parents">
        {role === 'The Groom' ? 'Putra dari' : 'Putri dari'}
        <br />
        Bapak {person.father} &amp; Ibu {person.mother}
      </p>
    </div>
  )
}

export default function Couple() {
  return (
    <section id="couple" className="center">
      <p className="eyebrow reveal">
        Dengan memohon rahmat dan ridho Allah SWT,
        <br />
        kami bermaksud menyelenggarakan pernikahan putra-putri kami
      </p>

      <Person role="The Groom" person={config.groom} photo="groom.jpg" />
      <div className="amp reveal">&amp;</div>
      <Person role="The Bride" person={config.bride} photo="bride.jpg" />
    </section>
  )
}
