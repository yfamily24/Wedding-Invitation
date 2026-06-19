import { useState } from 'react'
import { config } from '../config'
import Divider from './Divider'

const KEY = 'rsvp_ilham_devi'
const load = () => JSON.parse(localStorage.getItem(KEY) || '[]')
const ENDPOINT = config.rsvp?.endpoint || ''

export default function Rsvp() {
  const [entries, setEntries] = useState(load)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', attend: '', guests: '1', message: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const entry = { ...form, at: new Date().toISOString() }

    // Simpan lokal supaya tamu langsung melihat ucapannya tampil.
    const next = [...load(), entry]
    localStorage.setItem(KEY, JSON.stringify(next))
    setEntries(next)

    // Kirim ke Google Sheets lewat Apps Script (jika endpoint sudah diisi).
    // mode:'no-cors' + text/plain menghindari preflight CORS Apps Script.
    if (ENDPOINT) {
      try {
        await fetch(ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(entry),
        })
      } catch {
        // Diabaikan: data tetap aman tersimpan lokal di perangkat tamu.
      }
    }

    setSending(false)
    setSubmitted(true)
  }

  const wishes = entries.filter((r) => r.message).reverse()

  return (
    <section id="rsvp">
      <p className="eyebrow">Konfirmasi Kehadiran</p>
      <h2 className="serif" style={{ fontSize: 34, color: '#fff', marginTop: 6 }}>
        RSVP
      </h2>
      <Divider />
      {!submitted && (
        <p className="muted" style={{ color: 'var(--cream)', opacity: 0.85, fontSize: 14 }}>
          Mohon konfirmasi kehadiran Anda. Doa &amp; ucapan juga sangat kami nantikan.
        </p>
      )}

      {!submitted ? (
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="rName">Nama</label>
          <input id="rName" name="name" type="text" placeholder="Nama lengkap Anda" required value={form.name} onChange={update} />

          <label htmlFor="rAttend">Kehadiran</label>
          <select id="rAttend" name="attend" required value={form.attend} onChange={update}>
            <option value="" disabled>Pilih...</option>
            <option value="Hadir">Hadir</option>
            <option value="Tidak Hadir">Tidak Hadir</option>
          </select>

          <label htmlFor="rGuests">Jumlah Tamu</label>
          <select id="rGuests" name="guests" value={form.guests} onChange={update}>
            <option value="1">1 Orang</option>
            <option value="2">2 Orang</option>
            <option value="3">3 Orang</option>
            <option value="4">4 Orang</option>
          </select>

          <label htmlFor="rMsg">Ucapan &amp; Doa</label>
          <textarea id="rMsg" name="message" placeholder="Tuliskan ucapan & doa restu Anda..." value={form.message} onChange={update} />

          <button className="btn btn-solid" type="submit" disabled={sending}>
            {sending ? 'Mengirim...' : 'Kirim Konfirmasi'}
          </button>
        </form>
      ) : (
        <div className="rsvp-thanks">
          <p className="serif" style={{ fontSize: 22, color: '#fff' }}>Terima kasih! 🤍</p>
          <p style={{ fontSize: 14, marginTop: 6 }}>Konfirmasi &amp; ucapan Anda telah kami terima.</p>
        </div>
      )}

      {wishes.length > 0 && (
        <div className="wishes">
          <h4>Ucapan &amp; Doa</h4>
          {wishes.map((r, i) => (
            <div className="wish" key={i}>
              <div className="w-name">
                {r.name} · {r.attend}
              </div>
              {r.message}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
