import { useState, useCallback } from 'react'
import { useSpeak } from '../hooks/useSpeak'
import { CountingGrid } from '../components/counting/CountingGrid'
import { CountingDisplay } from '../components/counting/CountingDisplay'
import countingData from '../data/counting.json'
import type { CountingNumber } from '../data/schema'

const data = countingData as { system: string; note: string; numbers: CountingNumber[] }

export function CountingPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { speak, isSupported } = useSpeak()
  const active = data.numbers[activeIndex]

  const handleSpeak = useCallback((n: CountingNumber) => {
    // Synchronous inside user gesture — iOS Safari requirement
    speak(n.korean, n.audioFile)
  }, [speak])

  const handleSelect = useCallback((n: CountingNumber) => {
    const idx = data.numbers.findIndex((x) => x.number === n.number)
    setActiveIndex(idx)
  }, [])

  const goNext = useCallback(() => {
    const next = Math.min(activeIndex + 1, data.numbers.length - 1)
    setActiveIndex(next)
    speak(data.numbers[next].korean)
  }, [activeIndex, speak])

  const goPrev = useCallback(() => {
    const prev = Math.max(activeIndex - 1, 0)
    setActiveIndex(prev)
    speak(data.numbers[prev].korean)
  }, [activeIndex, speak])

  return (
    <div className="px-4 pt-4 pb-6 flex flex-col gap-5">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-50">
          Contagem Coreana
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
          {data.note}
        </p>
      </div>

      {/* Active number display */}
      <CountingDisplay
        item={active}
        onSpeak={() => handleSpeak(active)}
        speakSupported={isSupported}
      />

      {/* Prev / Next navigation */}
      <div className="flex gap-3">
        <button
          onClick={goPrev}
          disabled={activeIndex === 0}
          className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-semibold text-sm disabled:opacity-30 tap-target transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ← {activeIndex > 0 ? data.numbers[activeIndex - 1].korean : ''}
        </button>
        <button
          onClick={goNext}
          disabled={activeIndex === data.numbers.length - 1}
          className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-semibold text-sm disabled:opacity-30 tap-target transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {activeIndex < data.numbers.length - 1 ? data.numbers[activeIndex + 1].korean : ''} →
        </button>
      </div>

      {/* Grid */}
      <CountingGrid
        numbers={data.numbers}
        active={active.number}
        onSelect={handleSelect}
        onSpeak={handleSpeak}
      />

      {!isSupported && (
        <p className="text-center text-xs text-gray-400 dark:text-gray-600">
          Pronúncia de áudio não disponível neste dispositivo.
        </p>
      )}
    </div>
  )
}
