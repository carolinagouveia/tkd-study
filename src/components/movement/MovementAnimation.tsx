import type { ReactElement } from 'react'
import { motion } from 'framer-motion'

// ── Design tokens ─────────────────────────────────────────────────────────────
const BODY   = '#475569'  // slate-600 — readable on light + dark
const ACTIVE = 'var(--accent-500, #6366f1)'

// ── Transition presets ────────────────────────────────────────────────────────
// 4-keyframe loop: [start, technique, technique-hold, back-to-start]
const T4: Parameters<typeof motion.path>[0]['transition'] = {
  duration: 2.2,
  repeat: Infinity,
  times: [0, 0.35, 0.6, 1],
  ease: 'easeInOut',
}
// 7-keyframe loop for multi-phase kicks:
// [stand, stand-hold, knee-up, technique, technique-hold, knee-back, stand]
const T7: Parameters<typeof motion.path>[0]['transition'] = {
  duration: 3.0,
  repeat: Infinity,
  times: [0, 0.08, 0.32, 0.52, 0.62, 0.80, 1],
  ease: 'easeInOut',
}

// ── Shared static parts ───────────────────────────────────────────────────────

function Floor() {
  return (
    <>
      <ellipse cx={60} cy={144} rx={22} ry={3} fill="#e2e8f0" className="dark:opacity-20" />
      <line x1={15} y1={140} x2={105} y2={140} stroke="#e2e8f0" strokeWidth={1.5} className="dark:opacity-20" />
    </>
  )
}

function Head({ cx = 60, cy = 15 }: { cx?: number; cy?: number }) {
  return <circle cx={cx} cy={cy} r={11} fill={BODY} />
}

function Torso() {
  return <path d="M 60 27 L 60 68" stroke={BODY} strokeWidth={9} strokeLinecap="round" fill="none" />
}

// Guard position: left arm (static in all arm techniques)
function LGuard() {
  return (
    <>
      <path d="M 47 35 L 40 54" stroke={BODY} strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d="M 40 54 L 36 70" stroke={BODY} strokeWidth={6} strokeLinecap="round" fill="none" />
    </>
  )
}

// Guard position: right arm (static in kick techniques)
function RGuard() {
  return (
    <>
      <path d="M 73 35 L 80 54" stroke={BODY} strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d="M 80 54 L 84 70" stroke={BODY} strokeWidth={6} strokeLinecap="round" fill="none" />
    </>
  )
}

// Neutral stance: left leg (static)
function LLeg() {
  return (
    <>
      <path d="M 53 68 L 50 100" stroke={BODY} strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M 50 100 L 48 132" stroke={BODY} strokeWidth={7} strokeLinecap="round" fill="none" />
    </>
  )
}

// Neutral stance: right leg (static)
function RLeg() {
  return (
    <>
      <path d="M 67 68 L 70 100" stroke={BODY} strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M 70 100 L 72 132" stroke={BODY} strokeWidth={7} strokeLinecap="round" fill="none" />
    </>
  )
}

// ── Technique animations ──────────────────────────────────────────────────────

/** move-branca-001 — Soco Direto (Jireugi, straight punch) */
function Jireugi() {
  return (
    <>
      <Floor /><Torso /><Head />
      {/* Left arm counter-pulls back as right punches */}
      <motion.path animate={{ d: ['M 47 35 L 40 54','M 47 35 L 38 53','M 47 35 L 38 53','M 47 35 L 40 54'] }} transition={T4} stroke={BODY} strokeWidth={7} strokeLinecap="round" fill="none" />
      <motion.path animate={{ d: ['M 40 54 L 36 70','M 38 53 L 33 68','M 38 53 L 33 68','M 40 54 L 36 70'] }} transition={T4} stroke={BODY} strokeWidth={6} strokeLinecap="round" fill="none" />
      {/* Right arm — PUNCH */}
      <motion.path animate={{ d: ['M 73 35 L 77 52','M 73 35 L 94 38','M 73 35 L 94 38','M 73 35 L 77 52'] }} transition={T4} stroke={ACTIVE} strokeWidth={7} strokeLinecap="round" fill="none" />
      <motion.path animate={{ d: ['M 77 52 L 80 66','M 94 38 L 110 42','M 94 38 L 110 42','M 77 52 L 80 66'] }} transition={T4} stroke={ACTIVE} strokeWidth={6} strokeLinecap="round" fill="none" />
      <LLeg />
      {/* Right leg in ap-kubi (front stance — slightly more forward) */}
      <path d="M 67 68 L 72 103" stroke={BODY} strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M 72 103 L 76 132" stroke={BODY} strokeWidth={7} strokeLinecap="round" fill="none" />
    </>
  )
}

/** move-branca-002 — Chute Frontal (Ap Chagi, front kick) */
function ApChagi() {
  return (
    <>
      <Floor /><Torso /><Head />
      <LGuard /><RGuard />
      <LLeg />
      {/* Right leg — FRONT KICK: stand → knee-up → kick-extend → knee-back → stand */}
      <motion.path
        animate={{ d: [
          'M 67 68 L 70 100', // stand
          'M 67 68 L 70 100', // hold
          'M 67 68 L 76 82',  // knee raised
          'M 67 68 L 80 74',  // thigh at kick angle
          'M 67 68 L 80 74',  // hold
          'M 67 68 L 76 82',  // knee back
          'M 67 68 L 70 100', // return
        ]}}
        transition={T7}
        stroke={ACTIVE} strokeWidth={8} strokeLinecap="round" fill="none"
      />
      <motion.path
        animate={{ d: [
          'M 70 100 L 72 132', // stand
          'M 70 100 L 72 132', // hold
          'M 76 82 L 82 97',   // lower leg hanging
          'M 80 74 L 102 70',  // kick fully extended
          'M 80 74 L 102 70',  // hold
          'M 76 82 L 82 97',   // leg folding back
          'M 70 100 L 72 132', // return
        ]}}
        transition={T7}
        stroke={ACTIVE} strokeWidth={7} strokeLinecap="round" fill="none"
      />
    </>
  )
}

/** move-branca-003 — Bloqueio Baixo (Arae Makki, low block) */
function AraeMakki() {
  return (
    <>
      <Floor /><Torso /><Head />
      {/* Left arm counter — rises during the sweep */}
      <motion.path animate={{ d: ['M 47 35 L 58 44','M 47 35 L 40 54','M 47 35 L 40 54','M 47 35 L 58 44'] }} transition={T4} stroke={BODY} strokeWidth={7} strokeLinecap="round" fill="none" />
      <motion.path animate={{ d: ['M 58 44 L 64 56','M 40 54 L 36 70','M 40 54 L 36 70','M 58 44 L 64 56'] }} transition={T4} stroke={BODY} strokeWidth={6} strokeLinecap="round" fill="none" />
      {/* Right arm — LOW BLOCK: starts high-inside, sweeps to low-outside */}
      <motion.path animate={{ d: ['M 73 35 L 64 47','M 73 35 L 83 57','M 73 35 L 83 57','M 73 35 L 64 47'] }} transition={T4} stroke={ACTIVE} strokeWidth={7} strokeLinecap="round" fill="none" />
      <motion.path animate={{ d: ['M 64 47 L 56 59','M 83 57 L 95 76','M 83 57 L 95 76','M 64 47 L 56 59'] }} transition={T4} stroke={ACTIVE} strokeWidth={6} strokeLinecap="round" fill="none" />
      <LLeg /><RLeg />
    </>
  )
}

/** move-amarela-001 — Bloqueio Médio (Momtong Makki, middle block) */
function MomtongMakki() {
  return (
    <>
      <Floor /><Torso /><Head />
      {/* Left arm counter */}
      <motion.path animate={{ d: ['M 47 35 L 56 46','M 47 35 L 40 54','M 47 35 L 40 54','M 47 35 L 56 46'] }} transition={T4} stroke={BODY} strokeWidth={7} strokeLinecap="round" fill="none" />
      <motion.path animate={{ d: ['M 56 46 L 60 58','M 40 54 L 36 70','M 40 54 L 36 70','M 56 46 L 60 58'] }} transition={T4} stroke={BODY} strokeWidth={6} strokeLinecap="round" fill="none" />
      {/* Right arm — MIDDLE BLOCK: forearm sweeps from inside to outside at chest height */}
      <motion.path animate={{ d: ['M 73 35 L 70 52','M 73 35 L 84 50','M 73 35 L 84 50','M 73 35 L 70 52'] }} transition={T4} stroke={ACTIVE} strokeWidth={7} strokeLinecap="round" fill="none" />
      <motion.path animate={{ d: ['M 70 52 L 62 62','M 84 50 L 100 48','M 84 50 L 100 48','M 70 52 L 62 62'] }} transition={T4} stroke={ACTIVE} strokeWidth={6} strokeLinecap="round" fill="none" />
      <LLeg /><RLeg />
    </>
  )
}

/** move-amarela-002 — Bloqueio Alto (Eolgul Makki, high block) */
function EolgulMakki() {
  return (
    <>
      <Floor /><Torso /><Head />
      <LGuard />
      {/* Right arm — HIGH BLOCK: arm sweeps up above the head */}
      <motion.path animate={{ d: ['M 73 35 L 80 53','M 73 35 L 83 26','M 73 35 L 83 26','M 73 35 L 80 53'] }} transition={T4} stroke={ACTIVE} strokeWidth={7} strokeLinecap="round" fill="none" />
      <motion.path animate={{ d: ['M 80 53 L 83 69','M 83 26 L 96 16','M 83 26 L 96 16','M 80 53 L 83 69'] }} transition={T4} stroke={ACTIVE} strokeWidth={6} strokeLinecap="round" fill="none" />
      <LLeg /><RLeg />
    </>
  )
}

/** move-amarela-003 — Chute Lateral (Yeop Chagi, side kick) */
function YeopChagi() {
  return (
    <>
      <Floor /><Torso /><Head />
      <LGuard /><RGuard />
      <LLeg />
      {/* Right leg — SIDE KICK: stand → knee-up-to-side → kick-right → back */}
      <motion.path
        animate={{ d: [
          'M 67 68 L 70 100', // stand
          'M 67 68 L 70 100', // hold
          'M 67 68 L 84 72',  // knee raised to side
          'M 67 68 L 90 68',  // thigh at kick angle
          'M 67 68 L 90 68',  // hold
          'M 67 68 L 84 72',  // knee returning
          'M 67 68 L 70 100', // stand
        ]}}
        transition={T7}
        stroke={ACTIVE} strokeWidth={8} strokeLinecap="round" fill="none"
      />
      <motion.path
        animate={{ d: [
          'M 70 100 L 72 132', // stand
          'M 70 100 L 72 132', // hold
          'M 84 72 L 90 86',   // lower leg hanging to side
          'M 90 68 L 112 68',  // foot extended fully to right
          'M 90 68 L 112 68',  // hold
          'M 84 72 L 90 86',   // lower leg coming back
          'M 70 100 L 72 132', // stand
        ]}}
        transition={T7}
        stroke={ACTIVE} strokeWidth={7} strokeLinecap="round" fill="none"
      />
    </>
  )
}

// ── Fallback for unknown movement IDs ─────────────────────────────────────────
function FallbackFigure() {
  return (
    <>
      <Floor /><Torso /><Head />
      <LGuard /><RGuard /><LLeg /><RLeg />
    </>
  )
}

// ── Registry ──────────────────────────────────────────────────────────────────
const ANIMATIONS: Record<string, () => ReactElement> = {
  'move-branca-001': Jireugi,
  'move-branca-002': ApChagi,
  'move-branca-003': AraeMakki,
  'move-amarela-001': MomtongMakki,
  'move-amarela-002': EolgulMakki,
  'move-amarela-003': YeopChagi,
}

// ── Public component ──────────────────────────────────────────────────────────
interface MovementAnimationProps {
  movementId: string
  className?: string
}

export function MovementAnimation({ movementId, className = '' }: MovementAnimationProps) {
  const Content = ANIMATIONS[movementId] ?? FallbackFigure
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Content />
    </svg>
  )
}
