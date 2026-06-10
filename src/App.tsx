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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-blue-700 border-t-transparent animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Chargement du questionnaire…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
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

      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold select-none">
            Ψ
          </div>
          <span className="font-semibold text-slate-200 tracking-wide text-sm uppercase">
            Diagnostic Psychomage
          </span>
          {profile && (
            <span className="text-xs text-slate-400">
              {profile.patient} · {profile.psychomage}
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <span title="Synchronisé avec la base de données" className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <button
            onClick={() => setEditorOpen(true)}
            title="Modifier le questionnaire"
            className="text-slate-500 hover:text-slate-200 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
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
