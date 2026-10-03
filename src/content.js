/* ============================================================
   SEMUA KONTEN BUKU ADA DI FILE INI.
   Ganti teks/data di sini saja — komponen tidak perlu disentuh.
   ============================================================ */

export const meta = {
  title: 'Happy 1st Anniversary - Ahmad & Sarah',
  description: 'Kartu Ucapan Anniversary 1 Tahun - Ahmad & Sarah',
}

export const cover = {
  label: 'Happy 1st Anniversary',
  names: ['Ahmad Rizky', 'Sarah Amelia'],
  date: '20 . 12 . 2025 — 20 . 12 . 2026',
  button: 'Buka Ucapan',
}

export const opening = {
  salam: 'Untukmu, orang terkasihku',
  heading: 'Happy Anniversary!',
  intro:
    'Lewat buku kecil ini, kucerita kembali satu tahun perjalanan kita — tawa, sabar, pertengkaran kecil, dan semua hal yang membuat kita jatuh cinta lagi, lagi, dan lagi.',
  names: 'Ahmad & Sarah',
  quote:
    '"Cinta bukan tentang menemukan orang yang sempurna, tapi tentang melihat orang yang tidak sempurna dengan sempurna — dan memilihnya, setiap hari, selama satu tahun ini."',
}

export const couple = {
  label: 'Pasangan',
  title: 'Kita Berdua',
  persons: [
    {
      name: 'Ahmad Rizky',
      fullname: 'Ahmad Rizky Pratama, S.T.',
      lines: ['Suami —', 'orang yang selalu mengajariku', 'sabar, pelan-pelan, setiap hari'],
    },
    {
      name: 'Sarah Amelia',
      fullname: 'Sarah Amelia Putri, S.Psi.',
      lines: ['Istri —', 'orang yang selalu membuatku', 'tersenyum bahkan di hari terberat'],
    },
  ],
}

export const countdown = {
  label: 'Waktu Kita',
  icon: 'schedule',
  title: 'Sudah Sejauh Ini',
  since: '2025-12-20T19:00:00+07:00',
}

export const events = {
  label: 'Perayaan',
  title: 'Rencana Kita',
  items: [
    {
      title: 'Makan Malam Spesial',
      icon: 'restaurant',
      details: [
        { icon: 'calendar_month', text: 'Sabtu, 20 Desember 2026' },
        { icon: 'schedule', text: '19:00 WIB' },
        { icon: 'location_on', text: 'Restoran favorit kita' },
        { icon: 'map', text: 'Jl. Kemang Raya, Jakarta Selatan' },
      ],
      mapUrl: 'https://maps.google.com',
    },
    {
      title: 'Trip Singkat Berdua',
      icon: 'luggage',
      details: [
        { icon: 'calendar_month', text: 'Minggu, 21 Desember 2026' },
        { icon: 'schedule', text: 'Sepanjang hari' },
        { icon: 'location_on', text: 'Puncak, Bogor' },
        { icon: 'map', text: 'Kabupaten Bogor, Jawa Barat' },
      ],
      mapUrl: 'https://maps.google.com',
    },
  ],
}

export const story = {
  label: 'Kisah Kita',
  title: 'Perjalanan Setahun',
  items: [
    {
      date: 'Desember 2025',
      title: 'Satu Janji',
      desc: 'Kita memulai babak baru: satu rumah, satu meja makan, dan satu janji untuk selalu pulang ke orang yang sama.',
    },
    {
      date: 'Februari 2026',
      title: 'Pagi Pertama',
      desc: 'Kita menemukan ritme kecil — kopi pagi, lagu yang sama di radio, dan percakapan basa-basi yang tak pernah membosankan.',
    },
    {
      date: 'Mei 2026',
      title: 'Perjalanan Pertama',
      desc: 'Tersesat di jalan yang salah, baterai habis, makan mi instan di penginapan murah — dan justru itu jadi kenangan favorit kita.',
    },
    {
      date: 'Agustus 2026',
      title: 'Badai Kecil',
      desc: 'Pertengkaran pertama yang bikin kaku seharian. Sampai akhirnya kita belajar: menang dalam pertengkaran bukan kemenangan.',
    },
    {
      date: 'Desember 2026',
      title: 'Satu Tahun',
      desc: '365 hari, ratusan pagi, satu cerita yang masih terus berlanjut. Dan ini baru volume pertama.',
    },
  ],
}

export const gallery = {
  label: 'Momen',
  title: 'Kenangan Setahun',
  icons: ['photo_camera', 'favorite', 'landscape', 'celebration', 'photo_library'],
}

export const rsvp = {
  label: 'Konfirmasi',
  title: 'Mau Datang?',
  namePlaceholder: 'Nama kamu',
  messagePlaceholder: 'Pesan kecil untuk kita berdua...',
}

export const wishes = {
  label: 'Ucapan',
  title: 'Kirim Selamat',
  namePlaceholder: 'Nama kamu',
  messagePlaceholder: 'Tulis ucapan selamat untuk kita berdua...',
  submit: 'Kirim Ucapan',
  seed: [
    {
      id: 1,
      name: 'Budi Santoso',
      message: 'Selamat satu tahun! Semoga tahun keduanya lebih seru, lebih sabar, dan lebih banyak makan bareng. Aamiin.',
      time: '2 jam lalu',
    },
    {
      id: 2,
      name: 'Rina Kartika',
      message: 'Happy anniversary kalian berdua! Lihat kalian bertumbuh bareng itu bikin ikut senyum. Langgeng selamanya!',
      time: '3 jam lalu',
    },
    {
      id: 3,
      name: 'Dimas Arya',
      message: '365 hari lewat cepat. Cheers to hundreds more, bro! Jangan lupa traktirannya.',
      time: '5 jam lalu',
    },
  ],
}

export const hopes = {
  label: 'Ke Depan',
  icon: 'star',
  title: 'Harapan Tahun Berikutnya',
  note: 'Satu tahun sudah lewat. Untuk tahun berikutnya, ini tiga hal yang ingin kita bawa bersama:',
  items: [
    {
      no: '01',
      icon: 'public',
      title: 'Liburan Jauh',
      text: 'Mimpi kecil yang tahun depan harusnya sudah jadi tiket pesawat beneran.',
    },
    {
      no: '02',
      icon: 'home',
      title: 'Rumah Kita',
      text: 'Satu sudut kecil yang bisa kita sebut milik sendiri, dengan halaman yang cukup untuk kucing.',
    },
    {
      no: '03',
      icon: 'favorite',
      title: 'Lebih Saling Sabar',
      text: 'Tahun kedua dengan versi diri yang lebih dewasa — dan lebih sering bilang maaf lebih dulu.',
    },
  ],
}

export const closing = {
  names: 'Ahmad & Sarah',
  msg: 'Terima kasih sudah bertahan, tumbuh, dan mencintaiku selama 365 hari ini. Mari kita lanjutkan cerita ini — seribu tahun lagi, dan setelahnya.',
  date: '365 HARI BERSAMA',
}

export const backCover = {
  names: 'Ahmad & Sarah',
  date: '1st Anniversary — 20 . 12 . 2026',
}
