import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'

const RENT_OPTIONS = [
  { value: 'yes', icon: '🏠', label: 'Yes, I pay rent', description: 'For rented accommodation — you may be eligible for HRA exemption' },
  { value: 'no', icon: '🚫', label: 'No, I own my home or stay with family', description: 'No rent deduction will be applied' },
]

const FAQS_RENT_Q = [
  { q: 'What if I pay rent to my parents?', a: 'Yes, this counts if you actually pay them via bank transfer. Your parents must declare it as rental income, and you must provide their PAN if annual rent exceeds ₹1,00,000.' },
  { q: 'What if my company pays rent directly?', a: 'If your company pays rent directly to the landlord and you receive HRA separately, select "Yes" and enter your monthly rent. If your company pays rent and you don\'t get HRA, select "No".' },
]

const FAQS_RENT_AMOUNT = [
  { q: 'Should I include utilities and maintenance?', a: 'No. Only the rent you pay to the landlord. Utilities, maintenance, and society charges are separate and not deductible.' },
  { q: 'What if my rent varies month to month?', a: 'Enter your average monthly rent. For example, if you pay ₹18,000 most months, enter ₹18,000.' },
]

export default function Step5Rent({ onNext, onBack }) {
  const { paysRent, monthlyRent, setField } = useTaxStore()
  const [rentError, setRentError] = useState('')

  // Sub-step: if "yes" to rent, ask the amount
  const showAmountInput = paysRent === true

  const rentNum = Number(monthlyRent)
  const rentValid = showAmountInput
    ? monthlyRent !== '' && rentNum >= 1 && rentNum <= 200000
    : true

  const isValid = paysRent !== null && rentValid

  const handleRentChange = (v) => {
    setField('monthlyRent', v)
    const n = Number(v)
    if (v !== '' && n < 1) setRentError('Enter a valid rent amount')
    else if (v !== '' && n > 200000) setRentError('Maximum ₹2,00,000 per month')
    else setRentError('')
  }

  const handleRentChoice = (val) => {
    setField('paysRent', val === 'yes')
    if (val === 'no') setField('monthlyRent', '')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 4 of 13 — Rent</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Do you pay rent for your accommodation?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Rent paid can reduce your taxable income via HRA.
        </p>
        <p className="text-brand-muted mt-2 text-sm">
          Rent paid can reduce your tax under the old regime via HRA exemption.
        </p>
      </div>

      <RadioGroup
        name="pays-rent"
        options={RENT_OPTIONS}
        value={paysRent === true ? 'yes' : paysRent === false ? 'no' : null}
        onChange={handleRentChoice}
      />

      {/* Conditional: rent amount */}
      {showAmountInput && (
        <div className="mt-6 animate-fade-in">
          <div className="h-px bg-brand-border mb-6" />
          <h3 className="text-lg font-bold text-brand-text mb-1">How much rent do you pay per month?</h3>
          <p className="text-brand-muted text-sm mb-4">Enter the amount you pay your landlord each month.</p>
          <CurrencyInput
            id="monthly-rent"
            value={monthlyRent}
            onChange={handleRentChange}
            placeholder="15,000"
            error={rentError}
            hint="Just the rent — not utilities or maintenance charges"
            min={1}
            max={200000}
          />

          <div className="mt-4 p-4 bg-brand-blue-xlight border border-brand-blue-light rounded-xl">
            <p className="text-brand-blue text-xs font-semibold mb-1">How HRA exemption is calculated</p>
            <p className="text-brand-muted text-xs leading-relaxed">
              Exemption = <strong>Minimum of:</strong> (1) Actual HRA received, (2) Rent paid − 10% of basic salary, (3) 50% of basic (metro) or 40% (non-metro). We'll calculate this precisely once you complete all steps.
            </p>
          </div>

          <FaqAccordion faqs={FAQS_RENT_AMOUNT} />
        </div>
      )}

      {paysRent !== null && !showAmountInput && (
        <FaqAccordion faqs={FAQS_RENT_Q} />
      )}
      {paysRent === null && <FaqAccordion faqs={FAQS_RENT_Q} />}

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step5-next"
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
