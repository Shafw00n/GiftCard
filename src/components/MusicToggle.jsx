import { useState, useRef, useEffect } from 'react'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
    // Replace with your actual MP3:
    // audioRef.current.src = '/music/anniversary-song.mp3'

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else if (audioRef.current.src) {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <button
      className={`music-fab ${playing ? 'music-fab--playing' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Matikan musik' : 'Nyalakan musik'}
    >
      <span className="mi">{playing ? 'music_note' : 'music_off'}</span>
    </button>
  )
}
