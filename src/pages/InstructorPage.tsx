import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCustomVocabStore } from '../store/customVocabStore'
import type { CustomVocab, CustomVocabDraft } from '../store/customVocabStore'
import type { VocabCategory } from '../data/schema'
import beltsData from '../data/belts.json'
import type { Belt } from '../data/schema'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const belts = beltsData as Belt[]

const CATEGORIES: { value: VocabCategory; label: string }[] = [
  { value: 'postura',   label: 'Postura' },
  { value: 'tecnica',   label: 'Técnica' },
  { value: 'contagem',  label: 'Contagem' },
  { value: 'comando',   label: 'Comando' },
  { value: 'conceito',  label: 'Conceito' },
  { value: 'poomse',    label: 'Poomse' },
]

const EMPTY_DRAFT: CustomVocabDraft = {
  korean: '',
  romanized: '',
  portuguese: '',
  category: 'tecnica',
  beltId: belts[0]?.id ?? 'branca',
  notes: '',
}

// ── Vocab Form ────────────────────────────────────────────────────────────────

function VocabForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: CustomVocabDraft
  onSave: (draft: CustomVocabDraft) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState<CustomVocabDraft>(initial)

  const field = (key: keyof CustomVocabDraft, value: string) =>
    setDraft((d) => ({ ...d, [key]: value }))

  const valid = draft.korean.trim() && draft.romanized.trim() && draft.portuguese.trim()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-card dark:shadow-card-dark p-4 flex flex-col gap-3"
    >
      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
        {initial.korean ? 'Editar cartão' : 'Novo cartão'}
      </h3>

      {/* Korean */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Coreano (Hangul)</span>
        <input
          value={draft.korean}
          onChange={(e) => field('korean', e.target.value)}
          placeholder="예: 차렷"
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
        />
      </label>

      {/* Romanized */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Romanização</span>
        <input
          value={draft.romanized}
          onChange={(e) => field('romanized', e.target.value)}
          placeholder="예: Charyeot"
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
        />
      </label>

      {/* Portuguese */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Português</span>
        <input
          value={draft.portuguese}
          onChange={(e) => field('portuguese', e.target.value)}
          placeholder="예: Posição de atenção"
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
        />
      </label>

      {/* Category + Belt row */}
      <div className="flex gap-2">
        <label className="flex-1 flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Categoria</span>
          <select
            value={draft.category}
            onChange={(e) => field('category', e.target.value)}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>

        <label className="flex-1 flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Faixa</span>
          <select
            value={draft.beltId}
            onChange={(e) => field('beltId', e.target.value)}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            {belts.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Notes */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Notas (opcional)</span>
        <textarea
          value={draft.notes ?? ''}
          onChange={(e) => field('notes', e.target.value)}
          rows={2}
          placeholder="Dica de estudo ou contexto…"
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
        />
      </label>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button variant="secondary" size="sm" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => valid && onSave(draft)}
          disabled={!valid}
          className="flex-1"
        >
          Guardar
        </Button>
      </div>
    </motion.div>
  )
}

// ── Card Row ──────────────────────────────────────────────────────────────────

function CustomCardRow({
  card,
  onEdit,
  onDelete,
}: {
  card: CustomVocab
  onEdit: () => void
  onDelete: () => void
}) {
  const belt = belts.find((b) => b.id === card.beltId)
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">{card.korean}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">{card.romanized}</span>
          <Badge color="accent" className="text-[10px]">{card.portuguese}</Badge>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: belt?.color ?? '#94a3b8' }}
          />
          <span className="text-[10px] text-gray-400 dark:text-gray-500">{belt?.name}</span>
          <span className="text-[10px] text-gray-300 dark:text-gray-600">·</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500">
            {CATEGORIES.find((c) => c.value === card.category)?.label}
          </span>
        </div>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={onEdit}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/30 transition-colors"
          aria-label="Editar"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          aria-label="Eliminar"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

type FormMode = { type: 'add' } | { type: 'edit'; id: string } | null

export function InstructorPage() {
  const { cards, addCard, updateCard, deleteCard, getAllCards } = useCustomVocabStore()
  const [formMode, setFormMode] = useState<FormMode>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const importRef = useRef<HTMLInputElement>(null)

  const allCards = getAllCards()

  // Group by belt order
  const cardsByBelt = belts.map((belt) => ({
    belt,
    items: allCards.filter((c) => c.beltId === belt.id),
  })).filter((g) => g.items.length > 0)

  function handleSave(draft: CustomVocabDraft) {
    if (formMode?.type === 'add') {
      addCard(draft)
    } else if (formMode?.type === 'edit') {
      updateCard(formMode.id, draft)
    }
    setFormMode(null)
  }

  function getDraftForEdit(id: string): CustomVocabDraft {
    const c = cards[id]
    if (!c) return EMPTY_DRAFT
    return {
      korean: c.korean,
      romanized: c.romanized,
      portuguese: c.portuguese,
      category: c.category,
      beltId: c.beltId,
      notes: c.notes ?? '',
    }
  }

  // ── Export ────────────────────────────────────────────────────────────────

  function handleExport() {
    const data = JSON.stringify({ customVocab: allCards }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tkd-custom-vocab-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Import ────────────────────────────────────────────────────────────────

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as { customVocab?: CustomVocab[] }
        const incoming = parsed.customVocab
        if (!Array.isArray(incoming)) {
          alert('Ficheiro inválido: campo "customVocab" não encontrado.')
          return
        }
        let imported = 0
        for (const card of incoming) {
          if (!card.korean || !card.romanized || !card.portuguese || !card.beltId || !card.category) continue
          addCard({
            korean: card.korean,
            romanized: card.romanized,
            portuguese: card.portuguese,
            category: card.category,
            beltId: card.beltId,
            notes: card.notes,
          })
          imported++
        }
        alert(`${imported} cartão(ões) importado(s) com sucesso.`)
      } catch {
        alert('Erro ao ler o ficheiro. Certifica-te que é um JSON válido.')
      }
    }
    reader.readAsText(file)
    // Reset so the same file can be re-imported
    e.target.value = ''
  }

  return (
    <div className="px-4 pt-4 pb-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-50">
            Modo Instrutor
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Cria e gere cartões de vocabulário personalizados.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setFormMode({ type: 'add' })}
        >
          + Novo
        </Button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {formMode && (
          <VocabForm
            key="form"
            initial={formMode.type === 'edit' ? getDraftForEdit(formMode.id) : EMPTY_DRAFT}
            onSave={handleSave}
            onCancel={() => setFormMode(null)}
          />
        )}
      </AnimatePresence>

      {/* Export / Import */}
      <div className="flex gap-2">
        <button
          onClick={handleExport}
          disabled={allCards.length === 0}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Exportar JSON
        </button>
        <button
          onClick={() => importRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Importar JSON
        </button>
        <input
          ref={importRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleImport}
        />
      </div>

      {/* Card list */}
      {allCards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <span className="text-4xl">📝</span>
          <p className="font-bold text-gray-700 dark:text-gray-300">Nenhum cartão criado</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
            Toca em "Novo" para adicionar vocabulário personalizado que aparecerá nos teus baralhos de estudo.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {cardsByBelt.map(({ belt, items }) => (
            <div key={belt.id}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: belt.color }}
                />
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {belt.namePt}
                </h3>
                <span className="text-xs text-gray-300 dark:text-gray-600">({items.length})</span>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card dark:shadow-card-dark px-4">
                {items.map((card) => (
                  <CustomCardRow
                    key={card.id}
                    card={card}
                    onEdit={() => setFormMode({ type: 'edit', id: card.id })}
                    onDelete={() => setConfirmDeleteId(card.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      <AnimatePresence>
        {confirmDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50"
            onClick={() => setConfirmDeleteId(null)}
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl p-5 flex flex-col gap-3"
            >
              <p className="font-bold text-gray-900 dark:text-gray-100">Eliminar cartão?</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                "{cards[confirmDeleteId]?.korean}" será removido permanentemente.
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setConfirmDeleteId(null)} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => { deleteCard(confirmDeleteId); setConfirmDeleteId(null) }}
                  className="flex-1"
                >
                  Eliminar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
