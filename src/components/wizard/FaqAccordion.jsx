import { useState } from 'react'

export default function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-brand-blue text-sm font-medium hover:text-brand-blue-dark transition-colors group"
      >
        <span className={`w-5 h-5 rounded-full border-2 border-brand-blue flex items-center justify-center text-xs font-bold transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
        {open ? 'Hide help' : 'Help & FAQs'}
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-brand-blue-light bg-brand-blue-xlight p-4 space-y-4 animate-fade-in">
          {faqs.map((faq, i) => (
            <div key={i}>
              <p className="text-sm font-semibold text-brand-text mb-1">Q: {faq.q}</p>
              <p className="text-sm text-brand-muted leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
