import { useState, useEffect, useRef, useCallback } from 'react'
import type { Question } from '../data/questions'
import {
  TRONC_COMMUN,
  MODULE_CREATURE,
  BRANCHE_VERTE,
  BRANCHE_JAUNE,
  BRANCHE_ROUGE,
  SCENARIOS,
} from '../data/questions'

export type SectionKey =
  | 'tronc'
  | 'creature'
  | 'verte'
  | 'jaune'
  | 'rouge'
  | 'scenarios'

export interface QuestionBank {
  tronc: Question[]
  creature: Question[]
  verte: Question[]
  jaune: Question[]
  rouge: Question[]
  scenarios: Question[]
}

export const SECTION_LABELS: Record<SectionKey, string> = {
  tronc: 'Tronc Commun',
  creature: 'Module Créatures Magiques',
  verte: 'Branche Verte — Loyaliste',
  jaune: 'Branche Jaune — Ambivalent',
  rouge: 'Branche Rouge — Rupture',
  scenarios: 'Mises en Situation',
}

export const DEFAULTS: QuestionBank = {
  tronc: TRONC_COMMUN,
  creature: MODULE_CREATURE,
  verte: BRANCHE_VERTE,
  jaune: BRANCHE_JAUNE,
  rouge: BRANCHE_ROUGE,
  scenarios: SCENARIOS,
}

function generateId(): string {
  return 'q_' + Math.random().toString(36).slice(2, 9)
}

export type LoadStatus = 'loading' | 'ready' | 'error'

export function useQuestions() {
  const [bank, setBank] = useState<QuestionBank>(DEFAULTS)
  const [status, setStatus] = useState<LoadStatus>('loading')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstLoad = useRef(true)

  // Load from API on mount
  useEffect(() => {
    fetch('/api/questions')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<QuestionBank | null>
      })
      .then(data => {
        if (data) setBank(data)
        setStatus('ready')
      })
      .catch(() => {
        // API unavailable (local dev without wrangler) — fall back to defaults
        setStatus('ready')
      })
  }, [])

  // Auto-save to API whenever bank changes (debounced 800ms)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    if (status !== 'ready') return

    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      fetch('/api/questions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bank),
      }).catch(() => {
        // Silently ignore save errors in local dev
      })
    }, 800)

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [bank, status])

  const updateQuestion = useCallback((section: SectionKey, id: string, updated: Question) => {
    setBank(prev => ({
      ...prev,
      [section]: prev[section].map(q => q.id === id ? updated : q),
    }))
  }, [])

  const deleteQuestion = useCallback((section: SectionKey, id: string) => {
    setBank(prev => ({
      ...prev,
      [section]: prev[section].filter(q => q.id !== id),
    }))
  }, [])

  const addQuestion = useCallback((section: SectionKey) => {
    const newQ: Question = {
      id: generateId(),
      text: 'Nouvelle question…',
      options: [
        { letter: 'A', text: 'Réponse A' },
        { letter: 'B', text: 'Réponse B' },
        { letter: 'C', text: 'Réponse C' },
        { letter: 'D', text: 'Réponse D' },
        { letter: 'E', text: 'Réponse E' },
      ],
    }
    setBank(prev => ({ ...prev, [section]: [...prev[section], newQ] }))
    return newQ.id
  }, [])

  const moveQuestion = useCallback((section: SectionKey, id: string, direction: 'up' | 'down') => {
    setBank(prev => {
      const list = [...prev[section]]
      const idx = list.findIndex(q => q.id === id)
      if (idx === -1) return prev
      const target = direction === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= list.length) return prev
      ;[list[idx], list[target]] = [list[target], list[idx]]
      return { ...prev, [section]: list }
    })
  }, [])

  const moveToSection = useCallback((fromSection: SectionKey, id: string, toSection: SectionKey) => {
    setBank(prev => {
      const q = prev[fromSection].find(q => q.id === id)
      if (!q) return prev
      return {
        ...prev,
        [fromSection]: prev[fromSection].filter(q => q.id !== id),
        [toSection]: [...prev[toSection], { ...q, id: generateId() }],
      }
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    setBank(DEFAULTS)
  }, [])

  return {
    bank,
    status,
    updateQuestion,
    deleteQuestion,
    addQuestion,
    moveQuestion,
    moveToSection,
    resetToDefaults,
  }
}
