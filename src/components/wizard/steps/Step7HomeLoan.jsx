import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'

const LOAN_OPTIONS = [
  { value: 'none', label: 'No home loan', description: 'I do not have an active home loan' },
  { value: 'self_occupied', label: 'Yes, for a self-occupied property', description: 'I live in the house I took the loan for' },
  { value: 'rented_out', label: 'Yes, for a rented-out property', description: 'I have rented out the house I took the loan for' },
]

const FAQS_LOAN = [
  { q: 'What is Section 24(b)?', a: 'It allows you to claim a deduction on the interest portion of your home loan EMI. For self-occupied properties, the maximum limit is ₹2,00,000 per year.' },
  { q: 'Do I enter the total EMI?', a: 'No. Only enter the total interest you will pay in the year. The principal portion falls under Section 80C, which we will ask about later.' },
  { q: 'Is home loan interest deductible in the new regime?', a: 'Only for rented-out properties. For self-occupied properties, home loan interest deduction is NOT allowed under the new tax regime.' },
]

export default function Step7HomeLoan({ onNext, onBack }) {
  const { homeLoanType, homeLoanInterestAnnual, setField } = useTaxStore()
  const [error, setError] = useState('')

  const showAmountInput = homeLoanType === 'self_occupied' || homeLoanType === 'rented_out'

  const amountNum = Number(homeLoanInterestAnnual)
  const amountValid = showAmountInput 
    ? homeLoanInterestAnnual !== '' && amountNum >= 1 && amountNum <= 5000000 
    : true

  const isValid = homeLoanType !== null && amountValid

  const handleChange = (v) => {
    setField('homeLoanInterestAnnual', v)
    const n = Number(v)
    if (v !== '' && n < 1) setError('Enter a valid amount')
    else if (v !== '' && n > 5000000) setError('Are you sure? This seems very high.')
    else setError('')
  }

  const handleChoice = (val) => {
    setField('homeLoanType', val)
    if (val === 'none') setField('homeLoanInterestAnnual', '')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 6 of 13 — Home Loan</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Are you paying an EMI for a home loan?
        </h2>
        <p className="text-brand-muted mt-2 text-sm">
          The interest you pay on your home loan can provide significant tax relief.
        </p>
      </div>

      <RadioGroup
        name="home-loan-type"
        options={LOAN_OPTIONS}
        value={homeLoanType}
        onChange={handleChoice}
      />

      {showAmountInput && (
        <div className="mt-6 animate-fade-in">
          <div className="h-px bg-brand-border mb-6" />
          <h3 className="text-lg font-bold text-brand-text mb-1">Annual Interest Paid</h3>
          <p className="text-brand-muted text-sm mb-4">
            Enter the <strong>total interest</strong> (not principal) you will pay for the entire year (Apr 2025 - Mar 2026).
            Check your bank's provisional interest certificate.
          </p>
          <CurrencyInput
            id="home-loan-interest"
            value={homeLoanInterestAnnual}
            onChange={handleChange}
            placeholder="1,50,000"
            error={error}
            min={1}
            max={5000000}
          />
          
          {homeLoanType === 'self_occupied' && (
             <p className="text-xs text-amber-700 mt-2 bg-amber-50 p-2 rounded inline-block">
               Note: For self-occupied properties, the maximum deduction is capped at ₹2,00,000.
             </p>
          )}
        </div>
      )}

      <FaqAccordion faqs={FAQS_LOAN} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step7-next"
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
