import { useState } from 'react'

export default function Rsvp() {
  const [form, setForm] = useState({
    name: '',
    attendance: '',
    guests: '1',
    message: '',
  })
  const [done, setDone] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.attendance) return
    console.log('RSVP:', form)
    setDone(true)
    setTimeout(() => setDone(false), 3000)
    setForm({ name: '', attendance: '', guests: '1', message: '' })
  }

  return (
    <section className="rsvp" id="rsvp">
      <div className="wrap">
        <div className="sh reveal">
          <div className="sh__label">Konfirmasi</div>
          <h2 className="sh__title">Mau Datang?</h2>
        </div>

        <form className="rsvp__form reveal" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field__label" htmlFor="rsvp-name">Nama Lengkap</label>
            <input
              className="field__input"
              type="text"
              id="rsvp-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama kamu"
            />
          </div>

          <div className="field">
            <label className="field__label">Konfirmasi Kehadiran</label>
            <div className="att-group">
              {[
                { val: 'hadir', label: 'Hadir', icon: 'check_circle' },
                { val: 'tidak', label: 'Tidak Hadir', icon: 'cancel' },
                { val: 'ragu', label: 'Masih Ragu', icon: 'help' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  className={`att-btn ${form.attendance === opt.val ? 'att-btn--active' : ''}`}
                  onClick={() => setForm({ ...form, attendance: opt.val })}
                >
                  <span className="mi">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {form.attendance === 'hadir' && (
            <div className="field">
              <label className="field__label" htmlFor="rsvp-guests">Jumlah Tamu</label>
              <select
                className="field__select"
                id="rsvp-guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} Orang</option>
                ))}
              </select>
            </div>
          )}

          <div className="field">
            <label className="field__label" htmlFor="rsvp-msg">Pesan (Opsional)</label>
            <textarea
              className="field__textarea"
              id="rsvp-msg"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Pesan kecil untuk kita berdua..."
              rows="3"
            />
          </div>

          <button type="submit" className={`btn btn--primary ${done ? 'btn--done' : ''}`}>
            {done ? (
              <>
                <span className="mi">check</span>
                Terkirim
              </>
            ) : (
              <>
                <span className="mi">send</span>
                Kirim Konfirmasi
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
