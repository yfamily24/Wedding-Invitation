# CLAUDE.md — Digital Wedding Invitation

Undangan pernikahan digital **Ilham Ramadhan & Devi Ajeng Juwitasari** — Sabtu, 14 November 2026, **Hotel Bumi Bandhawa**, Bandung. Single-page React app, di-deploy ke **Vercel** dari branch `main`.

## Tech stack & perintah
- **React 18 + Vite**. Tanpa backend (situs statis).
- `npm install` lalu `npm run dev` (port **5173**), `npm run build` → `dist/`, `npm run preview`.
- Preview panel Claude Code dikonfigurasi di `.claude/launch.json`.

## Struktur
- `src/config.js` — **SEMUA konten yang bisa diedit** ada di sini (nama, orang tua, tanggal, acara, venue + link Maps, musik, ayat, `rsvp.endpoint` + `rsvp.token`). Edit di sini dulu, bukan di komponen.
- `src/App.jsx` — state utama (buka sampul, musik, tombol back, nama tamu via `?to=`), urutan section.
- `src/components/` — Cover, MusicButton, Intro, Couple, Events, Countdown, Location, Rsvp, Gallery, Closing, Footer, Divider.
- `src/hooks/` — `useCountdown`, `useReveal` (animasi fade-in saat scroll; pakai class `reveal` → `in`).
- `src/index.css` — seluruh styling. Palet warna lewat CSS variables di `:root` (nama var `--green/--green-soft` dipertahankan walau di branch tertentu nilainya bukan hijau).
- `public/assets/` — `song.mp3` (Canon in D Major, Kevin MacLeod, CC BY 4.0), foto, gambar background per-tema.

## Branch (per tema)
- `main` — versi produksi (Vercel). Saat ini berisi tema **bandhawa** (merge PR #2).
- `bandhawa` — tema foto venue hangat (cover gambar venue, foto welcome/groom/bride, galeri 6 foto, RSVP→Sheets). Paling lengkap.
- `pink` — tema motif bunga pink di atas krem.
- `green` — tema sage/emas original.
- `security` — di atas bandhawa, menambah **anti-spam RSVP** (lihat di bawah). **Belum ter-merge ke `main`.**

## Konvensi penting
- **Optimasi gambar wajib.** Foto asli berukuran puluhan MB; selalu kecilkan dulu pakai skrip `scripts/optimize-*.mjs` (library `sharp`, dipasang `npm i sharp --no-save`). Target ~700–1000px lebar, JPEG q80–82. Jangan commit gambar mentah besar.
- **Edit konten lewat `src/config.js`**, bukan hard-code di komponen.

## RSVP → Google Sheets (+ anti-spam)
- Form `Rsvp.jsx` POST via `fetch` `mode:'no-cors'` (`text/plain`) ke Google Apps Script Web App di `config.rsvp.endpoint`, ditambah `token` + honeypot `website`. Data juga disimpan lokal (localStorage) untuk tampilan ucapan per-perangkat.
- Kode Apps Script: `scripts/rsvp-apps-script.gs` (tempel ke Extensions→Apps Script milik spreadsheet, deploy Web App "Anyone"). Berisi: cek token, honeypot, filter konten (link/kata judi → kolom `Flag`=`SPAM?`), kolom `Approved` (moderasi, default FALSE), serta `doGet ?wishes=1` (JSONP) untuk fondasi dinding publik.
- `TOKEN` di `.gs` HARUS sama dengan `config.rsvp.token`.
- Karena `no-cors`, browser tak bisa baca balasan — verifikasi keberhasilan dengan melihat baris di spreadsheet.

## TODO / yang perlu dilanjutkan
1. **Merge `security` → `main`** agar anti-spam masuk ke produksi (Vercel deploy dari `main`). Lewat PR di GitHub.
2. **Hapus baris uji "TES ..."** di spreadsheet (sisa pengujian anti-spam).
3. **Section "amplop digital"** (hadiah/nomor rekening) — diminta user, dikerjakan nanti saat user siap. Rencana: komponen baru antara Gallery dan Closing, isi nama bank + no. rekening + tombol salin, recolor sesuai tema branch aktif.
4. (Opsional) Dinding ucapan publik — baca dari `?wishes=1` (hanya yang `Approved=TRUE`).

## Catatan lingkungan
- Windows. Error `git pull` "revocation status is unknown" pernah muncul di salah satu laptop (schannel TLS) → perbaiki dengan `git config --global http.sslBackend openssl` di mesin itu (per-mesin, tidak ikut repo).
