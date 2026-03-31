import { useState, useEffect } from 'react'
import type { BeltContent } from '../data/schema'

const cache: Record<string, BeltContent> = {}

export function useBeltContent(beltId: string | null) {
  const [content, setContent] = useState<BeltContent | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!beltId) return

    if (cache[beltId]) {
      setContent(cache[beltId])
      return
    }

    setLoading(true)
    import(`../data/belts/${beltId}.json`)
      .then((mod) => {
        const data = mod.default as BeltContent
        cache[beltId] = data
        setContent(data)
      })
      .catch(() => setContent(null))
      .finally(() => setLoading(false))
  }, [beltId])

  return { content, loading }
}
