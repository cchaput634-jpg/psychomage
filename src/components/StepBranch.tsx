import type { Question, Letter, Branch } from '../data/questions'
import { BRANCH_LABELS } from '../data/questions'
import StepQuestions from './StepQuestions'

interface Props {
  branch: Branch
  questions: Question[]
  onDone: (answers: Record<string, Letter>) => void
}

export default function StepBranch({ branch, questions, onDone }: Props) {
  const bl = BRANCH_LABELS[branch]

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl border px-4 py-3 flex items-center gap-3"
        style={{ borderColor: bl.color + '60', backgroundColor: bl.color + '10' }}
      >
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bl.color }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: bl.color }}>{bl.label}</p>
          <p className="text-xs text-slate-400">{bl.description}</p>
        </div>
      </div>

      <StepQuestions
        questions={questions}
        title={bl.label}
        subtitle={`Questions spécifiques — ${questions.length} questions`}
        onDone={onDone}
      />
    </div>
  )
}
