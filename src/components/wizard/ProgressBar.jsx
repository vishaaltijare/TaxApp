import { TOTAL_MAIN_STEPS, MAIN_STEP_LABELS } from '../../utils/stepSequence'

export default function ProgressBar({ currentMain }) {
  const percentage = Math.round(((currentMain - 1) / (TOTAL_MAIN_STEPS - 1)) * 100)

  return (
    <div className="bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] px-4 sm:px-6 pt-5 pb-6 relative z-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Info */}
        <div className="flex justify-between items-end mb-5">
          <div>
            <p className="text-[11px] font-bold text-brand-blue tracking-widest uppercase mb-1">
              Step {currentMain} of {TOTAL_MAIN_STEPS} • {percentage}% Complete
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-brand-text">
              {MAIN_STEP_LABELS[currentMain - 1]}
            </h2>
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-semibold text-brand-muted bg-brand-bg px-3 py-1 rounded-full border border-brand-border">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Thin Animated Progress Line */}
        <div className="h-1.5 w-full bg-brand-border/60 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-brand-blue rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Desktop: Step Dots */}
        <div className="hidden sm:flex items-center justify-between relative px-2">
          {/* Connector Line Background */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-brand-border/40 -translate-y-1/2 z-0" />
          
          {/* Connector Line Active */}
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-brand-blue transition-all duration-700 ease-out -translate-y-1/2 z-0" 
            style={{ width: `${percentage}%` }}
          />

          {MAIN_STEP_LABELS.map((label, i) => {
            const stepNum = i + 1
            const isCompleted = stepNum < currentMain
            const isCurrent = stepNum === currentMain

            return (
              <div key={label} className="relative z-10 flex flex-col items-center group">
                {/* dot */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300
                    ${isCompleted ? 'bg-brand-blue text-white shadow-md' : ''}
                    ${isCurrent ? 'bg-white text-brand-blue border-[3px] border-brand-blue shadow-lg scale-110' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-white text-brand-muted border-2 border-brand-border' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : stepNum}
                </div>
                {/* label tooltip on hover */}
                <span className={`absolute -bottom-6 text-[10px] whitespace-nowrap font-semibold transition-colors duration-200
                  ${isCurrent ? 'text-brand-blue' : 'text-brand-muted opacity-0 group-hover:opacity-100'}`}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
