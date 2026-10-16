# GiftCard 🎁

Kartu ucapan berbentuk buku yang bisa dibalik-balik (flipbook) — dibuat dengan React + Vite.

Sampul depan/belakang pakai gambar, halaman tengah siap diisi foto, teks, dan video.

## Cara pakai

```bash
npm install
npm run dev      # buka http://localhost:3000
npm run build    # hasil di dist/
```

## Ganti isi

- **Teks & data**: cukup edit [`src/content.js`](src/content.js) — nama, tanggal, kisah, acara, dll.
- **Sampul**: ganti `public/images/cover-depan.png` dan `cover-belakang.png`.
- **Musik**: taruh file mp3, lalu uncomment baris src di `MusicToggle.jsx`.

## Teknis

- Buku12 halaman, halaman dibuka/tutup via klik tepi, swipe, atau keyboard ← →.
- Detail struktur & konvensi ada di [`AGENTS.md`](AGENTS.md) (dibaca otomatis AI saat buka project ini).

## Reproduksi project baru

1. Clone repos ini: `git clone https://github.com/Shafw00n/GiftCard`
2. Ganti isi `src/content.js` + gambar sampul.
3. Buka di AI coding tool — `AGENTS.md` menjelaskan sisanya otomatis.
