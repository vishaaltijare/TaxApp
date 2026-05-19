import { useState } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import CurrencyInput from '../CurrencyInput'
import FaqAccordion from '../FaqAccordion'

const NPS_OPTIONS = [
  { value: 'none', label: 'No NPS contribution', description: 'I do not invest in NPS' },
  { value: 'self', label: 'Yes, personal contribution', description: 'Under Section 80CCD(1B)' },
  { value: 'employer_only', label: 'Yes, employer contribution only', description: 'Corporate NPS under Section 80CCD(2)' },
]

const FAQS_NPS = [
  { q: 'Is Employer NPS tax-free in the new regime?', a: 'Yes! Employer contribution to NPS (Section 80CCD(2)) is one of the few deductions available in both the old and the new tax regime, up to 10% (or 14% for government) of Basic Salary.' },
  { q: 'What is Section 80CCD(1B)?', a: 'This is an additional ₹50,000 deduction allowed for voluntary personal contributions to NPS, over and above the ₹1.5L 80C limit. This is only available in the old regime.' },
]

export default function Step12NPS({ onNext, onBack }) {
  const { npsType, npsPersonalAnnual, npsEmployerPercent, setField } = useTaxStore()
  const [personalError, setPersonalError] = useState('')

  const showPersonalInput = npsType === 'self'
  const showEmployerInput = npsType === 'self' || npsType === 'employer_only'

  const personalNum = Number(npsPersonalAnnual)
  const personalValid = showPersonalInput 
    ? npsPersonalAnnual !== '' && personalNum >= 1 && personalNum <= 500000 
    : true

  const employerValid = showEmployerInput
    ? npsEmployerPercent !== '' // It's usually 10%, we provide a dropdown
    : true

  const isValid = npsType !== null && personalValid && employerValid

  const handlePersonalChange = (v) => {
    setField('npsPersonalAnnual', v)
    const n = Number(v)
    if (v !== '' && n < 1) setPersonalError('Enter a valid amount')
    else setPersonalError('')
  }

  const handleChoice = (val) => {
    setField('npsType', val)
    if (val === 'none') {
      setField('npsPersonalAnnual', '')
      setField('npsEmployerPercent', '')
    } else if (val === 'employer_only') {
      setField('npsPersonalAnnual', '')
      if (!npsEmployerPercent) setField('npsEmployerPercent', '10') // default
    } else {
      if (!npsEmployerPercent) setField('npsEmployerPercent', '10') // default
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 11 of 13 — NPS</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Do you invest in the National Pension System (NPS)?
        </h2>
        <p className="text-brand-muted mt-2 text-sm">
          Corporate NPS is highly tax-efficient under both regimes.
        </p>
      </div>

      <RadioGroup
        name="nps-type"
        options={NPS_OPTIONS}
        value={npsType}
        onChange={handleChoice}
      />

      {showPersonalInput && (
        <div className="mt-6 animate-fade-in">
          <div className="h-px bg-brand-border mb-6" />
          <h3 className="text-lg font-bold text-brand-text mb-1">Voluntary Personal Contribution</h3>
          <p className="text-brand-muted text-sm mb-4">
            Enter the amount you personally invest in NPS (Tier-1) this year to claim under 80CCD(1B). Max deduction is ₹50,000.
          </p>
          <CurrencyInput
            id="nps-personal"
            value={npsPersonalAnnual}
            onChange={handlePersonalChange}
            placeholder="50,000"
            error={personalError}
            min={1}
            max={500000}
          />
        </div>
      )}

      {showEmployerInput && (
        <div className="mt-6 animate-fade-in">
          {showPersonalInput && <div className="h-px bg-brand-border mb-6" />}
          <h3 className="text-lg font-bold text-brand-text mb-1">Employer Contribution</h3>
          <p className="text-brand-muted text-sm mb-4">
            What percentage of your Basic Salary does your employer contribute to Corporate NPS?
          </p>
          <select
            value={npsEmployerPercent}
            onChange={(e) => setField('npsEmployerPercent', e.target.value)}
            className="w-full sm:w-1/2 px-4 py-3 rounded-xl border-2 border-brand-border bg-white text-brand-text focus:outline-none focus:border-brand-blue"
          >
            <option value="10">10% of Basic (Standard for Private Sector)</option>
            <option value="14">14% of Basic (Government Employees)</option>
            <option value="0">0% (My employer doesn't contribute)</option>
          </select>
          <p className="text-xs text-brand-muted mt-2">
            This deduction works in both Old and New Tax Regimes!
          </p>
        </div>
      )}

      <FaqAccordion faqs={FAQS_NPS} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step12-next"
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
