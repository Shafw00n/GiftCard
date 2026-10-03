import { useState, useEffect } from 'react'
import { countdown } from '../content'

export default function Countdown() {
  const startDate = new Date(countdown.since)

  const calculate = () => {
    const diff = Math.max(0, Date.now() - startDate.getTime())
    return {
      Hari: Math.floor(diff / 86400000),
      Jam: Math.floor((diff / 3600000) % 24),
      Menit: Math.floor((diff / 60000) % 60),
      Detik: Math.floor((diff / 1000) % 60),
    }
  }

  const [time, setTime] = useState(calculate)

  useEffect(() => {
    const id = setInterval(() => setTime(calculate()), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section className="countdown" id="countdown">
      <div className="wrap">
        <div className="sh reveal" style={{ textAlign: 'center' }}>
          <div className="sh__label" style={{ justifyContent: 'center' }}>
            <span className="mi" style={{ fontSize: 16 }}>{countdown.icon}</span>
            {countdown.label}
          </div>
          <h2 className="sh__title">{countdown.title}</h2>
        </div>

        <div className="countdown__grid reveal">
          {Object.entries(time).map(([label, val]) => (
            <div className="countdown__item" key={label}>
              <div className="countdown__num">{pad(val)}</div>
              <div className="countdown__label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
