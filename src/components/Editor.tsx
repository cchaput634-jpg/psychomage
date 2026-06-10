import { useState } from 'react'
import type { Question } from '../data/questions'
import type { SectionKey, QuestionBank } from '../lib/useQuestions'
import { SECTION_LABELS } from '../lib/useQuestions'

interface Props {
  bank: QuestionBank
  onUpdateQuestion: (section: SectionKey, id: string, updated: Question) => void
  onDeleteQuestion: (section: SectionKey, id: string) => void
  onAddQuestion: (section: SectionKey) => string
  onMoveQuestion: (section: SectionKey, id: string, dir: 'up' | 'down') => void
  onMoveToSection: (from: SectionKey, id: string, to: SectionKey) => void
  onReset: () => void
  onClose: () => void
}

const SECTION_COLORS: Record<SectionKey, string> = {
  tronc: '#3b82f6',
  creature: '#a855f7',
  verte: '#16a34a',
  jaune: '#ca8a04',
  rouge: '#dc2626',
  scenarios: '#0891b2',
}

const ALL_SECTIONS = Object.keys(SECTION_LABELS) as SectionKey[]

// ---------- Question edit modal ----------
function QuestionEditModal({
  question,
  onSave,
  onClose,
}: {
  question: Question
  onSave: (q: Question) => void
  onClose: () => void
}) {
  const [text, setText] = useState(question.text)
  const [options, setOptions] = useState(question.options.map(o => ({ ...o })))

  function setOptionText(i: number, val: string) {
    setOptions(prev => prev.map((o, idx) => idx === i ? { ...o, text: val } : o))
  }

  function addOption() {
    const letters = ['A', 'B', 'C', 'D', 'E'] as const
    const next = letters[options.length] ?? 'E'
    setOptions(prev => [...prev, { letter: next, text: '' }])
  }

  function removeOption(i: number) {
    if (options.length <= 2) return
    setOptions(prev => prev.filter((_, idx) => idx !== i))
  }

  function handleSave() {
    if (!text.trim()) return
    onSave({ ...question, text: text.trim(), options })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-[#1a0a2e]/85 border border-purple-700/40 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-purple-800/30">
          <h3 className="font-semibold text-slate-100 text-sm">Modifier la question</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-lg leading-none">✕</button>
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 uppercase tracking-widest">Texte de la question</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              rows={3}
              className="w-full bg-[#1a0a2e]/75 border border-purple-700/40 text-slate-100 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-slate-400 uppercase tracking-widest">Réponses</label>
              {options.length < 5 && (
                <button
                  onClick={addOption}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  + Ajouter
                </button>
              )}
            </div>
            {options.map((opt, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-xs font-bold text-purple-300/50 w-5 shrink-0">{opt.letter}.</span>
                <input
                  type="text"
                  value={opt.text}
                  onChange={e => setOptionText(i, e.target.value)}
                  className="flex-1 bg-[#1a0a2e]/75 border border-purple-700/40 text-slate-100 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button
                  onClick={() => removeOption(i)}
                  disabled={options.length <= 2}
                  className="text-purple-400/40 hover:text-red-400 disabled:opacity-20 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 px-5 py-4 border-t border-purple-800/30">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-purple-700/40 text-slate-400 hover:text-slate-200 rounded-xl text-sm transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="flex-1 py-2 bg-blue-700 hover:bg-blue-600 disabled:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- Question row ----------
function QuestionRow({
  question,
  index,
  total,
  section,
  onEdit,
  onDelete,
  onMove,
  onMoveTo,
}: {
  question: Question
  index: number
  total: number
  section: SectionKey
  onEdit: () => void
  onDelete: () => void
  onMove: (dir: 'up' | 'down') => void
  onMoveTo: (to: SectionKey) => void
}) {
  const [moveOpen, setMoveOpen] = useState(false)

  return (
    <div className="bg-[#1a0a2e]/60 border border-purple-700/30 rounded-lg px-3 py-2.5 group">
      <div className="flex items-start gap-2">
        {/* Order arrows */}
        <div className="flex flex-col gap-0.5 shrink-0 pt-0.5">
          <button
            onClick={() => onMove('up')}
            disabled={index === 0}
            className="text-purple-400/40 hover:text-slate-300 disabled:opacity-20 text-xs leading-none"
            title="Monter"
          >▲</button>
          <button
            onClick={() => onMove('down')}
            disabled={index === total - 1}
            className="text-purple-400/40 hover:text-slate-300 disabled:opacity-20 text-xs leading-none"
            title="Descendre"
          >▼</button>
        </div>

        {/* Question text */}
        <p className="flex-1 text-sm text-slate-300 leading-snug line-clamp-2">{question.text}</p>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Move to section */}
          <div className="relative">
            <button
              onClick={() => setMoveOpen(v => !v)}
              title="Déplacer vers une section"
              className="text-xs px-1.5 py-1 rounded bg-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-600 transition-colors"
            >
              ↪
            </button>
            {moveOpen && (
              <div className="absolute right-0 top-7 z-20 bg-[#1a0a2e]/75 border border-purple-700/40 rounded-lg shadow-xl w-52 py-1">
                {ALL_SECTIONS.filter(s => s !== section).map(s => (
                  <button
                    key={s}
                    onClick={() => { onMoveTo(s); setMoveOpen(false) }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-purple-700/40 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: SECTION_COLORS[s] }} />
                    {SECTION_LABELS[s]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onEdit}
            title="Modifier"
            className="text-xs px-1.5 py-1 rounded bg-slate-700 text-slate-400 hover:text-blue-300 hover:bg-blue-900/40 transition-colors"
          >
            ✎
          </button>
          <button
            onClick={onDelete}
            title="Supprimer"
            className="text-xs px-1.5 py-1 rounded bg-slate-700 text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Options preview */}
      <div className="mt-1.5 ml-6 flex flex-wrap gap-1">
        {question.options.map(o => (
          <span key={o.letter} className="text-xs bg-slate-700/60 text-purple-300/50 px-1.5 py-0.5 rounded">
            {o.letter}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------- Section panel ----------
function SectionPanel({
  sectionKey,
  questions,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddQuestion,
  onMoveQuestion,
  onMoveToSection,
}: {
  sectionKey: SectionKey
  questions: Question[]
  onUpdateQuestion: (id: string, q: Question) => void
  onDeleteQuestion: (id: string) => void
  onAddQuestion: () => void
  onMoveQuestion: (id: string, dir: 'up' | 'down') => void
  onMoveToSection: (id: string, to: SectionKey) => void
}) {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const color = SECTION_COLORS[sectionKey]
  const editingQ = editingId ? questions.find(q => q.id === editingId) : null

  return (
    <div className="border border-purple-800/30 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-[#1a0a2e]/85 hover:bg-[#1a0a2e]/75 transition-colors text-left"
      >
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="flex-1 font-medium text-slate-200 text-sm">{SECTION_LABELS[sectionKey]}</span>
        <span className="text-xs text-purple-300/50">{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
        <span className="text-purple-300/50 text-xs ml-1">{open ? '▲' : '▼'}</span>
      </button>

      {/* Questions list */}
      {open && (
        <div className="bg-[#1a0a2e]/85/50 px-3 pb-3 space-y-2 pt-2">
          {questions.length === 0 && (
            <p className="text-xs text-purple-400/40 italic text-center py-3">Aucune question dans cette section.</p>
          )}
          {questions.map((q, i) => (
            <QuestionRow
              key={q.id}
              question={q}
              index={i}
              total={questions.length}
              section={sectionKey}
              onEdit={() => setEditingId(q.id)}
              onDelete={() => onDeleteQuestion(q.id)}
              onMove={dir => onMoveQuestion(q.id, dir)}
              onMoveTo={to => onMoveToSection(q.id, to)}
            />
          ))}
          <button
            onClick={onAddQuestion}
            className="w-full py-2 border border-dashed border-purple-700/40 text-purple-300/50 hover:text-slate-300 hover:border-purple-500/60 rounded-lg text-xs transition-colors"
          >
            + Ajouter une question
          </button>
        </div>
      )}

      {/* Edit modal */}
      {editingQ && (
        <QuestionEditModal
          question={editingQ}
          onSave={updated => { onUpdateQuestion(editingQ.id, updated); setEditingId(null) }}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  )
}

// ---------- Main Editor ----------
export default function Editor({
  bank,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddQuestion,
  onMoveQuestion,
  onMoveToSection,
  onReset,
  onClose,
}: Props) {
  const [confirmReset, setConfirmReset] = useState(false)

  const totalQuestions = ALL_SECTIONS.reduce((sum, s) => sum + bank[s].length, 0)

  return (
    <div className="fixed inset-0 z-40 bg-slate-950 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-purple-800/30 bg-slate-950/95 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-sm flex items-center gap-1.5 transition-colors"
          >
            ← Retour
          </button>
          <span className="text-slate-700">|</span>
          <span className="font-semibold text-slate-200 text-sm">Éditeur de questionnaire</span>
          <span className="ml-auto text-xs text-purple-300/50">{totalQuestions} questions au total</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
        {/* Info banner */}
        <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl px-4 py-3 text-xs text-blue-300">
          Les modifications sont sauvegardées automatiquement dans le navigateur (localStorage). Survolez une question pour voir les options d'édition.
        </div>

        {/* Section panels */}
        {ALL_SECTIONS.map(s => (
          <SectionPanel
            key={s}
            sectionKey={s}
            questions={bank[s]}
            onUpdateQuestion={(id, q) => onUpdateQuestion(s, id, q)}
            onDeleteQuestion={id => onDeleteQuestion(s, id)}
            onAddQuestion={() => onAddQuestion(s)}
            onMoveQuestion={(id, dir) => onMoveQuestion(s, id, dir)}
            onMoveToSection={(id, to) => onMoveToSection(s, id, to)}
          />
        ))}

        {/* Reset */}
        <div className="pt-4 border-t border-purple-800/30">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="text-sm text-purple-300/50 hover:text-red-400 transition-colors"
            >
              Réinitialiser aux questions par défaut
            </button>
          ) : (
            <div className="bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-3 space-y-3">
              <p className="text-sm text-red-300">Toutes vos modifications seront perdues. Confirmer ?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-4 py-2 border border-purple-700/40 text-slate-400 rounded-lg text-sm hover:text-slate-200"
                >
                  Annuler
                </button>
                <button
                  onClick={() => { onReset(); setConfirmReset(false) }}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm font-semibold"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
