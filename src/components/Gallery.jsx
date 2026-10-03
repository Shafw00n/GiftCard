import { gallery } from '../content'

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="wrap">
        <div className="sh reveal">
          <div className="sh__label">{gallery.label}</div>
          <h2 className="sh__title">{gallery.title}</h2>
        </div>

        <div className="gallery__grid reveal">
          {gallery.icons.map((icon, i) => (
            <div className="gallery__item" key={i}>
              <span className="mi">{icon}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
