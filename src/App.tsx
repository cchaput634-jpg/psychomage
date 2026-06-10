import { useState } from 'react'
import StepInit from './components/StepInit'
import StepQuestions from './components/StepQuestions'
import StepIntermediate from './components/StepIntermediate'
import StepBranch from './components/StepBranch'
import StepScenario from './components/StepScenario'
import StepResults from './components/StepResults'
import type { Letter, Branch } from './data/questions'
import {
  TRONC_COMMUN,
  MODULE_CREATURE,
  BRANCHES,
  SCENARIOS,
  determineBranch,
} from './data/questions'

export type Nature = 'sorcier' | 'creature'

export interface Profile {
  psychomage: string
  patient: string
  nature: Nature
}

type Step = 'init' | 'tronc' | 'intermediate' | 'branch' | 'scenario' | 'results'

export default function App() {
  const [step, setStep] = useState<Step>('init')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [answers, setAnswers] = useState<Record<string, Letter>>({})
  const [branch, setBranch] = useState<Branch | null>(null)
  const [chosenScenario, setChosenScenario] = useState<number | null>(null)

  const troncQuestions =
    profile?.nature === 'creature'
      ? [...TRONC_COMMUN, ...MODULE_CREATURE]
      : TRONC_COMMUN

  function handleInit(p: Profile) {
    setProfile(p)
    setStep('tronc')
  }

  function handleTroncDone(newAnswers: Record<string, Letter>) {
    const merged = { ...answers, ...newAnswers }
    setAnswers(merged)
    const det = determineBranch(merged)
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
    setAnswers(prev => ({ ...prev, [SCENARIOS[idx].id]: answer }))
    setStep('results')
  }

  function handleRestart() {
    setStep('init')
    setProfile(null)
    setAnswers({})
    setBranch(null)
    setChosenScenario(null)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-sm font-bold select-none">
            Ψ
          </div>
          <span className="font-semibold text-slate-200 tracking-wide text-sm uppercase">
            Diagnostic Psychomage
          </span>
          {profile && (
            <span className="ml-auto text-xs text-slate-400">
              {profile.patient} · {profile.psychomage}
            </span>
          )}
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
                ? 'Tronc Commun (12 questions) + Module Créatures Magiques (5 questions)'
                : 'Tronc Commun — 12 questions'
            }
            onDone={handleTroncDone}
          />
        )}

        {step === 'intermediate' && branch && (
          <StepIntermediate
            answers={answers}
            branch={branch}
            onContinue={handleIntermediateDone}
          />
        )}

        {step === 'branch' && branch && (
          <StepBranch
            branch={branch}
            questions={BRANCHES[branch]}
            onDone={handleBranchDone}
          />
        )}

        {step === 'scenario' && (
          <StepScenario scenarios={SCENARIOS} onDone={handleScenarioDone} />
        )}

        {step === 'results' && profile && branch && (
          <StepResults
            profile={profile}
            branch={branch}
            answers={answers}
            chosenScenario={chosenScenario}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  )
}
