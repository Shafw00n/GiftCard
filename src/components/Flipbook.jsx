import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import HTMLFlipBook from 'react-pageflip'
import 'page-flip/src/Style/stPageFlip.css'
import { poemPages } from '../content.js'

const TOTAL = poemPages.length + 2

const css = `
.fb-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  background:
    radial-gradient(1000px 700px at 15% 4%, rgba(240,229,206,.22), transparent 58%),
    radial-gradient(900px 760px at 90% 92%, rgba(176,95,58,.30), transparent 62%),
    radial-gradient(700px 520px at 82% 10%, rgba(214,183,143,.16), transparent 64%),
    linear-gradient(160deg, #7B573C 0%, #6B4832 48%, #573927 100%);
}
.fb-root input,
.fb-root textarea,
.fb-root select {
  -webkit-user-select: text;
  user-select: text;
}
.fb-stage {
  position: relative;
  z-index: 2;
}
.fb-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #FFFDF9 0%, #FBF6EF 55%, #F7F0E7 100%);
  box-shadow:
    inset 0 0 0 1px rgba(180,157,126,.22),
    0 22px 48px rgba(45,42,38,.24),
    0 4px 10px rgba(45,42,38,.12);
  padding: 36px 32px;
  font-size: 14px;
  line-height: 1.6;
  position: relative;
}
.fb-page.fb-page--cover {
  padding: 0;
}
.fb-page__cover-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* --- decoration: halaman isi saja (cover tidak disentuh) --- */
.fb-page:not(.fb-page--cover) {
  background:
    radial-gradient(120% 85% at 50% -8%, rgba(255,252,246,.95), rgba(255,252,246,0) 60%),
    repeating-linear-gradient(0deg, rgba(180,157,126,.028) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(90deg, rgba(180,157,126,.020) 0 1px, transparent 1px 4px),
    radial-gradient(135% 105% at 50% 50%, rgba(255,253,249,0) 62%, rgba(120,98,78,.07) 100%),
    linear-gradient(135deg, #FFFDF9 0%, #FBF6EF 55%, #F7F0E7 100%);
}
.fb-page:not(.fb-page--cover)::before {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(180,157,126,.42);
  pointer-events: none;
  background:
    linear-gradient(rgba(180,157,126,.78), rgba(180,157,126,.78)) left -1px top -1px / 20px 2px no-repeat,
    linear-gradient(rgba(180,157,126,.78), rgba(180,157,126,.78)) left -1px top -1px / 2px 20px no-repeat,
    linear-gradient(rgba(180,157,126,.78), rgba(180,157,126,.78)) right -1px top -1px / 20px 2px no-repeat,
    linear-gradient(rgba(180,157,126,.78), rgba(180,157,126,.78)) right -1px top -1px / 2px 20px no-repeat,
    linear-gradient(rgba(180,157,126,.78), rgba(180,157,126,.78)) left -1px bottom -1px / 20px 2px no-repeat,
    linear-gradient(rgba(180,157,126,.78), rgba(180,157,126,.78)) left -1px bottom -1px / 2px 20px no-repeat,
    linear-gradient(rgba(180,157,126,.78), rgba(180,157,126,.78)) right -1px bottom -1px / 20px 2px no-repeat,
    linear-gradient(rgba(180,157,126,.78), rgba(180,157,126,.78)) right -1px bottom -1px / 2px 20px no-repeat;
}
.fb-page:not(.fb-page--cover)::after {
  content: '— ' attr(page-number) ' —';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 19px;
  pointer-events: none;
  text-align: center;
  font-family: var(--ff-ui);
  font-size: 9px;
  letter-spacing: 3px;
  color: rgba(180,157,126,.85);
}
.poem-page {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 22px;
  text-align: left;
}
.poem-page__copy {
  width: 100%;
  margin: 0;
}
.poem-page__title {
  margin: 0 0 24px;
  color: var(--ink);
  font-family: var(--ff-display);
  font-size: 1.5rem;
  font-weight: 500;
}
.poem-page__title::after {
  content: '';
  display: block;
  width: 7px;
  height: 7px;
  margin-top: 14px;
  transform: rotate(45deg);
  background: linear-gradient(135deg, var(--rose), var(--gold));
  opacity: .85;
}
.poem-page__verse {
  color: var(--ink-light);
  font-family: var(--ff-body);
  font-size: 1.05rem;
  line-height: 1.9;
}
.poem-page__verse span {
  display: block;
}
.poem-page__verse span:first-child {
  color: var(--ink);
  font-style: italic;
}
.poem-page__media {
  width: 100%;
  max-width: 420px;
  aspect-ratio: 4 / 3;
  flex: 0 1 auto;
  position: relative;
  overflow: visible;
  margin: 0;
  padding: 6px;
  border: 1px solid rgba(180,157,126,.45);
  background: rgba(255,255,255,.84);
  box-shadow: 0 8px 22px rgba(45,42,38,.12);
}
.poem-page__media--video {
  aspect-ratio: 16 / 9;
}
.poem-page__media--photo {
  width: auto;
  height: 46%;
  max-width: 100%;
}
.fb-page:nth-child(even) .poem-page__media--photo {
  align-self: flex-end;
}
/* washi-tape accents */
.poem-page__media::before,
.poem-page__media::after {
  content: '';
  position: absolute;
  width: 64px;
  height: 18px;
  pointer-events: none;
  box-shadow: 0 1px 3px rgba(45,42,38,.15);
}
.poem-page__media::before {
  top: -9px;
  left: 9%;
  transform: rotate(-5deg);
  background: linear-gradient(100deg, rgba(184,135,122,.44), rgba(184,135,122,.26));
}
.poem-page__media::after {
  bottom: -9px;
  right: 10%;
  transform: rotate(4deg);
  background: linear-gradient(100deg, rgba(125,142,123,.40), rgba(125,142,123,.24));
}
.fb-page:nth-child(odd) .poem-page__media::before {
  background: linear-gradient(100deg, rgba(180,157,126,.46), rgba(180,157,126,.28));
}
.poem-page__media img,
.poem-page__photo-placeholder,
.poem-page__video-placeholder {
  display: block;
  width: 100%;
  height: 100%;
}
.poem-page__media img {
  object-fit: contain;
  background: #F4EEE7;
}
.poem-page__photo-placeholder {
  background: linear-gradient(145deg, rgba(184,135,122,.10), rgba(125,142,123,.10));
}
.poem-page__video-placeholder {
  display: grid;
  place-items: center;
  color: #F7F0E7;
  background: linear-gradient(145deg, #40362D, #241E18);
}
.poem-page__play {
  display: grid;
  width: 48px;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgba(201,171,126,.72);
  border-radius: 50%;
  color: #C9AB7E;
}
.poem-page__play .mi {
  font-size: 28px;
}
.poem-page--media-first .poem-page__media {
  order: -1;
}
/* lib rewrites inline cssText w/o position during flip — class must win */
.fb-page.stf__item {
  position: absolute;
}
/* book realism: spine shading follows binding side + paper edge stack */
.fb-page[class~="--right"] {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow:
    inset 0 0 0 1px rgba(180,157,126,.22),
    inset 18px 0 24px -16px rgba(45,42,38,.45),
    0 22px 48px rgba(45,42,38,.24),
    0 4px 10px rgba(45,42,38,.12);
}
.fb-page[class~="--left"] {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  box-shadow:
    inset 0 0 0 1px rgba(180,157,126,.22),
    inset -18px 0 24px -16px rgba(45,42,38,.45),
    0 22px 48px rgba(45,42,38,.24),
    0 4px 10px rgba(45,42,38,.12);
}
.fb-page section {
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
}
.fb-page .reveal {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}
.fb-page .wrap {
  max-width: 100%;
  padding: 0;
}
.fb-page .sh {
  margin-bottom: 20px;
  text-align: center;
}
.fb-page .sh__label {
  margin-bottom: 6px;
  justify-content: center;
}
.fb-page .sh__label::after {
  content: '';
  width: 32px;
  height: 1px;
  background: var(--ink-faint);
}
.fb-page .sh__title {
  font-size: 1.3rem;
}
.fb-page .sh__title::after {
  content: '';
  display: block;
  width: 64px;
  height: 1px;
  margin: 10px auto 0;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.fb-page .couple__photo {
  width: 108px;
  height: 108px;
  margin-bottom: 14px;
}
.fb-page .couple__row { gap: 16px; }
.fb-page .couple__person:first-child { padding-top: 0; }
.fb-page .couple__name { font-size: 1.15rem; }
.fb-page .couple__fullname { font-size: 0.85rem; }
.fb-page .countdown__num { font-size: 2.1rem; }
.fb-page .countdown__item { padding: 0 12px; }
.fb-page .events__grid { grid-template-columns: 1fr 1fr; }
.fb-page .events__card { padding: 14px 12px; }
.fb-page .events__card:first-child { border-right: 1px solid var(--border-light); }
.fb-page .events__icon { width: 36px; height: 36px; margin-bottom: 10px; }
.fb-page .events__icon .mi { font-size: 18px; }
.fb-page .events__name { font-size: 1.1rem; margin-bottom: 10px; }
.fb-page .events__detail { font-size: 0.75rem; gap: 8px; padding: 6px 0; }
.fb-page .events__detail .mi { font-size: 15px; }
.fb-page .events__map-link { margin-top: 12px; font-size: 0.7rem; padding: 6px 0; }
.fb-page .timeline__list { padding-left: 32px; }
.fb-page .timeline__list::before { left: 6px; }
.fb-page .timeline__item { margin-bottom: 16px; }
.fb-page .timeline__dot { left: -32px; width: 13px; height: 13px; }
.fb-page .timeline__date { font-size: 10px; margin-bottom: 2px; }
.fb-page .timeline__title { font-size: 1rem; }
.fb-page .timeline__desc { font-size: 0.8rem; line-height: 1.6; }
.fb-page .gallery__grid { gap: 6px; }
.fb-page .gallery__item { min-height: 104px; }
.fb-page .gallery__item:nth-child(1) { min-height: 214px; }
.fb-page .gallery__item .mi { font-size: 28px; }
.fb-page .field { margin-bottom: 14px; }
.fb-page .field__input,
.fb-page .field__select,
.fb-page .field__textarea { font-size: 0.95rem; padding: 9px 0; }
.fb-page .field__textarea { min-height: 64px; }
.fb-page .att-group { gap: 6px; }
.fb-page .att-btn { font-size: 0.75rem; padding: 8px 10px; }
.fb-page .wishes__list {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 16px;
}
.fb-page .wish { padding: 12px; margin-bottom: 8px; }
.fb-page .wish__msg { font-size: 0.8rem; }
.fb-page .gift__note { font-size: 0.85rem; margin-bottom: 16px; }
.fb-page .gift__cards { gap: 12px; grid-template-columns: repeat(3, 1fr); }
.fb-page .gift__card { padding: 18px 14px; }
.fb-page .gift__number { font-size: 1.1rem; }
.fb-page .btn { width: 100%; }
@media (max-width: 768px), (max-height: 560px) {
  .fb-root {
    padding: 14px 10px calc(14px + env(safe-area-inset-bottom));
  }
  .fb-page {
    padding: 22px 16px;
    font-size: 13px;
  }
  .poem-page { gap: 16px; }
  .poem-page__title { margin-bottom: 14px; font-size: 1.2rem; }
  .poem-page__verse { font-size: 0.9rem; line-height: 1.75; }
  .poem-page__media { max-width: 100%; }
  .poem-page__media--photo { height: 44%; max-width: 84%; }
  .poem-page__play { width: 42px; }
  .fb-page:not(.fb-page--cover)::before { inset: 8px; }
  .fb-page:not(.fb-page--cover)::after { bottom: 12px; font-size: 8px; letter-spacing: 2px; }
  .poem-page__media::before,
  .poem-page__media::after { width: 46px; height: 14px; }
  .poem-page__title::after { margin-top: 10px; }
  .fb-page .sh { margin-bottom: 14px; }
  .fb-page .sh__title { font-size: 1.1rem; }
  .fb-page .sh__title::after { width: 44px; margin-top: 8px; }
  .fb-page .events__grid { grid-template-columns: 1fr; }
  .fb-page .events__card:first-child {
    border-right: none;
    border-bottom: 1px solid var(--border-light);
  }
  .fb-page .events__card { padding: 12px 10px; }
  .fb-page .events__detail { font-size: 0.7rem; }
  .fb-page .couple__row {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    text-align: center;
  }
  .fb-page .couple__mid { display: none; }
  .fb-page .couple__photo {
    width: 76px;
    height: 76px;
    margin-bottom: 10px;
  }
  .fb-page .couple__name { font-size: 1rem; }
  .fb-page .couple__fullname { font-size: 0.75rem; }
  .fb-page .couple__parents { font-size: 0.72rem; line-height: 1.5; }
  .fb-page .countdown__num { font-size: 1.7rem; }
  .fb-page .countdown__item { padding: 0 6px; }
  .fb-page .countdown__label { letter-spacing: 2px; }
  .fb-page .timeline__list { padding-left: 26px; }
  .fb-page .timeline__list::before { left: 6px; }
  .fb-page .timeline__item { margin-bottom: 12px; }
  .fb-page .timeline__dot { left: -26px; width: 12px; height: 12px; }
  .fb-page .timeline__title { font-size: 0.95rem; }
  .fb-page .timeline__desc { font-size: 0.74rem; line-height: 1.5; }
  .fb-page .gallery__item { min-height: 84px; }
  .fb-page .gallery__item:nth-child(1) { min-height: 174px; }
  .fb-page .field { margin-bottom: 10px; }
  .fb-page .field__label { font-size: 10px; margin-bottom: 6px; }
  .fb-page .field__input,
  .fb-page .field__select,
  .fb-page .field__textarea { font-size: 0.9rem; padding: 7px 0; }
  .fb-page .wishes__list { max-height: 150px; margin-top: 12px; }
  .fb-page .gift__cards { grid-template-columns: 1fr; gap: 10px; }
  .fb-page .gift__card { padding: 14px 12px; }
  .fb-page .gift__note { font-size: 0.78rem; margin-bottom: 12px; }
}
`

function calcSize() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  if (vw < 768) {
    // portrait phone: one page
    const w = Math.max(240, Math.min(vw - 24, 460))
    const h = Math.max(320, Math.min(vh - 56, w * 1.5))
    return { w, h }
  }
  // spread mode; short screens (landscape phone) get tighter vertical budget
  const reserve = vh < 560 ? 64 : 88
  const w = Math.max(220, Math.min((vw - 80) / 2, 560, (vh - reserve) / 1.45))
  return { w, h: w * 1.45 }
}

function PoemMedia({ media }) {
  const label = media.alt || (media.type === 'video' ? 'Tempat video' : 'Tempat foto');

  return (
    <figure
      className={`poem-page__media poem-page__media--${media.type}`}
      style={media.aspectRatio ? { aspectRatio: media.aspectRatio } : undefined}
      aria-label={label}
    >
      {media.src ? (
        <img src={media.src} alt={label} />
      ) : media.type === 'video' ? (
        <div className="poem-page__video-placeholder" aria-hidden="true">
          <span className="poem-page__play"><span className="mi">play_arrow</span></span>
        </div>
      ) : (
        <div className="poem-page__photo-placeholder" aria-hidden="true" />
      )}
    </figure>
  )
}

export default function Flipbook() {
  const bookRef = useRef(null)
  const [size, setSize] = useState(() =>
    typeof window === 'undefined' ? { w: 400, h: 580 } : calcSize()
  )
  const [portrait, setPortrait] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  )
  const pageRef = useRef(0)

  const setPg = useCallback((n) => {
    pageRef.current = n
  }, [])

  useEffect(() => {
    const onResize = () => {
      setSize(calcSize())
      setPortrait(window.innerWidth < 768)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const api = () => bookRef.current?.pageFlip?.()

  const go = useCallback((n) => {
    const target = Math.max(0, Math.min(TOTAL - 1, n))
    const flip = api()
    if (!flip) { setPg(target); return }
    // small step: animated flip; big jump (slider): instant
    if (Math.abs(target - pageRef.current) <= 2 && typeof flip.flip === 'function') {
      flip.flip(target)
    } else if (typeof flip.turnToPage === 'function') {
      flip.turnToPage(target)
    }
    setPg(target)
  }, [setPg])

  const next = useCallback(() => go(pageRef.current + 1), [go])
  const prev = useCallback(() => go(pageRef.current - 1), [go])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, textarea, select')) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onFlip = (e) => {
    const d = e?.data
    setPg(typeof d === 'number' ? d : (d?.page ?? 0))
  }

  // remount book on viewport size change, restore current page
  useEffect(() => {
    if (!pageRef.current) return
    const id = setTimeout(() => api()?.turnToPage(pageRef.current), 80)
    return () => clearTimeout(id)
  }, [size])

  const pages = useMemo(() => Array.from({ length: TOTAL }, (_, index) => {
    const isFrontCover = index === 0
    const isBackCover = index === TOTAL - 1
    const poem = !isFrontCover && !isBackCover ? poemPages[index - 1] : null

    return (
      <div
        className={`fb-page${isFrontCover || isBackCover ? ' fb-page--cover' : ''}`}
        key={`page-${index + 1}`}
        page-number={index + 1}
      >
        {isFrontCover || isBackCover ? (
          <img
            className="fb-page__cover-image"
            src={isFrontCover ? '/images/cover-depan.png' : '/images/cover-belakang.png'}
            alt={isFrontCover ? 'Sampul depan' : 'Sampul belakang'}
          />
        ) : (
          <article className={`poem-page${poem.mediaPosition === 'top' ? ' poem-page--media-first' : ''}`}>
            {poem.mediaPosition === 'top' && <PoemMedia media={poem.media} />}
            <div className="poem-page__copy">
              <h2 className="poem-page__title">{poem.title}</h2>
              <p className="poem-page__verse">
                {poem.lines.map((line, lineIndex) => <span key={`${index}-${lineIndex}`}>{line}</span>)}
              </p>
            </div>
            {poem.mediaPosition !== 'top' && <PoemMedia media={poem.media} />}
          </article>
        )}
      </div>
    )
  }), [])

  return (
    <div className="fb-root">
      <style>{css}</style>

      <div className="fb-stage">
        <HTMLFlipBook
          key={`${size.w}x${size.h}-${portrait}`}
          ref={bookRef}
          width={size.w}
          height={size.h}
          size="fixed"
          minWidth={portrait ? 240 : 220}
          maxWidth={700}
          minHeight={320}
          maxHeight={1000}
          showCover
          usePortrait={portrait}
          startPage={0}
          flippingTime={700}
          drawShadow
          maxShadowOpacity={0.35}
          mobileScrollSupport={false}
          swipeDistance={30}
          autoSize={false}
          onFlip={onFlip}
        >
          {pages}
        </HTMLFlipBook>
      </div>

    </div>
  )
}
