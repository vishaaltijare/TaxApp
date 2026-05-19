// Styled radio card group — used by all wizard steps
export default function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="space-y-3" role="radiogroup">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <label
            key={opt.value}
            htmlFor={`${name}-${opt.value}`}
            className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
              ${selected
                ? 'border-brand-blue bg-brand-blue-xlight shadow-focus'
                : 'border-brand-border bg-white hover:border-brand-blue-light hover:bg-slate-50'
              }`}
          >
            {/* custom radio */}
            <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200
              ${selected ? 'border-brand-blue bg-brand-blue' : 'border-brand-border-hover bg-white'}`}>
              {selected && <div className="w-2 h-2 rounded-full bg-white" />}
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
              <p className={`font-semibold text-base leading-snug ${selected ? 'text-brand-blue' : 'text-brand-text'}`}>
                {opt.label}
              </p>
              {opt.description && (
                <p className="text-brand-muted text-sm mt-1 leading-relaxed">{opt.description}</p>
              )}
            </div>
          </label>
        )
      })}
    </div>
  )
}
