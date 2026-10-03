import { couple } from '../content'

export default function Couple() {
  const [a, b] = couple.persons

  return (
    <section className="couple" id="couple">
      <div className="wrap">
        <div className="sh reveal">
          <div className="sh__label">{couple.label}</div>
          <h2 className="sh__title">{couple.title}</h2>
        </div>

        <div className="couple__row reveal">
          <div className="couple__person">
            <div className="couple__photo">
              <span className="mi">person</span>
            </div>
            <div className="couple__name">{a.name}</div>
            <div className="couple__fullname">{a.fullname}</div>
            <div className="couple__parents">
              {a.lines.map((l, i) => (
                <span key={i}>{l}{i < a.lines.length - 1 && <br />}</span>
              ))}
            </div>
          </div>

          <div className="couple__mid">
            <div className="couple__mid-line" />
            <span className="mi filled">favorite</span>
            <div className="couple__mid-line" />
          </div>

          <div className="couple__person">
            <div className="couple__photo">
              <span className="mi">person</span>
            </div>
            <div className="couple__name">{b.name}</div>
            <div className="couple__fullname">{b.fullname}</div>
            <div className="couple__parents">
              {b.lines.map((l, i) => (
                <span key={i}>{l}{i < b.lines.length - 1 && <br />}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
