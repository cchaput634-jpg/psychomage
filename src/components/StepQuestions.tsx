import { useState } from 'react'
import type { Question, Letter } from '../data/questions'

interface Props {
  questions: Question[]
  title: string
  subtitle: string
  onDone: (answers: Record<string, Letter>) => void
}

export default function StepQuestions({ questions, title, subtitle, onDone }: Props) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Letter>>({})

  const q = questions[current]
  const progress = Math.round(((current) / questions.length) * 100)
  const selected = answers[q.id]

  function handleSelect(letter: Letter) {
    setAnswers(prev => ({ ...prev, [q.id]: letter }))
  }

  function handleNext() {
    if (!selected) return
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
    } else {
      onDone(answers)
    }
  }

  function handlePrev() {
    if (current > 0) setCurrent(c => c - 1)
  }

  const isLast = current + 1 === questions.length

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{title}</span>
          <span>{current + 1} / {questions.length}</span>
        </div>
        <div className="h-1.5 bg-[#1a0a2e]/75 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-purple-300/50">{subtitle}</p>
      </div>

      <div className="bg-[#1a0a2e]/85 border border-purple-800/30 rounded-xl p-6 space-y-5">
        <p className="text-slate-100 font-medium leading-relaxed">
          <span className="text-purple-300/50 mr-2 text-sm">Q{current + 1}.</span>
          {q.text}
        </p>

        <div className="space-y-2">
          {q.options.map(opt => (
            <button
              key={opt.letter}
              type="button"
              onClick={() => handleSelect(opt.letter)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex gap-3 items-start ${
                selected === opt.letter
                  ? 'border-blue-500 bg-blue-600/20 text-blue-100'
                  : 'border-purple-700/40 bg-[#1a0a2e]/45 text-slate-300 hover:border-purple-600/60 hover:bg-[#1a0a2e]/75'
              }`}
            >
              <span className={`font-bold shrink-0 w-5 ${selected === opt.letter ? 'text-blue-400' : 'text-purple-300/50'}`}>
                {opt.letter}.
              </span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {current > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="px-5 py-2.5 rounded-xl border border-purple-700/40 text-slate-400 hover:border-purple-600/60 text-sm transition-colors"
          >
            ← Précédent
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={!selected}
          className="ml-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-purple-300/50 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          {isLast ? 'Valider →' : 'Suivant →'}
        </button>
      </div>
    </div>
  )
}
