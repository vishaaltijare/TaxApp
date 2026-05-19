import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import FaqAccordion from '../FaqAccordion'

const CITY_OPTIONS = [
  {
    value: 'metro', icon: '🏢',
    label: 'Metro city',
    description: 'Delhi, Mumbai, Kolkata, or Chennai — 50% HRA exemption limit',
  },
  {
    value: 'non_metro', icon: '🏡',
    label: 'Any other city',
    description: 'Bangalore, Hyderabad, Pune, or any other city — 40% HRA exemption limit',
  },
]

const FAQS = [
  {
    q: 'Does it matter if I live in Bangalore?',
    a: 'For HRA exemption purposes, only Delhi, Mumbai, Kolkata, and Chennai are classified as "metro" under current rules (FY 2025–26). Bangalore, Hyderabad, Pune, and all others are non-metro (40% exemption). This changes from FY 2026–27.',
  },
  {
    q: 'Why does the city matter?',
    a: 'The HRA tax exemption calculation uses 50% of your basic salary for metro cities and 40% for non-metro cities. This is one of the three factors used to determine your HRA exemption.',
  },
]

export default function Step4City({ onNext, onBack }) {
  const { cityType, setField } = useTaxStore()
  const isValid = Boolean(cityType)

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 3 of 13 — Location</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Which city do you live in?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Metro vs Non-Metro city affects your HRA exemption limits.
        </p>
        <p className="text-brand-muted mt-2 text-sm">
          This helps us calculate your HRA (House Rent Allowance) exemption correctly.
        </p>
      </div>

      <RadioGroup
        name="city-type"
        options={CITY_OPTIONS}
        value={cityType}
        onChange={(val) => setField('cityType', val)}
      />

      <FaqAccordion faqs={FAQS} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step4-next"
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
