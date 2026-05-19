import { useTaxStore } from '../../../store/useTaxStore'
import { STATES } from '../../../data/states'
import FaqAccordion from '../FaqAccordion'

const FAQS = [
  { q: 'What if I work in a different state than I live?', a: 'Select the state where you work. That\'s where professional tax applies.' },
  { q: 'What if I\'m in a Union Territory?', a: 'Select it from the dropdown. Some UTs have professional tax, others don\'t.' },
]

export default function Step3State({ onNext, onBack }) {
  const { state, setField } = useTaxStore()
  const isValid = Boolean(state)

  const selected = STATES.find((s) => s.value === state)

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="section-label mb-2">Step 3 of 13 — Location</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-text leading-snug">
          Which state do you work in?
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          State-specific professional tax rules may apply.
        </p>
        <p className="text-brand-muted mt-2 text-sm">
          Professional tax deducted from your salary varies by state.
        </p>
      </div>

      <div>
        <label htmlFor="state-select" className="block text-sm font-medium text-brand-muted mb-2">
          Select your state / UT
        </label>
        <select
          id="state-select"
          value={state}
          onChange={(e) => setField('state', e.target.value)}
          className={`w-full px-4 py-4 rounded-xl border-2 bg-white text-base font-medium transition-all duration-200
            focus:outline-none focus:border-brand-blue focus:shadow-focus
            ${state ? 'text-brand-text border-brand-blue' : 'text-brand-muted border-brand-border'}`}
        >
          <option value="">Select a state…</option>
          {STATES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}{!s.hasPT ? ' (No Professional Tax)' : ''}
            </option>
          ))}
        </select>
      </div>

      {selected && (
        <div className={`mt-4 flex items-center gap-3 p-4 rounded-xl border ${
          selected.hasPT
            ? 'bg-amber-50 border-amber-200'
            : 'bg-brand-green-light border-green-200'
        }`}>
          <span className="text-xl">{selected.hasPT ? '📋' : '✅'}</span>
          <div>
            <p className={`font-semibold text-sm ${selected.hasPT ? 'text-amber-800' : 'text-green-800'}`}>
              {selected.hasPT
                ? `${selected.label} deducts Professional Tax`
                : `${selected.label} has no Professional Tax`}
            </p>
            <p className={`text-xs mt-0.5 ${selected.hasPT ? 'text-amber-700' : 'text-green-700'}`}>
              {selected.hasPT
                ? "We'll calculate the exact amount based on your salary."
                : "No PT will be deducted from your salary in this state."}
            </p>
          </div>
        </div>
      )}

      <FaqAccordion faqs={FAQS} />

      <div className="flex gap-3 mt-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Back</button>
        <button
          type="button"
          id="step3-next"
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
