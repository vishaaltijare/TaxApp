import { useState } from 'react'
import { useTaxStore } from '../../store/useTaxStore'
import { formatINR } from '../../utils/formatters'
import { calculateTax } from '../../utils/taxEngine'

export default function LivePreviewPanel() {
  const state = useTaxStore()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const hasData = state.monthlyTakeHome && Number(state.monthlyTakeHome) >= 10000

  if (!hasData) {
    return (
      <div className="card p-6 lg:sticky lg:top-24 animate-fade-in hidden lg:block">
        <p className="section-label mb-4">Live Tax Estimate</p>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-blue-xlight border border-brand-blue-light flex items-center justify-center mb-4">
            <span className="text-2xl">🧮</span>
          </div>
          <p className="font-semibold text-brand-text mb-2">Waiting for your information…</p>
          <p className="text-brand-muted text-sm leading-relaxed max-w-xs">
            Your live tax estimate will appear here as you answer each question.
          </p>
        </div>
        <div className="mt-4 space-y-2">
          {['Gross Salary', 'Total Deductions', 'Taxable Income', 'Income Tax', 'Take-Home'].map((label) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-brand-border last:border-0">
              <span className="text-brand-muted text-sm">{label}</span>
              <span className="text-brand-border-hover text-sm font-medium">—</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const taxResult = calculateTax(state)
  const { grossIncome, new: newRegime } = taxResult
  
  const totalDeductions = newRegime.breakdown.standardDeduction + newRegime.breakdown.nps80ccd2

  return (
    <>
      {/* Mobile Toggle Button (Visible only on small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full bg-brand-text text-white rounded-2xl shadow-2xl p-4 flex justify-between items-center pointer-events-auto active:scale-[0.98] transition-transform"
        >
          <div>
            <p className="text-xs text-brand-blue-xlight text-left">Live Tax Estimate (New Regime)</p>
            <p className="text-xl font-bold text-left">{formatINR(newRegime.totalTax)}</p>
          </div>
          <span className="text-xl">{isMobileOpen ? '▼' : '▲'}</span>
        </button>
      </div>

      {/* Main Panel (Sticky side on desktop, Absolute drawer on mobile) */}
      <div className={`
        fixed inset-x-0 bottom-0 z-40 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-24 px-6 pt-8 transition-transform duration-300 ease-in-out
        lg:static lg:bg-transparent lg:shadow-none lg:rounded-none lg:p-0 lg:transform-none lg:block
        ${isMobileOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
      `}>
        <div className="card p-6 lg:sticky lg:top-24 animate-fade-in max-h-[80vh] overflow-y-auto lg:max-h-none lg:overflow-visible">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Live Tax Estimate</p>
            <span className="badge-blue text-xs">New Regime</span>
          </div>

          <p className="text-xs text-brand-muted mb-4 italic">Updates as you answer each question</p>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center py-2 border-b border-brand-border">
              <span className="text-brand-muted text-sm">Gross Salary (est.)</span>
              <span className="text-brand-text text-sm font-semibold">{formatINR(grossIncome)}/yr</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-border">
              <span className="text-brand-muted text-sm">Total Deductions</span>
              <span className="text-brand-text text-sm font-semibold text-red-500">−{formatINR(totalDeductions)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-border">
              <span className="text-brand-muted text-sm">Taxable Income</span>
              <span className="text-brand-text text-sm font-semibold">{formatINR(newRegime.taxable)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-border">
              <span className="text-brand-muted text-sm">Income Tax</span>
              <span className="text-brand-text text-sm font-semibold">{formatINR(newRegime.baseTax)}/yr</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-border">
              <span className="text-brand-muted text-sm">Cess (4%)</span>
              <span className="text-brand-text text-sm font-semibold">{formatINR(newRegime.cess)}/yr</span>
            </div>
          </div>

          <div className="mt-4 bg-brand-blue rounded-xl p-4 text-center">
            <p className="text-blue-100 text-xs mb-1">Estimated Total Tax</p>
            <p className="text-white font-bold text-xl">{formatINR(newRegime.totalTax)}<span className="text-blue-200 font-normal text-sm">/yr</span></p>
            <p className="text-blue-200 text-xs mt-1">{formatINR(Math.round(newRegime.totalTax / 12))}/month</p>
          </div>

          <p className="text-xs text-brand-muted text-center mt-3 italic">
            Full comparison with Old Regime available at the end.
          </p>
        </div>
      </div>
      
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-30 animate-fade-in" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
