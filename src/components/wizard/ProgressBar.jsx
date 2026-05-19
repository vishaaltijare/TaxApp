import { TOTAL_MAIN_STEPS, MAIN_STEP_LABELS } from '../../utils/stepSequence'

export default function ProgressBar({ currentMain }) {
  return (
    <div className="bg-white border-b border-brand-border px-4 sm:px-6 pt-4 pb-6 sm:pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Mobile: text */}
        <p className="sm:hidden text-sm font-medium text-brand-muted text-center mb-2">
          Step {currentMain} of {TOTAL_MAIN_STEPS} — {MAIN_STEP_LABELS[currentMain - 1]}
        </p>

        {/* Desktop: dots */}
        <div className="hidden sm:flex items-center gap-0">
          {MAIN_STEP_LABELS.map((label, i) => {
            const stepNum = i + 1
            const isCompleted = stepNum < currentMain
            const isCurrent = stepNum === currentMain

            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="relative group flex flex-col items-center">
                  {/* dot */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 z-10
                      ${isCompleted ? 'bg-brand-green text-white shadow-sm' : ''}
                      ${isCurrent ? 'bg-brand-blue text-white shadow-md ring-4 ring-brand-blue/20' : ''}
                      ${!isCompleted && !isCurrent ? 'bg-brand-border text-brand-muted' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : stepNum}
                  </div>
                  {/* label tooltip on hover */}
                  <span className={`absolute -bottom-5 text-[10px] whitespace-nowrap font-medium transition-colors
                    ${isCurrent ? 'text-brand-blue' : 'text-brand-muted'}`}>
                    {label}
                  </span>
                </div>
                {/* connector line */}
                {stepNum < TOTAL_MAIN_STEPS && (
                  <div className={`flex-1 h-0.5 mx-1 transition-colors duration-300
                    ${isCompleted ? 'bg-brand-green' : 'bg-brand-border'}`}
                  />
                )}
              </div>
            )
          })}
        </div>
        {/* Mobile progress bar */}
        <div className="sm:hidden h-1.5 bg-brand-border rounded-full mt-2">
          <div
            className="h-full bg-brand-blue rounded-full transition-all duration-500"
            style={{ width: `${((currentMain - 1) / (TOTAL_MAIN_STEPS - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
