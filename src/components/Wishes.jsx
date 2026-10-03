import { useState } from 'react'

export default function Wishes() {
  const [wishes, setWishes] = useState([
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
  ])

  const [form, setForm] = useState({ name: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    setWishes([
      { id: Date.now(), name: form.name, message: form.message, time: 'Baru saja' },
      ...wishes,
    ])
    setForm({ name: '', message: '' })
  }

  const initials = (name) =>
    name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <section className="wishes" id="wishes">
      <div className="wrap">
        <div className="sh reveal">
          <div className="sh__label">Ucapan</div>
          <h2 className="sh__title">Kirim Selamat</h2>
        </div>

        <form className="wishes__form reveal" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field__label" htmlFor="w-name">Nama</label>
            <input
              className="field__input"
              type="text"
              id="w-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama kamu"
            />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="w-msg">Ucapan & Doa</label>
            <textarea
              className="field__textarea"
              id="w-msg"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tulis ucapan selamat untuk kita berdua..."
              rows="4"
            />
          </div>
          <button type="submit" className="btn btn--primary">
            <span className="mi">send</span>
            Kirim Ucapan
          </button>
        </form>

        <div className="wishes__list reveal">
          {wishes.map((w) => (
            <div className="wish" key={w.id}>
              <div className="wish__head">
                <div className="wish__avatar">{initials(w.name)}</div>
                <span className="wish__name">{w.name}</span>
                <span className="wish__time">{w.time}</span>
              </div>
              <div className="wish__msg">{w.message}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
