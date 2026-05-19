import { useTaxStore } from '../../../store/useTaxStore'
import RadioGroup from '../RadioGroup'
import FaqAccordion from '../FaqAccordion'

const AGE_OPTIONS = [
  { value: 'below_60', icon: '🧑', label: 'Below 60 years', description: 'Standard tax exemption limit of ₹2,50,000 under old regime' },
  { value: 'senior_60_79', icon: '👴', label: '60 to 79 years (Senior Citizen)', description: 'Higher exemption limit of ₹3,00,000 under old regime' },
  { value: 'super_senior_80', icon: '🧓', label: '80 years and above (Super Senior Citizen)', description: 'Highest exemption limit of ₹5,00,000 under old regime' },
]

const FAQS = [
  {
    q: 'Why does age matter?',
    a: 'The Income Tax Act offers higher tax exemptions for senior citizens (above 60) and super senior citizens (above 80) under the old tax regime. The new regime has the same rates for everyone.',
  },
  {
    q: 'How is age calculated?',
    a: 'Your age as on 31st March 2026 (last day of the financial year). So if you turn 60 before 31st March 2026, you count as a senior citizen for FY 2025–26.',
  },
]

export default function Step1Age({ onNext, onBack, isFirst }) {
  const { ageGroup, setField } = useTaxStore()
  const isValid = Boolean(ageGroup)

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 1 of 13 — Age</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          How old are you<br />
          <span className="text-brand-muted font-normal text-lg">as on 31st March 2026?</span>
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          This helps us determine your base tax exemption limit.
        </p>
      </div>

      <RadioGroup
        name="age-group"
        options={AGE_OPTIONS}
        value={ageGroup}
        onChange={(val) => setField('ageGroup', val)}
      />

      <FaqAccordion faqs={FAQS} />

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {!isFirst && (
          <button type="button" className="btn-secondary flex-1" onClick={onBack}>← Back</button>
        )}
        <button
          type="button"
          id="step1-next"
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
