import { useState, useEffect } from 'react'
import { config } from '../config'
import Divider from './Divider'

const ENDPOINT = config.rsvp?.endpoint || ''
const TOKEN = config.rsvp?.token || ''

export default function Rsvp() {
  // Ucapan yang tampil dibaca dari spreadsheet (hanya baris Approved = TRUE).
  const [entries, setEntries] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  // "subjek" = honeypot tersembunyi; tamu asli tak mengisinya, bot mengisinya.
  // Nama netral (bukan "website"/"url"/"email") agar tak dikenali autofill browser.
  const [form, setForm] = useState({ name: '', attend: '', guests: '1', message: '', subjek: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Ambil ucapan yang sudah di-approve via JSONP. Apps Script tak mengirim
  // header CORS, jadi dibaca lewat <script> ?wishes=1&callback=... .
  useEffect(() => {
    if (!ENDPOINT) return
    const cb = `wishesCb_${Date.now()}`
    const script = document.createElement('script')
    const cleanup = () => {
      delete window[cb]
      script.remove()
    }
    window[cb] = (data) => {
      if (data && Array.isArray(data.wishes)) setEntries(data.wishes)
      cleanup()
    }
    script.onerror = cleanup
    script.src = `${ENDPOINT}?wishes=1&callback=${cb}`
    document.body.appendChild(script)
    return cleanup
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const entry = {
      name: form.name,
      attend: form.attend,
      guests: form.guests,
      message: form.message,
      at: new Date().toISOString(),
    }

    // Kirim ke Google Sheets lewat Apps Script (jika endpoint sudah diisi).
    // mode:'no-cors' + text/plain menghindari preflight CORS Apps Script.
    // token = anti-spam; subjek = honeypot (dikosongkan tamu asli).
    if (ENDPOINT) {
      try {
        await fetch(ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ ...entry, token: TOKEN, subjek: form.subjek }),
        })
      } catch {
        // Diabaikan: karena no-cors, kegagalan jaringan tak bisa dibaca di sini.
      }
    }

    setSending(false)
    setSubmitted(true)
  }

  const wishes = entries.filter((r) => r.message).reverse()

  // Paging dinding ucapan: 5 ucapan per halaman.
  const PER_PAGE = 5
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(wishes.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pageWishes = wishes.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

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
          {/* Honeypot: tersembunyi dari manusia; jika terisi -> ditolak server */}
          <input
            type="text"
            name="subjek"
            className="hp-field"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.subjek}
            onChange={update}
          />

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
          {pageWishes.map((r, i) => (
            <div className="wish" key={(currentPage - 1) * PER_PAGE + i}>
              <div className="w-name">
                {r.name}
              </div>
              {r.message}
            </div>
          ))}

          {totalPages > 1 && (
            <div className="wishes-pager">
              <button
                type="button"
                className="pager-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                aria-label="Halaman sebelumnya"
              >
                ‹
              </button>
              <span className="pager-info">
                Halaman {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                className="pager-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                aria-label="Halaman berikutnya"
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
