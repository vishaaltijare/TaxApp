import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'

const HRA_OPTIONS = [
  { value: 'yes', icon: '💰', label: 'Yes, I receive HRA', description: 'HRA is mentioned as a separate component in your salary slip' },
  { value: 'no', icon: '🚫', label: 'No, I don\'t receive HRA', description: 'Your salary structure does not include House Rent Allowance' },
  { value: 'not_sure', label: 'I\'m not sure', description: 'We\'ll assume standard 40% basic salary for calculation purposes' },
]

const FAQS_HRA = [
  { q: 'Where can I find my HRA amount?', a: 'Check your monthly salary slip. It will be listed under the "Earnings" section as "House Rent Allowance" or "HRA".' },
  { q: 'Does HRA apply in the new tax regime?', a: 'No, HRA exemption is only available under the old tax regime. However, we still need it to compare both regimes accurately for you.' },
]

export default function Step6HRA({ onNext, onBack }) {
  const { hasHRA, monthlyHRA, setField, paysRent } = useTaxStore()
  const [error, setError] = useState('')

  const showAmountInput = hasHRA === true
  
  const amountNum = Number(monthlyHRA)
  const amountValid = showAmountInput 
    ? monthlyHRA !== '' && amountNum >= 1 && amountNum <= 500000 
    : true

  const isValid = hasHRA !== null && amountValid

  const handleChange = (v) => {
    setField('monthlyHRA', v)
    const n = Number(v)
    if (v !== '' && n < 1) setError('Enter a valid amount')
    else if (v !== '' && n > 500000) setError('Maximum ₹5,00,000 per month')
    else setError('')
  }

  const handleChoice = (val) => {
    let boolVal = null
    if (val === 'yes') boolVal = true
    if (val === 'no') boolVal = false
    if (val === 'not_sure') boolVal = 'not_sure'
    
    setField('hasHRA', boolVal)
    if (val !== 'yes') setField('monthlyHRA', '')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 5 of 13 — HRA</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Does your salary include HRA?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Enter the HRA allowance component from your salary slip.
        </p>
        <p className="text-brand-muted mt-2 text-sm">
          House Rent Allowance (HRA) is a common salary component used to save tax.
        </p>
      </div>

      {paysRent === false && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
          <span className="text-xl">ℹ️</span>
          <div>
            <p className="text-sm font-semibold text-amber-800">You selected that you don't pay rent.</p>
            <p className="text-xs text-amber-700 mt-1">
              Even if you receive HRA, you cannot claim tax exemption for it unless you actually pay rent. 
              The entire HRA amount will be taxable.
            </p>
          </div>
        </div>
      )}

      <RadioGroup
        name="has-hra"
        options={HRA_OPTIONS}
        value={hasHRA === true ? 'yes' : hasHRA === false ? 'no' : hasHRA === 'not_sure' ? 'not_sure' : null}
        onChange={handleChoice}
      />

      {showAmountInput && (
        <div className="mt-6 animate-fade-in">
          <div className="h-px bg-brand-border mb-6" />
          <h3 className="text-lg font-bold text-brand-text mb-1">Monthly HRA Amount</h3>
          <p className="text-brand-muted text-sm mb-4">Enter the HRA amount shown on your salary slip.</p>
          <CurrencyInput
            id="monthly-hra"
            value={monthlyHRA}
            onChange={handleChange}
            placeholder="10,000"
            error={error}
            min={1}
            max={500000}
          />
        </div>
      )}

      <FaqAccordion faqs={FAQS_HRA} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step6-next"
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
