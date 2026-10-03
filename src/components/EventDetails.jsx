import { events } from '../content'

export default function EventDetails() {
  return (
    <section className="events" id="events">
      <div className="wrap">
        <div className="sh reveal">
          <div className="sh__label">{events.label}</div>
          <h2 className="sh__title">{events.title}</h2>
        </div>

        <div className="events__grid reveal">
          {events.items.map((event, i) => (
            <div className="events__card" key={i}>
              <div className="events__icon">
                <span className="mi">{event.icon}</span>
              </div>
              <h3 className="events__name">{event.title}</h3>
              {event.details.map((d, j) => (
                <div className="events__detail" key={j}>
                  <span className="mi">{d.icon}</span>
                  <span>{d.text}</span>
                </div>
              ))}
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="events__map-link"
              >
                <span className="mi">near_me</span>
                Buka Peta
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
