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
      <div className="card p-6 lg:sticky lg:top-24 animate-fade-in hidden lg:block bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted">Live Estimate</p>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-blue/[0.03] border border-brand-blue/10 flex items-center justify-center mb-5 relative">
            <div className="absolute inset-0 rounded-2xl border-2 border-brand-blue/20 animate-[spin_4s_linear_infinite] border-t-transparent" />
            <span className="text-2xl animate-pulse">✨</span>
          </div>
          <p className="font-semibold text-brand-text mb-2">Preparing your personalized estimate</p>
          <p className="text-brand-muted text-sm leading-relaxed max-w-[250px]">
            Your tax calculation will appear here in real-time as you enter your details.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          {['Gross Salary', 'Total Deductions', 'Taxable Income', 'Estimated Tax'].map((label, idx) => (
            <div key={label} className="flex justify-between items-center py-2.5 border-b border-brand-border/40 last:border-0">
              <span className="text-brand-muted text-sm">{label}</span>
              <div className="h-4 bg-brand-border/50 rounded animate-pulse" style={{ width: `${40 + (idx * 15)}px` }}></div>
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
        fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur-xl rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-24 px-6 pt-8 transition-transform duration-300 ease-in-out
        lg:static lg:bg-transparent lg:shadow-none lg:rounded-none lg:p-0 lg:transform-none lg:block
        ${isMobileOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
      `}>
        <div className="card p-6 lg:sticky lg:top-24 animate-fade-in max-h-[80vh] overflow-y-auto lg:max-h-none lg:overflow-visible bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted">Live Estimate</p>
            </div>
            <span className="bg-brand-blue/10 text-brand-blue border border-brand-blue/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">New Regime</span>
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

          <div className="mt-6 bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-2xl p-5 text-center shadow-[0_8px_30px_rgba(30,64,175,0.2)] relative overflow-hidden">
            {/* Subtle gloss effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 rounded-b-[100%] pointer-events-none" />
            
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">Estimated Total Tax</p>
            <p className="text-white font-bold text-3xl tabular-nums tracking-tight animate-fade-in-up">{formatINR(newRegime.totalTax)}<span className="text-white/60 font-medium text-sm ml-1 tracking-normal">/yr</span></p>
            <p className="text-white/70 text-sm mt-2 font-medium">{formatINR(Math.round(newRegime.totalTax / 12))}/month</p>
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
