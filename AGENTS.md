# Kartu Ucapan Flipbook — Abelya

Buku flipbook 12 halaman (React 18 + Vite + `react-pageflip`). Sampul depan/belakang = gambar PNG; 10 halaman isi = puisi + foto/GIF. Backdrop coklat senada kolase sampul.

## Struktur

```
index.html              title/description manual (bukan dari content.js)
public/images/          cover-depan.png, cover-belakang.png, foto-*.jpeg|jpg, *.gif
public/music/           anniversary-song.mp3
src/content.js          SEMUA konten puisi (poemPages). Export lain (meta, cover, opening, couple,
                        countdown, events, story, gallery, rsvp, wishes, hopes, closing, backCover)
                        TIDAK dirender — jangan dihapus, bisa dipakai kembali
src/App.jsx             render Flipbook + MusicToggle saja
src/components/
  Flipbook.jsx          engine buku + SEMUA CSS halaman isi (style string `css`)
  MusicToggle.jsx       tombol musik kanan bawah (mp3 aktif, volume 0.3, loop)
  Couple/Countdown/EventDetails/LoveStory/Gallery/Rsvp/Wishes/Gift.jsx
                        komponen lama — tidak dirender, jangan dihapus
src/index.css           variabel warna/font + gaya komponen lama
```

## Konvensi buku (jangan diubah tanpa alasan)

- `TOTAL = poemPages.length + 2`. Index 0 = sampul depan, index terakhir = sampul belakang, tengah = `poemPages` berurutan.
- Class halaman: `fb-page`, sampul `fb-page--cover` (padding 0 + `fb-page__cover-image`). Jangan pakai `fb-page--dark` (dihapus).
- `.fb-page.stf__item { position: absolute }` — WAJIB; lib menulis inline `cssText` tanpa position saat flip (kalau hilang, halaman lompat).
- Shading tulang buku pakai selector `[class~="--left"]` / `[class~="--right"]`.
- Navigasi: klik tepi halaman, swipe, keyboard ←/→. Tanpa kontrol bar.
- `calcSize()` tanpa ruang bar bawah — kalau tambah elemen fixed, sesuaikan `reserve`.

## Dekorasi halaman isi (semua di CSS string `Flipbook.jsx`)

- Di-scope `.fb-page:not(.fb-page--cover)` — sampul TIDAK boleh kena dekorasi.
- `::before` = bingkai emas + aksen sudut. `::after` = folio nomor halaman (`attr(page-number)`).
- Washi tape = pseudo-element `.poem-page__media` (rose/sage/gold, berselang halaman ganjil/genap).
- Grain kertas + vignette = background berlapis di halaman isi.
- Ukuran mobile di `@media (max-width: 768px), (max-height: 560px)`: judul 1.2rem, puisi 0.9rem, foto `height: 44%` + `max-width: 84%`.

## Ganti konten (untuk duplikat / kartu baru)

1. Teks/puisi → `src/content.js` blok `poemPages`. Tiap entri: `title`, `lines` (array; 1 baris = 1 span), `media` (`type: 'photo'` atau `'video'`, `src`, `alt`, `aspectRatio`), opsional `mediaPosition: 'top'`.
2. Foto → taruh di `public/images/`, tulis `src` (`/images/nama.ext`). `aspectRatio` HARUS sesuai rasio file asli (mis. `9 / 16`, `3 / 4`, `1 / 1`) — kalau tidak, bingkai tidak pas.
3. GIF → sama seperti foto; animasi jalan otomatis di `<img>`. Nama file dengan spasi: encode `%20` di `src`.
4. Sampul → ganti `public/images/cover-depan.png` / `cover-belakang.png` (nama sama).
5. Musik → ganti file `public/music/anniversary-song.mp3`.
6. Judul tab + preview link (Telegram/WA) → `index.html` (`<title>`, `<meta name="description">`).
7. Nama package → `package.json` (`name`).

## Perintah & deploy

- Dev: `npm run dev` → http://localhost:3000 (auto-open browser)
- Build: `npm run build` → hasil di `dist/`
- Deploy: Vercel → Add New → Project → import repo GitHub → preset **Vite** default (build `npm run build`, output `dist`). Push ke `main` = auto-redeploy.
- Contoh live: github.com/Shafw00n/GiftCard → abelyachan.vercel.app
- Kalau perubahan tidak muncul di browser saat dev: restart dev server (file watcher di drive ini kadang telat), lalu hard refresh.
- Diketahui: favicon `index.html` menunjuk `/vite.svg` yang tidak ada (404, tidak fatal).
