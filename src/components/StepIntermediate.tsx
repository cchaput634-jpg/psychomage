import type { Letter, Branch } from '../data/questions'
import { computeStats, BRANCH_LABELS, LETTER_LABELS } from '../data/questions'

interface Props {
  answers: Record<string, Letter>
  branch: Branch
  troncIds: Set<string>
  onContinue: () => void
}

const LETTER_COLORS: Record<Letter, string> = {
  A: '#3b82f6',
  B: '#22c55e',
  C: '#eab308',
  D: '#f97316',
  E: '#ef4444',
}

export default function StepIntermediate({ answers, branch, troncIds, onContinue }: Props) {
  const troncAnswers: Record<string, Letter> = {}
  for (const [k, v] of Object.entries(answers)) {
    if (troncIds.has(k)) troncAnswers[k] = v
  }

  const { percentages } = computeStats(troncAnswers)
  const bl = BRANCH_LABELS[branch]
  const letters: Letter[] = ['A', 'B', 'C', 'D', 'E']

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <p className="text-xs text-slate-400 uppercase tracking-widest">Analyse intermédiaire</p>
        <h2 className="text-2xl font-bold text-slate-100">Statistiques du Tronc Commun</h2>
      </div>

      <div
        className="rounded-xl border p-5 space-y-4"
        style={{ borderColor: bl.color + '60', backgroundColor: bl.color + '10' }}
      >
        <p className="text-sm font-medium" style={{ color: bl.color }}>Tendance détectée</p>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: bl.color }} />
          <span className="font-bold text-lg text-slate-100">{bl.label}</span>
          <span className="text-sm text-slate-400">— {bl.description}</span>
        </div>
        <p className="text-xs text-slate-400">
          Vous serez redirigé vers cette branche pour la suite du questionnaire.
        </p>
      </div>

      <div className="bg-[#1a0a2e]/85 border border-purple-800/30 rounded-xl p-5 space-y-4">
        <p className="text-sm font-medium text-slate-300">Répartition des réponses</p>
        <div className="space-y-3">
          {letters.map(letter => (
            <div key={letter} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">
                  <span className="font-bold" style={{ color: LETTER_COLORS[letter] }}>{letter}</span>
                  {' '}— {LETTER_LABELS[letter]}
                </span>
                <span className="text-slate-300 font-mono">{percentages[letter]}%</span>
              </div>
              <div className="h-2 bg-[#1a0a2e]/75 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentages[letter]}%`, backgroundColor: LETTER_COLORS[letter] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full py-3 font-semibold rounded-xl text-white text-sm transition-colors"
        style={{ backgroundColor: bl.color }}
      >
        Continuer vers {bl.label} →
      </button>
    </div>
  )
}
