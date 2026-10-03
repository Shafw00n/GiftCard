import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import HTMLFlipBook from 'react-pageflip'
import 'page-flip/src/Style/stPageFlip.css'

const TOTAL = 12

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
    radial-gradient(900px 620px at 10% 6%, rgba(184,135,122,.28), transparent 62%),
    radial-gradient(860px 720px at 92% 88%, rgba(125,142,123,.26), transparent 62%),
    radial-gradient(640px 460px at 78% 12%, rgba(180,157,126,.20), transparent 66%),
    linear-gradient(160deg, #F8F2EC 0%, #F1E9E1 48%, #EBE3D9 100%);
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
.fb-page--dark[class~="--right"] {
  box-shadow:
    inset 0 0 0 1px rgba(201,171,126,.28),
    inset 20px 0 26px -16px rgba(0,0,0,.55),
    0 22px 48px rgba(45,42,38,.28),
    0 4px 10px rgba(45,42,38,.14);
}
.fb-page--dark[class~="--left"] {
  box-shadow:
    inset 0 0 0 1px rgba(201,171,126,.28),
    inset -20px 0 26px -16px rgba(0,0,0,.55),
    0 22px 48px rgba(45,42,38,.28),
    0 4px 10px rgba(45,42,38,.14);
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
.fb-page--dark {
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(184,135,122,.32), transparent 55%),
    radial-gradient(100% 70% at 50% 112%, rgba(125,142,123,.24), transparent 60%),
    linear-gradient(168deg, #332C26 0%, #40362D 46%, #241E18 100%);
  color: #EDE4D6;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow:
    inset 0 0 0 1px rgba(201,171,126,.28),
    0 22px 48px rgba(45,42,38,.28),
    0 4px 10px rgba(45,42,38,.14);
}
.fb-page--dark::before,
.fb-page--dark::after {
  content: '';
  position: absolute;
  pointer-events: none;
}
.fb-page--dark::before {
  inset: 14px;
  border: 1px solid rgba(201,171,126,.55);
}
.fb-page--dark::after {
  inset: 20px;
  border: 1px solid rgba(201,171,126,.22);
}
.fb-cover__label {
  font-family: var(--ff-ui);
  font-size: 11px;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: rgba(201,171,126,.9);
  margin-bottom: 26px;
}
.fb-cover__names {
  font-family: var(--ff-script);
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 3rem;
  line-height: 1.15;
  color: #F2E5D2;
  text-shadow: 0 2px 12px rgba(0,0,0,.35);
}
.fb-cover__names em {
  font-family: var(--ff-display);
  font-style: italic;
  font-size: 1.3rem;
  color: #C9AB7E;
  line-height: 1.4;
}
.fb-cover__date {
  font-family: var(--ff-ui);
  font-size: 11px;
  letter-spacing: 5px;
  color: rgba(237,228,214,.6);
  margin-top: 26px;
}
.fb-cover__orn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 30px 0;
}
.fb-cover__orn::before,
.fb-cover__orn::after {
  content: '';
  width: 76px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,171,126,.95));
}
.fb-cover__orn::after {
  background: linear-gradient(90deg, rgba(201,171,126,.95), transparent);
}
.fb-orn__dot {
  display: block;
  width: 7px;
  height: 7px;
  background: #C9AB7E;
  transform: rotate(45deg);
}
.fb-cover__open {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--ff-ui);
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #EDE4D6;
  border: 1px solid rgba(201,171,126,.7);
  padding: 13px 26px;
  border-radius: 40px;
  transition: background .3s, color .3s, box-shadow .3s;
}
.fb-cover__open:hover {
  background: #C9AB7E;
  color: #241E18;
  box-shadow: 0 8px 22px rgba(201,171,126,.35);
}
.fb-cover__open .mi { font-size: 16px; }
.fb-open__salam {
  font-family: var(--ff-body);
  color: var(--ink-light);
  margin-bottom: 16px;
}
.fb-open__bismillah {
  font-family: var(--ff-display);
  font-size: 1.4rem;
  color: var(--ink);
  margin-bottom: 24px;
}
.fb-open__quote {
  font-family: var(--ff-display);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--ink-light);
  line-height: 1.8;
  border-left: 2px solid var(--rose);
  padding-left: 16px;
  text-align: left;
  margin-top: 24px;
}
.fb-open__names {
  font-family: var(--ff-display);
  font-size: 1.6rem;
  color: var(--ink);
  margin: 24px 0 8px;
}
.fb-end__names {
  font-family: var(--ff-script);
  font-size: 2.8rem;
  line-height: 1.2;
  color: #F2E5D2;
  margin-bottom: 16px;
  text-shadow: 0 2px 12px rgba(0,0,0,.35);
}
.fb-end__msg {
  font-family: var(--ff-ui);
  font-size: 0.85rem;
  letter-spacing: 1px;
  line-height: 1.9;
  color: rgba(237,228,214,.65);
  max-width: 360px;
  margin: 0 auto;
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
  .fb-cover__label { letter-spacing: 4px; margin-bottom: 18px; }
  .fb-cover__names { font-size: 2.3rem; }
  .fb-cover__date { letter-spacing: 4px; margin-top: 18px; }
  .fb-cover__orn { margin: 22px 0; gap: 10px; }
  .fb-cover__orn::before,
  .fb-cover__orn::after { width: 48px; }
  .fb-cover__open { padding: 14px 26px; }
  .fb-end__names { font-size: 2.2rem; }
  .fb-end__msg { font-size: 0.78rem; }
  .fb-open__bismillah { font-size: 1.15rem; }
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

  const pages = useMemo(() => Array.from({ length: TOTAL }, (_, index) => (
    <div
      className={`fb-page${index === 0 || index === TOTAL - 1 ? ' fb-page--cover' : ''}`}
      key={`page-${index + 1}`}
      page-number={index + 1}
    >
      {(index === 0 || index === TOTAL - 1) && (
        <img
          className="fb-page__cover-image"
          src={index === 0 ? '/images/cover-depan.png' : '/images/cover-belakang.png'}
          alt={index === 0 ? 'Sampul depan' : 'Sampul belakang'}
        />
      )}
    </div>
  )), [])

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
