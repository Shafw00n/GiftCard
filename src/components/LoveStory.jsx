import { story } from '../content'

export default function LoveStory() {
  return (
    <section className="timeline" id="love-story">
      <div className="wrap">
        <div className="sh reveal">
          <div className="sh__label">{story.label}</div>
          <h2 className="sh__title">{story.title}</h2>
        </div>

        <div className="timeline__list">
          {story.items.map((s, i) => (
            <div className="timeline__item reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="timeline__dot" />
              <div className="timeline__date">{s.date}</div>
              <h3 className="timeline__title">{s.title}</h3>
              <p className="timeline__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
