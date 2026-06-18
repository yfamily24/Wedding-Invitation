# Undangan Pernikahan — Ilham & Devi (React + Vite)

Undangan digital satu-halaman, dibangun dengan **React** + **Vite**.

## Menjalankan
```bash
npm install      # sekali saja
npm run dev      # mode pengembangan → http://localhost:5173
npm run build    # build produksi → folder dist/
npm run preview  # pratinjau hasil build
```

## Struktur
```
index.html              → entry HTML (memuat font + #root)
src/
  main.jsx              → bootstrap React
  App.jsx               → state utama (buka undangan, musik, nama tamu)
  config.js             → ★ SEMUA DATA undangan diedit di sini
  index.css            → seluruh styling
  hooks/
    useCountdown.js     → hitung mundur
    useReveal.js        → animasi muncul saat scroll
  components/
    Cover, MusicButton, Intro, Couple, Events,
    Countdown, Location, Rsvp, Closing, Footer
public/assets/song.mp3  → musik latar (disalin apa adanya ke build)
standalone/index.html   → versi HTML murni (cadangan, non-React)
```

## Yang perlu diisi
Buka **`src/config.js`** — semua di satu tempat:
1. **Nama orang tua** — ganti `__________` pada `groom` & `bride`.
2. **Jam acara** — ubah `events[].time` (default Akad 09.00, Resepsi 11.00–14.00 WIB).

## Fitur
- **Nama tamu personal**: tambahkan `?to=Nama+Tamu` di akhir URL.
  Contoh: `https://situs-anda.com/?to=Bapak+Andi` → "Bapak Andi" tampil di sampul.
- **Musik**: mulai otomatis saat tombol "Buka Undangan" ditekan (kebijakan browser
  melarang autoplay sebelum interaksi); tombol kontrol bulat di kanan-bawah.
  Lagu: **"Canon in D Major" — Kevin MacLeod**, lisensi **CC BY 4.0** (atribusi ada di footer).
- **Countdown** ke 14 November 2026.
- **RSVP + ucapan**: tersimpan di browser tamu (localStorage). *Tidak ada server*,
  jadi data tidak terkirim ke Anda. Untuk mengumpulkan RSVP sungguhan, sambungkan ke
  Google Forms / Google Sheets / Supabase — bisa dibantu.

## Hosting
Jalankan `npm run build`, lalu unggah isi folder `dist/` ke **Netlify Drop**,
**Vercel**, atau **GitHub Pages**. `base: './'` sudah diatur agar jalan di subfolder mana pun.
