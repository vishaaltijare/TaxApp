// ₹-prefixed number input used across salary/amount steps
export default function CurrencyInput({ id, value, onChange, placeholder, error, hint, min, max }) {
  return (
    <div>
      <div className={`flex items-center border-2 rounded-xl bg-white transition-all duration-200
        ${error ? 'border-red-400' : 'border-brand-border focus-within:border-brand-blue focus-within:shadow-focus'}`}>
        <span className="pl-4 pr-2 text-brand-muted font-semibold text-lg select-none">₹</span>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '0'}
          className="flex-1 py-4 pr-4 bg-transparent text-brand-text text-lg font-semibold
            focus:outline-none placeholder:text-brand-border-hover
            [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
      {hint && !error && <p className="mt-2 text-brand-muted text-sm">{hint}</p>}
      {error && <p className="mt-2 text-red-500 text-sm flex items-center gap-1">⚠ {error}</p>}
    </div>
  )
}
