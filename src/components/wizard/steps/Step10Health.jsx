import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'

const HEALTH_OPTIONS = [
  { value: 'yes', icon: '🏥', label: 'Yes, I pay medical insurance premiums', description: 'For self, family, or parents (Section 80D)' },
  { value: 'no', icon: '🚫', label: 'No, I don\'t', description: 'No personal medical insurance (corporate doesn\'t count)' },
]

const FAQS_HEALTH = [
  { q: 'Can I claim corporate health insurance?', a: 'No, only premiums you pay out of your own pocket qualify for Section 80D.' },
  { q: 'What is the limit?', a: '₹25,000 for self/family, and an additional ₹25,000 for parents (₹50,000 if parents are senior citizens). Preventive health checkups up to ₹5,000 are also included in this limit.' },
]

export default function Step10Health({ onNext, onBack }) {
  const { hasHealthInsurance, healthInsuranceAnnual, setField } = useTaxStore()
  const [error, setError] = useState('')

  const showAmountInput = hasHealthInsurance === true

  const amountNum = Number(healthInsuranceAnnual)
  // Max out at 1L for validation (self + senior parents max)
  const amountValid = showAmountInput 
    ? healthInsuranceAnnual !== '' && amountNum >= 1 && amountNum <= 500000 
    : true

  const isValid = hasHealthInsurance !== null && amountValid

  const handleChange = (v) => {
    setField('healthInsuranceAnnual', v)
    const n = Number(v)
    if (v !== '' && n < 1) setError('Enter a valid amount')
    else setError('')
  }

  const handleChoice = (val) => {
    let boolVal = null
    if (val === 'yes') boolVal = true
    if (val === 'no') boolVal = false
    
    setField('hasHealthInsurance', boolVal)
    if (val === 'no') setField('healthInsuranceAnnual', '')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 9 of 13 — Insurance</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Do you pay for medical insurance?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Medical insurance premiums for you and your parents.
        </p>
        <p className="text-brand-muted mt-2 text-sm">
          Premiums paid for yourself, your spouse, children, or parents under Section 80D.
        </p>
      </div>

      <RadioGroup
        name="has-health"
        options={HEALTH_OPTIONS}
        value={hasHealthInsurance === true ? 'yes' : hasHealthInsurance === false ? 'no' : null}
        onChange={handleChoice}
      />

      {showAmountInput && (
        <div className="mt-6 animate-fade-in">
          <div className="h-px bg-brand-border mb-6" />
          <h3 className="text-lg font-bold text-brand-text mb-1">Annual Premium Paid</h3>
          <p className="text-brand-muted text-sm mb-4">
            Enter the total premium you pay yearly for all personal health insurance policies.
          </p>
          <CurrencyInput
            id="health-premium"
            value={healthInsuranceAnnual}
            onChange={handleChange}
            placeholder="15,000"
            error={error}
            min={1}
            max={500000}
          />
          {amountNum > 75000 && (
             <p className="text-xs text-amber-700 mt-2 bg-amber-50 p-2 rounded inline-block">
               Note: The maximum combined deduction allowed under 80D is typically ₹75,000 (if parents are senior citizens).
             </p>
          )}
        </div>
      )}

      <FaqAccordion faqs={FAQS_HEALTH} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step10-next"
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
