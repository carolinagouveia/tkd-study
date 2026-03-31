import { useState } from 'react'
import { useSpeak } from '../../hooks/useSpeak'

interface AudioButtonProps {
  text: string
  audioFile?: string
  size?: 'sm' | 'md'
  variant?: 'ghost' | 'pill'
}

export function AudioButton({ text, audioFile, size = 'sm', variant = 'ghost' }: AudioButtonProps) {
  const { speak, isSupported } = useSpeak()
  const [playing, setPlaying] = useState(false)

  if (!isSupported) return null

  function handleClick() {
    // speak() called synchronously here — required for iOS Safari
    speak(text, audioFile)
    setPlaying(true)
    setTimeout(() => setPlaying(false), 800)
  }

  if (variant === 'pill') {
    return (
      <button
        onClick={handleClick}
        aria-label={`Ouvir: ${text}`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors tap-target"
      >
        <SpeakerIcon playing={playing} size={14} />
        Ouvir
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      aria-label={`Ouvir: ${text}`}
      className={[
        'flex items-center justify-center rounded-xl transition-colors tap-target',
        size === 'sm'
          ? 'w-8 h-8 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent-500'
          : 'w-10 h-10 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent-500',
      ].join(' ')}
    >
      <SpeakerIcon playing={playing} size={size === 'sm' ? 16 : 20} />
    </button>
  )
}

function SpeakerIcon({ playing, size }: { playing: boolean; size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={playing ? 'text-accent-500' : ''}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {playing ? (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      ) : (
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      )}
    </svg>
  )
}
