import { useState } from 'react'
import type { Profile, Nature } from '../App'

const PSYCHOMAGES = ['Alice', 'Azrael', 'Noctyl', 'Sally', 'Autre']

interface Props {
  onDone: (profile: Profile) => void
}

export default function StepInit({ onDone }: Props) {
  const [psychomage, setPsychomage] = useState('')
  const [patient, setPatient] = useState('')
  const [nature, setNature] = useState<Nature | ''>('')

  const canSubmit = psychomage && patient.trim() && nature

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onDone({ psychomage, patient: patient.trim(), nature: nature as Nature })
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-100">Diagnostic Psychomage</h1>
        <p className="text-slate-400 text-sm">Initialisation du profil patient</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#1a0a2e]/85 border border-purple-800/30 rounded-xl p-6 space-y-5">

          {/* Psychomage */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Psychomage <span className="text-red-400">*</span>
            </label>
            <select
              value={psychomage}
              onChange={e => setPsychomage(e.target.value)}
              className="w-full bg-[#1a0a2e]/75 border border-purple-700/40 text-slate-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">— Sélectionner un Psychomage —</option>
              {PSYCHOMAGES.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Nom Patient */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Nom du patient <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={patient}
              onChange={e => setPatient(e.target.value)}
              placeholder="Entrez le nom du patient"
              className="w-full bg-[#1a0a2e]/75 border border-purple-700/40 text-slate-100 rounded-lg px-3 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Nature */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              Nature <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['sorcier', 'creature'] as Nature[]).map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNature(n)}
                  className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                    nature === n
                      ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                      : 'border-purple-700/40 bg-[#1a0a2e]/75 text-slate-400 hover:border-purple-600/60'
                  }`}
                >
                  {n === 'sorcier' ? '🧙 Sorcier' : '✨ Créature Magique'}
                </button>
              ))}
            </div>
            {nature === 'creature' && (
              <p className="text-xs text-amber-400 bg-amber-900/20 border border-amber-800/40 rounded-lg px-3 py-2">
                Module exclusif de 5 questions supplémentaires activé.
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full py-3 bg-blue-700 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-purple-300/50 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Commencer le questionnaire →
        </button>
      </form>
    </div>
  )
}
