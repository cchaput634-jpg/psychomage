import { useState } from 'react'
import type { Question, Letter } from '../data/questions'

interface Props {
  scenarios: Question[]
  onDone: (scenarioIndex: number, answer: Letter) => void
}

export default function StepScenario({ scenarios, onDone }: Props) {
  const [chosen, setChosen] = useState<number | null>(null)
  const [answer, setAnswer] = useState<Letter | null>(null)

  function handleSubmit() {
    if (chosen === null || !answer) return
    onDone(chosen, answer)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <p className="text-xs text-slate-400 uppercase tracking-widest">Mise en situation</p>
        <h2 className="text-2xl font-bold text-slate-100">Choisissez un scénario</h2>
        <p className="text-sm text-slate-400">Sélectionnez un seul scénario et répondez-y.</p>
      </div>

      {/* Scenario selector */}
      <div className="space-y-3">
        {scenarios.map((sc, i) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => { setChosen(i); setAnswer(null) }}
            className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all ${
              chosen === i
                ? 'border-purple-500 bg-purple-600/10 text-slate-100'
                : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
            }`}
          >
            <span className={`font-bold mr-2 ${chosen === i ? 'text-purple-400' : 'text-slate-500'}`}>
              Scénario {i + 1}.
            </span>
            {sc.text}
          </button>
        ))}
      </div>

      {/* Answer for chosen scenario */}
      {chosen !== null && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <p className="text-xs text-slate-500 uppercase tracking-widest">Votre réponse</p>
          <div className="space-y-2">
            {scenarios[chosen].options.map(opt => (
              <button
                key={opt.letter}
                type="button"
                onClick={() => setAnswer(opt.letter)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex gap-3 items-start ${
                  answer === opt.letter
                    ? 'border-purple-500 bg-purple-600/20 text-purple-100'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <span className={`font-bold shrink-0 w-5 ${answer === opt.letter ? 'text-purple-400' : 'text-slate-500'}`}>
                  {opt.letter}.
                </span>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={chosen === null || !answer}
        className="w-full py-3 bg-purple-700 hover:bg-purple-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl transition-colors text-sm"
      >
        Valider et voir les résultats →
      </button>
    </div>
  )
}
