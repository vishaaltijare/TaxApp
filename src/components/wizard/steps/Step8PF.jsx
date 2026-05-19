import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'

const PF_OPTIONS = [
  { value: 'yes', icon: '💼', label: 'Yes, PF is deducted', description: 'Employee Provident Fund (EPF) is deducted from your salary' },
  { value: 'no', icon: '🚫', label: 'No, no PF deduction', description: 'You do not contribute to EPF' },
  { value: 'not_sure', label: 'I\'m not sure', description: 'We\'ll assume standard 12% of basic if basic is provided, else none.' },
]

const FAQS_PF = [
  { q: 'Is PF mandatory?', a: 'EPF is mandatory for companies with 20+ employees for salaries up to ₹15,000/month. For higher salaries, it\'s often optional or capped, but many companies still deduct 12% of your basic.' },
  { q: 'Why do you need my Basic Salary?', a: 'Your share of PF is usually calculated as 12% of your Basic Salary. Asking for Basic Salary is easier than asking you to calculate your annual PF contribution.' },
]

export default function Step8PF({ onNext, onBack }) {
  const { hasPF, basicSalaryMonthly, setField } = useTaxStore()
  const [error, setError] = useState('')

  const showAmountInput = hasPF === true || hasPF === 'not_sure'

  const amountNum = Number(basicSalaryMonthly)
  const amountValid = showAmountInput 
    ? basicSalaryMonthly !== '' && amountNum >= 1000 && amountNum <= 2000000 
    : true

  const isValid = hasPF !== null && amountValid

  const handleChange = (v) => {
    setField('basicSalaryMonthly', v)
    const n = Number(v)
    if (v !== '' && n < 1000) setError('Enter a valid basic salary')
    else if (v !== '' && n > 2000000) setError('Seems too high for a monthly basic salary.')
    else setError('')
  }

  const handleChoice = (val) => {
    let boolVal = null
    if (val === 'yes') boolVal = true
    if (val === 'no') boolVal = false
    if (val === 'not_sure') boolVal = 'not_sure'
    
    setField('hasPF', boolVal)
    if (val === 'no') setField('basicSalaryMonthly', '')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 7 of 13 — Provident Fund</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Does your company deduct EPF?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Your EPF contributions are tax-free under section 80C.
        </p>
        <p className="text-brand-muted mt-2 text-sm">
          Your contribution to Employee Provident Fund (EPF) counts towards Section 80C.
        </p>
      </div>

      <RadioGroup
        name="has-pf"
        options={PF_OPTIONS}
        value={hasPF === true ? 'yes' : hasPF === false ? 'no' : hasPF === 'not_sure' ? 'not_sure' : null}
        onChange={handleChoice}
      />

      {showAmountInput && (
        <div className="mt-6 animate-fade-in">
          <div className="h-px bg-brand-border mb-6" />
          <h3 className="text-lg font-bold text-brand-text mb-1">Monthly Basic Salary</h3>
          <p className="text-brand-muted text-sm mb-4">
            Enter your monthly Basic Salary (as shown on your payslip). We will calculate your 12% PF contribution automatically.
          </p>
          <CurrencyInput
            id="basic-salary"
            value={basicSalaryMonthly}
            onChange={handleChange}
            placeholder="25,000"
            error={error}
            min={1000}
            max={2000000}
          />
        </div>
      )}

      <FaqAccordion faqs={FAQS_PF} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step8-next"
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
