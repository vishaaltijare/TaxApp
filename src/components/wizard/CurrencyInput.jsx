// ₹-prefixed number input used across salary/amount steps
export default function CurrencyInput({ id, value, onChange, placeholder, error, hint, min, max }) {
  return (
    <div>
      <div className={`flex items-center border-2 rounded-xl bg-white/60 backdrop-blur-md shadow-[0_2px_10px_rgb(0,0,0,0.03)] transition-all duration-300 ease-out group hover:bg-white/90 hover:shadow-[0_4px_15px_rgb(0,0,0,0.05)] hover:border-white
        ${error ? 'border-red-400' : 'border-white focus-within:bg-white focus-within:border-brand-blue/50 focus-within:ring-4 focus-within:ring-brand-blue/10'}`}>
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
