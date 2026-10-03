export default function Gift() {
  const hopes = [
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
  ]

  return (
    <section className="gift" id="gift">
      <div className="wrap">
        <div className="sh reveal" style={{ textAlign: 'center' }}>
          <div className="sh__label" style={{ justifyContent: 'center' }}>
            <span className="mi" style={{ fontSize: 16 }}>star</span>
            Ke Depan
          </div>
          <h2 className="sh__title">Harapan Tahun Berikutnya</h2>
        </div>

        <p className="gift__note reveal">
          Satu tahun sudah lewat. Untuk tahun berikutnya, ini tiga hal
          yang ingin kita bawa bersama:
        </p>

        <div className="gift__cards reveal">
          {hopes.map((h) => (
            <div className="gift__card" key={h.no}>
              <div className="gift__card-icon">
                <span className="mi">{h.icon}</span>
              </div>
              <div className="gift__bank">{h.title}</div>
              <div className="gift__number">{h.no}</div>
              <div className="gift__holder">{h.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
