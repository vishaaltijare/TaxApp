import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'
import { formatINR } from '../../../utils/formatters'

const EIGHTY_C_OPTIONS = [
  { value: 'yes', icon: '📈', label: 'Yes, I invest in 80C', description: 'ELSS, PPF, LIC, NSC, Tax Saver FD, etc.' },
  { value: 'no', icon: '🚫', label: 'No, I don\'t', description: 'No extra investments under 80C' },
]

const FAQS_80C = [
  { q: 'What falls under Section 80C?', a: 'Common ones include ELSS mutual funds, PPF, LIC premiums, tuition fees for children, 5-year fixed deposits, and the principal repayment of your home loan.' },
  { q: 'What is the maximum limit?', a: 'Section 80C has a maximum combined limit of ₹1,50,000 per year. Even if you invest more, the deduction is capped.' },
]

export default function Step980C({ onNext, onBack }) {
  const { has80C, investments80CAnnual, hasPF, basicSalaryMonthly, homeLoanType, setField } = useTaxStore()
  const [error, setError] = useState('')

  const showAmountInput = has80C === true

  const amountNum = Number(investments80CAnnual)
  // Max out at 1.5L for validation, or allow more but explain it's capped
  const amountValid = showAmountInput 
    ? investments80CAnnual !== '' && amountNum >= 1 && amountNum <= 1500000 
    : true

  const isValid = has80C !== null && amountValid

  const handleChange = (v) => {
    setField('investments80CAnnual', v)
    const n = Number(v)
    if (v !== '' && n < 1) setError('Enter a valid amount')
    else setError('') // We don't error on > 1.5L, we just cap it in calculation
  }

  const handleChoice = (val) => {
    let boolVal = null
    if (val === 'yes') boolVal = true
    if (val === 'no') boolVal = false
    
    setField('has80C', boolVal)
    if (val === 'no') setField('investments80CAnnual', '')
  }

  // Calculate existing 80C to show user
  const epfEst = hasPF && basicSalaryMonthly ? Math.round(Number(basicSalaryMonthly) * 0.12 * 12) : 0
  const hasHomeLoan = homeLoanType === 'self_occupied' || homeLoanType === 'rented_out'

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 8 of 13 — Investments</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Do you make other 80C investments?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          ELSS, Life Insurance, PPF, and other standard 80C investments.
        </p>
        <p className="text-brand-muted mt-2 text-sm">
          Things like ELSS Mutual Funds, PPF, LIC premiums, or children's tuition fees.
        </p>
      </div>

      {(epfEst > 0 || hasHomeLoan) && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm font-semibold text-blue-800 mb-2">Already in your 80C bucket:</p>
          <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
            {epfEst > 0 && <li>EPF Contribution (est. {formatINR(epfEst)}/yr)</li>}
            {hasHomeLoan && <li>Home Loan Principal Repayment</li>}
          </ul>
          <p className="text-xs text-blue-600 mt-2">
            The max total limit is ₹1,50,000. Do you make <em>additional</em> investments besides these?
          </p>
        </div>
      )}

      <RadioGroup
        name="has-80c"
        options={EIGHTY_C_OPTIONS}
        value={has80C === true ? 'yes' : has80C === false ? 'no' : null}
        onChange={handleChoice}
      />

      {showAmountInput && (
        <div className="mt-6 animate-fade-in">
          <div className="h-px bg-brand-border mb-6" />
          <h3 className="text-lg font-bold text-brand-text mb-1">Annual 80C Investments</h3>
          <p className="text-brand-muted text-sm mb-4">
            Enter the total amount you plan to invest this year (excluding EPF and Home Loan Principal).
          </p>
          <CurrencyInput
            id="investments-80c"
            value={investments80CAnnual}
            onChange={handleChange}
            placeholder="50,000"
            error={error}
            min={1}
            max={1500000}
          />
          {amountNum > 1500000 && (
             <p className="text-xs text-amber-700 mt-2 bg-amber-50 p-2 rounded inline-block">
               Note: While you can invest this much, the tax deduction is strictly capped at ₹1,50,000 total.
             </p>
          )}
        </div>
      )}

      <FaqAccordion faqs={FAQS_80C} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step9-next"
          className="btn-primary flex-1"
          disabled={!isValid}
          onClick={onNext}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
