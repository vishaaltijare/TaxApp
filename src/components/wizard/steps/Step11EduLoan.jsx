import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'

const EDU_LOAN_OPTIONS = [
  { value: 'yes', label: 'Yes, I am repaying an education loan', description: 'Under Section 80E (interest only)' },
  { value: 'no', label: 'No, I don\'t have one', description: 'No education loan deductions' },
]

const FAQS_EDU = [
  { q: 'Who can claim this deduction?', a: 'You can claim it if you took the loan for your own education, your spouse\'s, your children\'s, or a student for whom you are the legal guardian.' },
  { q: 'Is there a limit?', a: 'No, there is no upper limit on the amount of interest you can claim as a deduction under Section 80E. However, the principal repayment is not deductible.' },
]

export default function Step11EduLoan({ onNext, onBack }) {
  const { hasEducationLoan, educationLoanInterestAnnual, setField } = useTaxStore()
  const [error, setError] = useState('')

  const showAmountInput = hasEducationLoan === true

  const amountNum = Number(educationLoanInterestAnnual)
  const amountValid = showAmountInput 
    ? educationLoanInterestAnnual !== '' && amountNum >= 1 && amountNum <= 2000000 
    : true

  const isValid = hasEducationLoan !== null && amountValid

  const handleChange = (v) => {
    setField('educationLoanInterestAnnual', v)
    const n = Number(v)
    if (v !== '' && n < 1) setError('Enter a valid amount')
    else setError('')
  }

  const handleChoice = (val) => {
    const boolVal = val === 'yes'
    setField('hasEducationLoan', boolVal)
    if (!boolVal) setField('educationLoanInterestAnnual', '')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 10 of 13 — Education Loan</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Are you paying interest on an education loan?
        </h2>
        <p className="text-brand-muted mt-2 text-sm">
          Section 80E allows a full deduction on the interest paid for higher education loans.
        </p>
      </div>

      <RadioGroup
        name="has-edu-loan"
        options={EDU_LOAN_OPTIONS}
        value={hasEducationLoan === true ? 'yes' : hasEducationLoan === false ? 'no' : null}
        onChange={handleChoice}
      />

      {showAmountInput && (
        <div className="mt-6 animate-fade-in">
          <div className="h-px bg-brand-border mb-6" />
          <h3 className="text-lg font-bold text-brand-text mb-1">Annual Interest Paid</h3>
          <p className="text-brand-muted text-sm mb-4">
            Enter the total <strong>interest</strong> (not principal) you will pay this year (Apr 2025 - Mar 2026).
          </p>
          <CurrencyInput
            id="edu-loan-interest"
            value={educationLoanInterestAnnual}
            onChange={handleChange}
            placeholder="40,000"
            error={error}
            min={1}
            max={2000000}
          />
        </div>
      )}

      <FaqAccordion faqs={FAQS_EDU} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step11-next"
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
