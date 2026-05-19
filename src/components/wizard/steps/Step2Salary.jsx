import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'
import { formatINR } from '../../../utils/formatters'

const MIN = 100000
const MAX = 100000000

const FAQS = [
  { q: 'What is Gross Salary?', a: 'Gross salary is your yearly salary before PF, taxes, and deductions. You can usually find it in your salary breakup, Form 16, or payslips. It may be different from your CTC.' },
  { q: 'Does this include bonus?', a: 'No. Enter your regular annual gross salary. We\'ll ask about annual bonus separately.' },
  { q: 'What about reimbursements?', a: 'No. Do not include reimbursements like internet or fuel bills.' },
]

export default function Step2Salary({ onNext, onBack }) {
  const { annualGrossSalary, setField } = useTaxStore()
  const [error, setError] = useState('')

  const value = annualGrossSalary
  const num = Number(value)
  const isValid = value !== '' && num >= MIN && num <= MAX

  const handleChange = (v) => {
    setField('annualGrossSalary', v)
    const n = Number(v)
    if (v !== '' && n < MIN) setError(`Minimum ₹${(MIN).toLocaleString('en-IN')}`)
    else if (v !== '' && n > MAX) setError(`Maximum ₹${(MAX).toLocaleString('en-IN')}`)
    else setError('')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 2 of 13 — Salary</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          What was your Annual Gross Salary for FY 2025–26?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          This is your total yearly income before any deductions.
        </p>

      </div>

      <CurrencyInput
        id="annual-gross-salary"
        value={value}
        onChange={handleChange}
        placeholder="12,00,000"
        error={error}
        hint="Enter your total yearly salary before PF, taxes, and other deductions."
        min={MIN}
        max={MAX}
      />

      <FaqAccordion faqs={FAQS} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step2-next"
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
