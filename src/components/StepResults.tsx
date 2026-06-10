import type { Letter, Branch, Question } from '../data/questions'
import { computeStats, BRANCH_LABELS, LETTER_LABELS } from '../data/questions'
import type { Profile } from '../App'

interface Props {
  profile: Profile
  branch: Branch
  answers: Record<string, Letter>
  chosenScenario: number | null
  scenarios: Question[]
  onRestart: () => void
}

const LETTER_COLORS: Record<Letter, string> = {
  A: '#3b82f6',
  B: '#22c55e',
  C: '#eab308',
  D: '#f97316',
  E: '#ef4444',
}

export default function StepResults({ profile, branch, answers, chosenScenario, scenarios, onRestart }: Props) {
  const bl = BRANCH_LABELS[branch]
  const { percentages, total } = computeStats(answers)

  const letters: Letter[] = ['A', 'B', 'C', 'D', 'E']
  const dominant = letters.reduce((a, b) => percentages[a] >= percentages[b] ? a : b)

  const scenarioAnswer = chosenScenario !== null ? answers[scenarios[chosenScenario]?.id] : undefined

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-xs text-slate-400 uppercase tracking-widest">Bilan final</p>
        <h2 className="text-2xl font-bold text-slate-100">Rapport de diagnostic</h2>
      </div>

      {/* Header card */}
      <div className="bg-purple-950/60 border border-purple-800/30 rounded-xl p-5 space-y-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <p className="text-xs text-purple-300/50 uppercase">Patient</p>
            <p className="text-slate-100 font-semibold">{profile.patient}</p>
          </div>
          <div>
            <p className="text-xs text-purple-300/50 uppercase">Psychomage</p>
            <p className="text-slate-100 font-semibold">{profile.psychomage}</p>
          </div>
          <div>
            <p className="text-xs text-purple-300/50 uppercase">Profil de base</p>
            <p className="text-slate-100 font-semibold">
              {profile.nature === 'sorcier' ? 'Sorcier' : 'Créature Magique'}
            </p>
          </div>
          <div>
            <p className="text-xs text-purple-300/50 uppercase">Route assignée</p>
            <p className="font-bold" style={{ color: bl.color }}>{bl.label}</p>
          </div>
        </div>

        <div
          className="rounded-lg px-4 py-3"
          style={{ backgroundColor: bl.color + '18', borderLeft: `3px solid ${bl.color}` }}
        >
          <span className="text-sm font-medium" style={{ color: bl.color }}>{bl.description}</span>
        </div>
      </div>

      {/* Global metrics */}
      <div className="bg-purple-950/60 border border-purple-800/30 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-300">Métriques Globales de Personnalité</p>
          <p className="text-xs text-purple-300/50">{total} réponses</p>
        </div>
        <div className="space-y-3">
          {letters.map(letter => (
            <div key={letter} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: LETTER_COLORS[letter] }} />
                  <span className="font-bold" style={{ color: LETTER_COLORS[letter] }}>{letter}%</span>
                  {' '}{LETTER_LABELS[letter]}
                  {dominant === letter && (
                    <span className="ml-1 bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded text-xs">dominant</span>
                  )}
                </span>
                <span className="text-slate-200 font-mono font-semibold">{percentages[letter]}%</span>
              </div>
              <div className="h-2.5 bg-purple-900/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${percentages[letter]}%`, backgroundColor: LETTER_COLORS[letter] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chosen scenario */}
      {chosenScenario !== null && scenarios[chosenScenario] && (
        <div className="bg-purple-950/60 border border-purple-800/30 rounded-xl p-5 space-y-2">
          <p className="text-xs text-purple-300/50 uppercase tracking-widest">Mise en situation choisie</p>
          <p className="text-sm text-slate-300">Scénario {chosenScenario + 1}</p>
          <p className="text-xs text-slate-400 italic">{scenarios[chosenScenario].text}</p>
          {scenarioAnswer && (
            <div className="pt-1">
              <span className="text-xs text-purple-300/50">Réponse : </span>
              <span className="text-sm font-bold" style={{ color: LETTER_COLORS[scenarioAnswer] }}>
                {scenarioAnswer}
              </span>
              <span className="text-xs text-slate-400 ml-1">— {LETTER_LABELS[scenarioAnswer]}</span>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="w-full py-3 border border-purple-700/40 hover:border-purple-600/60 text-slate-400 hover:text-slate-200 font-medium rounded-xl transition-colors text-sm"
      >
        ↺ Nouveau diagnostic
      </button>
    </div>
  )
}
