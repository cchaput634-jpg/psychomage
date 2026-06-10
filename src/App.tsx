import { useState } from 'react'
import StepInit from './components/StepInit'
import StepQuestions from './components/StepQuestions'
import StepIntermediate from './components/StepIntermediate'
import StepBranch from './components/StepBranch'
import StepScenario from './components/StepScenario'
import StepResults from './components/StepResults'
import Editor from './components/Editor'
import type { Letter, Branch } from './data/questions'
import { determineBranch } from './data/questions'
import { useQuestions } from './lib/useQuestions'

export type Nature = 'sorcier' | 'creature'

export interface Profile {
  psychomage: string
  patient: string
  nature: Nature
}

type Step = 'init' | 'tronc' | 'intermediate' | 'branch' | 'scenario' | 'results'

export default function App() {
  const [step, setStep] = useState<Step>('init')
  const [editorOpen, setEditorOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [answers, setAnswers] = useState<Record<string, Letter>>({})
  const [branch, setBranch] = useState<Branch | null>(null)
  const [chosenScenario, setChosenScenario] = useState<number | null>(null)

  const {
    bank,
    status,
    updateQuestion,
    deleteQuestion,
    addQuestion,
    moveQuestion,
    moveToSection,
    resetToDefaults,
  } = useQuestions()

  const troncQuestions =
    profile?.nature === 'creature'
      ? [...bank.tronc, ...bank.creature]
      : bank.tronc

  function handleInit(p: Profile) {
    setProfile(p)
    setStep('tronc')
  }

  function handleTroncDone(newAnswers: Record<string, Letter>) {
    const merged = { ...answers, ...newAnswers }
    setAnswers(merged)
    const det = determineBranch(merged, bank.tronc)
    setBranch(det)
    setStep('intermediate')
  }

  function handleIntermediateDone() {
    setStep('branch')
  }

  function handleBranchDone(newAnswers: Record<string, Letter>) {
    setAnswers(prev => ({ ...prev, ...newAnswers }))
    setStep('scenario')
  }

  function handleScenarioDone(idx: number, answer: Letter) {
    setChosenScenario(idx)
    setAnswers(prev => ({ ...prev, [bank.scenarios[idx].id]: answer }))
    setStep('results')
  }

  function handleRestart() {
    setStep('init')
    setProfile(null)
    setAnswers({})
    setBranch(null)
    setChosenScenario(null)
  }

  const branchQuestions =
    branch === 'verte' ? bank.verte :
    branch === 'jaune' ? bank.jaune :
    branch === 'rouge' ? bank.rouge : []

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)' }}>
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: '#c084fc', borderTopColor: 'transparent' }} />
          <p className="text-purple-300 text-sm">Chargement du questionnaire…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-slate-100" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)' }}>
      {editorOpen && (
        <Editor
          bank={bank}
          onUpdateQuestion={updateQuestion}
          onDeleteQuestion={deleteQuestion}
          onAddQuestion={addQuestion}
          onMoveQuestion={moveQuestion}
          onMoveToSection={moveToSection}
          onReset={resetToDefaults}
          onClose={() => setEditorOpen(false)}
        />
      )}

      <header className="border-b sticky top-0 z-10 backdrop-blur" style={{ borderColor: 'rgba(192,132,252,0.2)', backgroundColor: 'rgba(26,10,46,0.85)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Psychomage"
            className="w-9 h-9 object-contain"
          />
          <span className="font-semibold tracking-wide text-sm uppercase" style={{ color: '#e9d5ff' }}>
            Diagnostic Psychomage
          </span>
          {profile && (
            <span className="text-xs text-purple-400">
              {profile.patient} · {profile.psychomage}
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <span title="Synchronisé avec la base de données" className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <button
            onClick={() => setEditorOpen(true)}
            title="Modifier le questionnaire"
            className="transition-colors p-1.5 rounded-lg"
            style={{ color: 'rgba(192,132,252,0.6)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e9d5ff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(192,132,252,0.6)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {step === 'init' && <StepInit onDone={handleInit} />}

        {step === 'tronc' && profile && (
          <StepQuestions
            questions={troncQuestions}
            title="Questionnaire Général"
            subtitle={
              profile.nature === 'creature'
                ? `Tronc Commun (${bank.tronc.length} questions) + Module Créatures Magiques (${bank.creature.length} questions)`
                : `Tronc Commun — ${bank.tronc.length} questions`
            }
            onDone={handleTroncDone}
          />
        )}

        {step === 'intermediate' && branch && (
          <StepIntermediate
            answers={answers}
            branch={branch}
            troncIds={new Set([...bank.tronc.map(q => q.id), ...bank.creature.map(q => q.id)])}
            onContinue={handleIntermediateDone}
          />
        )}

        {step === 'branch' && branch && (
          <StepBranch
            branch={branch}
            questions={branchQuestions}
            onDone={handleBranchDone}
          />
        )}

        {step === 'scenario' && (
          <StepScenario scenarios={bank.scenarios} onDone={handleScenarioDone} />
        )}

        {step === 'results' && profile && branch && (
          <StepResults
            profile={profile}
            branch={branch}
            answers={answers}
            chosenScenario={chosenScenario}
            scenarios={bank.scenarios}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  )
}
