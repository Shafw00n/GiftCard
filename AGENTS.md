# Kartu Ucapan Flipbook — Panduan Kerja

Template buku kartu ucapan 12 halaman (React 18 + Vite + `react-pageflip`). Sampul depan/belakang = gambar PNG; 10 halaman isi = puisi + foto/GIF. Backdrop coklat senada kolase sampul. Baca dokumen ini sampai habis sebelum mengedit — semua konvensi yang membuat tampilan stabil ada di sini.

## Struktur

```
index.html              title/description manual + Google Fonts (Playfair, Cormorant, Lora,
                        Great Vibes, Material Symbols) — jangan pindah ke content.js
public/images/          cover-depan.png, cover-belakang.png, foto-*.jpeg|jpg, *.gif
public/music/           lagu.mp3
src/content.js          SEMUA konten puisi (poemPages). Export lain (meta, cover, opening, couple,
                        countdown, events, story, gallery, rsvp, wishes, hopes, closing, backCover)
                        TIDAK dirender — jangan dihapus, bisa dipakai kembali
src/App.jsx             render Flipbook + MusicToggle saja
src/components/
  Flipbook.jsx          engine buku + SEMUA CSS halaman isi (style string `css`)
  MusicToggle.jsx       tombol musik kanan bawah (mp3 aktif, volume 0.3, loop)
  Couple/Countdown/EventDetails/LoveStory/Gallery/Rsvp/Wishes/Gift.jsx
                        komponen lama — tidak dirender, jangan dihapus
src/index.css           variabel warna/font (--ink, --rose, --gold, --ff-*, dll) + gaya komponen lama
```

## Konvensi buku (jangan diubah tanpa alasan)

- `TOTAL = poemPages.length + 2`. Index 0 = sampul depan, index terakhir = sampul belakang, tengah = `poemPages` berurutan. Tambah/hapus entri `poemPages` → TOTAL, navigasi, dan folio otomatis ikut.
- Class halaman: `fb-page`, sampul `fb-page--cover` (padding 0 + `fb-page__cover-image`, `object-fit: cover`). Jangan pakai `fb-page--dark` (dihapus).
- `.fb-page.stf__item { position: absolute }` — WAJIB; lib menulis inline `cssText` tanpa position saat flip (kalau hilang, halaman lompat).
- Shading tulang buku pakai selector `[class~="--left"]` / `[class~="--right"]`.
- Navigasi: klik tepi halaman, swipe, keyboard ←/→. Tanpa kontrol bar.
- `calcSize()` tanpa ruang bar bawah — kalau tambah elemen fixed, sesuaikan `reserve`.
- `HTMLFlipBook` disetel: `showCover`, `size="fixed"`, `flippingTime={700}`, `maxShadowOpacity={0.35}`, `swipeDistance={30}`, portrait 1 halaman kalau lebar < 768px.

## Isi halaman isi (poemPages)

- Tiap entri `poemPages` → 1 halaman: judul + baris puisi (1 `lines` = 1 `<span>`) + 1 media.
- `mediaPosition: 'top'` → media di atas teks; default media di bawah.
- `media` tanpa `src` → placeholder otomatis (foto = kotak pastel; video = kotak gelap + tombol play). Isi `src` begitu file tersedia — begitu juga GIF (jalan otomatis di `<img>`).
- Folio nomor halaman otomatis dari `attr(page-number)` = index+1 (sampul = 1, halaman isi mulai 2).
- Washi tape warna berselang halaman ganjil/genap otomatis — tidak perlu diatur manual.

## Dekorasi halaman isi (semua di CSS string `Flipbook.jsx`)

- Di-scope `.fb-page:not(.fb-page--cover)` — sampul TIDAK boleh kena dekorasi.
- `::before` = bingkai emas (inset 12px; 8px di mobile) + aksen sudut. `::after` = folio nomor halaman.
- Washi tape = pseudo-element `.poem-page__media` (rose/sage/gold, berselang halaman ganjil/genap).
- Grain kertas + vignette = background berlapis di halaman isi.
- Ukuran mobile di `@media (max-width: 768px), (max-height: 560px)`: judul 1.2rem, puisi 0.9rem, foto `height: 44%` + `max-width: 84%`.

## Ganti konten (untuk duplikat / kartu baru)

1. Teks/puisi → `src/content.js` blok `poemPages`. Tiap entri: `title`, `lines` (array), `media` (`type: 'photo'` atau `'video'`, `src`, `alt`, `aspectRatio`), opsional `mediaPosition: 'top'`.
2. Foto → taruh di `public/images/`, tulis `src` (`/images/nama.ext`). `aspectRatio` HARUS sesuai rasio file asli (mis. `9 / 16`, `3 / 4`, `1 / 1`) — kalau tidak, bingkai tidak pas. Cek resolusi dulu:
   ```powershell
   Add-Type -AssemblyName System.Drawing
   $i=[System.Drawing.Image]::FromFile("public\images\nama.jpeg"); "$($i.Width)x$($i.Height)"; $i.Dispose()
   ```
   (720x1280 → `9 / 16`, 960x1280 → `3 / 4`, 1080x1080 → `1 / 1`)
3. GIF → sama seperti foto. Nama file dengan spasi: encode `%20` di `src`.
4. Sampul → ganti `public/images/cover-depan.png` / `cover-belakang.png` (nama sama).
5. Musik → ganti file `public/music/lagu.mp3`.
6. Judul tab + preview link (Telegram/WA) → `index.html` (`<title>`, `<meta name="description">`).
7. Nama package → `package.json` + `package-lock.json` (`name`).

## Perintah, verifikasi, deploy

- Dev: `npm run dev` → http://localhost:3000 (auto-open browser)
- Build: `npm run build` → hasil di `dist/`. Wajib hijau sebelum commit.
- Cek dev server menyajikan versi terbaru: `Invoke-WebRequest http://localhost:3000/src/content.js -UseBasicParsing` lalu cari string yang baru diedit. Kalau tidak ada → restart dev server (file watcher di drive ini kadang telat) + hard refresh browser.
- Commit: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`). Push ke `main` → Vercel auto-redeploy (~1 menit).
- Deploy: Vercel → Add New → Project → import repo GitHub → preset **Vite** default (build `npm run build`, output `dist`).
- Diketahui: favicon `index.html` menunjuk `/vite.svg` yang tidak ada (404, tidak fatal).
