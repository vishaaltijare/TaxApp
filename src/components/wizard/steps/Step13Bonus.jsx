import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'

const BONUS_OPTIONS = [
  { value: 'yes', icon: '🎁', label: 'Yes, I expect a bonus', description: 'Performance bonus, joining bonus, variable pay, etc.' },
  { value: 'no', icon: '🚫', label: 'No, no bonus', description: 'My salary is entirely fixed' },
]

const FAQS_BONUS = [
  { q: 'Is bonus taxed differently?', a: 'No, your bonus is simply added to your total taxable income and taxed according to your applicable slab rate. It does not have a special tax rate.' },
  { q: 'Should I enter gross or net bonus?', a: 'Enter the Gross Bonus (before any TDS deduction). This gives the most accurate total tax picture.' },
]

export default function Step13Bonus({ onNext, onBack }) {
  const { hasBonus, bonusAnnual, setField } = useTaxStore()
  const [error, setError] = useState('')

  const showAmountInput = hasBonus === true

  const amountNum = Number(bonusAnnual)
  const amountValid = showAmountInput 
    ? bonusAnnual !== '' && amountNum >= 1 && amountNum <= 10000000 
    : true

  const isValid = hasBonus !== null && amountValid

  const handleChange = (v) => {
    setField('bonusAnnual', v)
    const n = Number(v)
    if (v !== '' && n < 1) setError('Enter a valid amount')
    else setError('')
  }

  const handleChoice = (val) => {
    const boolVal = val === 'yes'
    setField('hasBonus', boolVal)
    if (!boolVal) setField('bonusAnnual', '')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 12 of 13 — Bonus</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Will you receive any bonus or variable pay?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Bonuses are fully taxable, but can be offset with proper investments.
        </p>
        <p className="text-brand-muted mt-2 text-sm">
          Bonuses are fully taxable and can push you into a higher tax bracket.
        </p>
      </div>

      <RadioGroup
        name="has-bonus"
        options={BONUS_OPTIONS}
        value={hasBonus === true ? 'yes' : hasBonus === false ? 'no' : null}
        onChange={handleChoice}
      />

      {showAmountInput && (
        <div className="mt-6 animate-fade-in">
          <div className="h-px bg-brand-border mb-6" />
          <h3 className="text-lg font-bold text-brand-text mb-1">Total Annual Bonus</h3>
          <p className="text-brand-muted text-sm mb-4">
            Enter the <strong>Gross Bonus</strong> amount you expect to receive in this financial year (Apr 2025 - Mar 2026).
          </p>
          <CurrencyInput
            id="bonus-annual"
            value={bonusAnnual}
            onChange={handleChange}
            placeholder="2,00,000"
            error={error}
            min={1}
            max={10000000}
          />
        </div>
      )}

      <FaqAccordion faqs={FAQS_BONUS} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step13-next"
          className="btn-primary flex-1"
          disabled={!isValid}
          onClick={onNext}
        >
          Calculate Tax →
        </button>
      </div>
    </div>
  )
}
