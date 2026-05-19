import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'
import { formatINR } from '../../../utils/formatters'

const MIN = 10000
const MAX = 1000000

const FAQS = [
  { q: 'What if I don\'t know my exact take-home?', a: 'Check your salary slip. Look for the line "Net Pay" or "In-Hand" — the amount after all deductions.' },
  { q: 'Does this include bonus?', a: 'No. Enter your regular monthly salary. We\'ll ask about annual bonus separately.' },
  { q: 'What about reimbursements?', a: 'No. Only the fixed amount that hits your bank account every month.' },
]

export default function Step2Salary({ onNext, onBack }) {
  const { monthlyTakeHome, setField } = useTaxStore()
  const [error, setError] = useState('')

  const value = monthlyTakeHome
  const num = Number(value)
  const isValid = value !== '' && num >= MIN && num <= MAX

  const handleChange = (v) => {
    setField('monthlyTakeHome', v)
    const n = Number(v)
    if (v !== '' && n < MIN) setError(`Minimum ₹${(MIN).toLocaleString('en-IN')}`)
    else if (v !== '' && n > MAX) setError(`Maximum ₹${(MAX).toLocaleString('en-IN')}`)
    else setError('')
  }

  const annualEst = isValid ? Math.round(num * 12) : null

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 2 of 13 — Salary</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          How much money lands in your<br />bank account every month?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          This is your gross income before any deductions.
        </p>
        <p className="text-brand-muted mt-2 text-sm leading-relaxed">
          This is your <strong>take-home</strong> after PF, taxes, and any other deductions — exactly what you receive.
        </p>
      </div>

      <CurrencyInput
        id="monthly-take-home"
        value={value}
        onChange={handleChange}
        placeholder="50,000"
        error={error}
        hint="Look for 'Net Pay' or 'In-Hand' on your salary slip"
        min={MIN}
        max={MAX}
      />

      {annualEst && (
        <div className="mt-4 flex items-center gap-3 p-4 bg-brand-blue-xlight border border-brand-blue-light rounded-xl">
          <span className="text-2xl">📅</span>
          <div>
            <p className="text-brand-blue font-semibold text-sm">Estimated annual take-home</p>
            <p className="text-brand-text font-bold">{formatINR(annualEst)} / year</p>
          </div>
        </div>
      )}

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
