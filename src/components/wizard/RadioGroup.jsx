// Styled radio card group — used by all wizard steps
export default function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="space-y-4" role="radiogroup">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <label
            key={opt.value}
            htmlFor={`${name}-${opt.value}`}
            className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ease-out group
              ${selected
                ? 'border-brand-blue bg-brand-blue-xlight shadow-[0_0_20px_rgba(30,64,175,0.1)] -translate-y-0.5'
                : 'border-brand-border/80 bg-white hover:border-brand-blue-light hover:shadow-md hover:-translate-y-0.5'
              }`}
          >
            {/* custom radio / checkmark */}
            <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300
              ${selected ? 'border-brand-blue bg-brand-blue shadow-inner' : 'border-brand-border-hover bg-white group-hover:border-brand-blue-light'}`}>
              {selected && (
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <input
              type="radio"
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {opt.icon && <span className="text-xl">{opt.icon}</span>}
                <p className={`font-semibold text-lg leading-snug transition-colors duration-300 ${selected ? 'text-brand-blue' : 'text-brand-text group-hover:text-brand-blue'}`}>
                  {opt.label}
                </p>
              </div>
              {opt.description && (
                <p className={`text-sm mt-1.5 leading-relaxed transition-colors duration-300 ${selected ? 'text-brand-blue-dark/80' : 'text-brand-muted'}`}>
                  {opt.description}
                </p>
              )}
            </div>
          </label>
        )
      })}
    </div>
  )
}
