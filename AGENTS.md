# GiftCard — Kartu Ucapan Flipbook

Buku flipbook12 halaman (React18 + Vite + `react-pageflip`). Sampul = gambar PNG, halaman tengah sengaja KOSONG (photo-ready) — isi nanti: foto → teks → video.

## Struktur

```
index.html              title/description manual (bukan dari content.js)
public/images/          cover-depan.png, cover-belakang.png (sampul halaman0 &11)
src/content.js          SEMUA teks/data — ganti konten cukup di sini
src/App.jsx             render Flipbook + MusicToggle saja
src/components/
  Flipbook.jsx          engine buku + CSS embedded (style string `css`)
  Couple.jsx            sudah import content.js
  Countdown.jsx         sudah import content.js
  EventDetails.jsx      sudah import content.js
  LoveStory.jsx         sudah import content.js
  Gallery.jsx           sudah import content.js
  Rsvp.jsx, Wishes.jsx, Gift.jsx   BELUM wire ke content.js (gaya lama, belum dirender)
  MusicToggle.jsx       tombol musik (mp3 dimatikan, isi manual)
src/index.css           gaya halaman-manual (couple, events, gift, wishes...)
```

## Konvensi buku

- `TOTAL =12` di Flipbook.jsx. `pages` = `Array.from({length: TOTAL})` → index0 = sampul depan (img `cover-depan.png`), index11 = sampul belakang (img `cover-belakang.png`), index1-10 = halaman isi KOSONG.
- Class halaman: `fb-page`, sampul `fb-page--cover` (padding0 + `fb-page__cover-image`). Jangan pakai `fb-page--dark` (dihapus).
- Shading tulang buku pakai selector `[class~="--left"]` / `[class~="--right"]` dari lib.
- `.fb-page.stf__item { position: absolute }` — WAJIB, lib nulis inline `cssText` tanpa position saat flip (kalau hilang, halaman lompat).
- CSS `.fb-page .couple__*`, `.fb-page .events__*`, dst = kompatibilitas kalau section lama dimasukkan balik ke halaman — jangan dihapus.
- Navigasi: klik tepi halaman, swipe, keyboard ←/→. Tidak ada kontrol bar (sengaja dihapus).
- `calcSize()` sudah disetel tanpa ruang bar bawah — kalau tambah elemen fixed, sesuaikan `reserve`/`vh-56`.

## Ganti konten

1. Teks/data → edit `src/content.js` saja.
2. Sampul → ganti `public/images/cover-depan.png` / `cover-belakang.png` (nama sama, ukuran bebas, `object-fit: cover`).
3. Tambah halaman → ubah `TOTAL` + sisipkan isi di blok `pages` (index ditentukan `showCover` + `usePortrait`).
4. Musik → taruh mp3, uncomment baris di `MusicToggle.jsx`.

## Perintah

- Dev: `npm run dev` → http://localhost:3000
- Build: `npm run build`
- Repo: `https://github.com/Shafw00n/GiftCard` (remote `origin`, branch `main`)
