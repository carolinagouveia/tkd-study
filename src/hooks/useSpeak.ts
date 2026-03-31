import { useCallback, useEffect, useRef } from 'react'

const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

export function useSpeak() {
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    if (!isSupported) return

    function pickVoice() {
      const voices = window.speechSynthesis.getVoices()
      // Prefer ko-KR, fallback to any Korean, fallback to null (browser default)
      voiceRef.current =
        voices.find((v) => v.lang === 'ko-KR') ??
        voices.find((v) => v.lang.startsWith('ko')) ??
        null
    }

    pickVoice()
    window.speechSynthesis.onvoiceschanged = pickVoice
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  // speak() MUST be called synchronously inside a user gesture handler (iOS Safari requirement)
  const speak = useCallback((text: string, audioFile?: string) => {
    // If a pre-recorded file exists, prefer it
    if (audioFile) {
      const audio = new Audio(audioFile)
      audio.play().catch(() => {
        // File failed — fall back to TTS
        speakTTS(text, voiceRef.current)
      })
      return
    }
    speakTTS(text, voiceRef.current)
  }, [])

  return { speak, isSupported }
}

function speakTTS(text: string, voice: SpeechSynthesisVoice | null) {
  if (!isSupported) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = 'ko-KR'
  utt.rate = 0.85
  if (voice) utt.voice = voice
  window.speechSynthesis.speak(utt)
}
