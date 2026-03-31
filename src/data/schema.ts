// ── Belt ───────────────────────────────────────────────────────────────────

export interface Belt {
  id: string          // e.g. "branca"
  order: number       // 1 = white 10th KUP (first), 11 = black 1st DAN
  name: string        // short name shown in unlocked node: "Branco", "9.º KUP"
  nameKorean: string  // Korean shown in unlocked node: "흰 띠"
  namePt: string      // full PT name for dashboard card: "Cinto Branco"
  kup: string         // "10.º KUP", "9.º KUP", "1.º DAN"
  colorName: string   // belt color name for locked display: "Branco", "Branco-Amarelo"
  color: string       // hex background for the belt swatch
  textColor: string   // hex for contrast text on belt swatch
  accentColor: string // primary accent used for UI theming on this belt's screens
  examRequirements: string // brief human-readable exam summary, pt-PT
  meaning: string | null   // philosophical meaning from Notion; null if not yet available
}

// ── Vocabulary ─────────────────────────────────────────────────────────────

export type VocabCategory =
  | 'postura'   // Stances
  | 'tecnica'   // Techniques (hand/foot)
  | 'contagem'  // Counting
  | 'comando'   // Class commands
  | 'conceito'  // Concepts / philosophy
  | 'poomse'    // Form names

export interface Vocabulary {
  id: string
  korean: string       // Hangul: "차렷"
  romanized: string    // "Charyeot"
  portuguese: string   // "Posição de atenção"
  category: VocabCategory
  beltId: string
  audioFile?: string   // path relative to /public/audio/, e.g. "vocab/charyeot.mp3"
  notes?: string       // study tip or context, pt-PT
}

// ── Movements ──────────────────────────────────────────────────────────────

export interface Movement {
  id: string
  name: string          // "Soco Direto" (pt-PT)
  nameKorean: string    // "지르기"
  romanized: string     // "Jireugi"
  stance: string        // e.g. "ap-kubi"
  description: string   // step-by-step instructions, pt-PT
  tips?: string         // common mistakes / coaching cues, pt-PT
  imagePlaceholder: string // "/images/movements/jireugi.svg"
  beltId: string
}

// ── Poomse ─────────────────────────────────────────────────────────────────

export type Direction = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW'

export interface PoomseStep {
  stepNumber: number
  movementId: string  // references Movement.id
  direction: Direction
  technique: string   // short label, e.g. "Baixo bloqueio"
  stance: string
  kiap?: boolean      // true if this step requires a vocal shout
  description: string // full instruction, pt-PT
  diagramX: number    // SVG coordinate within 0–300 viewBox
  diagramY: number
}

export interface Poomse {
  id: string
  name: string          // "Taegeuk Il Jang"
  nameKorean: string    // "태극 1장"
  beltId: string
  totalSteps: number
  description: string   // what this poomse represents, pt-PT
  steps: PoomseStep[]
}

// ── Exam Checklist ─────────────────────────────────────────────────────────

export type ChecklistCategory =
  | 'vocabulario'
  | 'tecnicas-de-mao'
  | 'tecnicas-de-pe'
  | 'poomse'
  | 'quebra'   // board breaking
  | 'teoria'

export interface ChecklistItem {
  id: string
  category: ChecklistCategory
  labelPt: string
  description?: string
  beltId: string
  // NOTE: `completed` is stored in Zustand (srStore), NOT in this JSON
}

// ── Counting ───────────────────────────────────────────────────────────────

export type CountingSystem = 'sino-korean' | 'native-korean'

export interface CountingNumber {
  number: number
  korean: string      // Hangul
  romanized: string
  portuguese: string
  audioFile?: string
}

export interface CountingData {
  system: CountingSystem
  note: string
  numbers: CountingNumber[]
}

// ── Full belt content (one JSON file per belt) ─────────────────────────────

export interface BeltContent {
  belt: Belt
  vocabulary: Vocabulary[]
  movements: Movement[]
  poomse: Poomse[]
  checklist: ChecklistItem[]
}
