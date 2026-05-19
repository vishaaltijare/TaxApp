import { useEffect } from 'react'
import { useTaxStore } from '../../../store/useTaxStore'
import { calculateTax } from '../../../utils/taxEngine'
import { formatINR } from '../../../utils/formatters'
import { useNavigate } from 'react-router-dom'

export default function Step14Review({ onBack }) {
  const state = useTaxStore()
  const navigate = useNavigate()
  
  const taxResult = calculateTax(state)
  const { old: oldRegime, new: newRegime, grossIncome } = taxResult
  
  const winner = oldRegime.totalTax < newRegime.totalTax ? 'old' : 'new'
  const savings = Math.abs(oldRegime.totalTax - newRegime.totalTax)
  const isTie = oldRegime.totalTax === newRegime.totalTax

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleRestart = () => {
    state.reset()
    navigate('/')
  }

  return (
    <div className="animate-fade-in w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-text mb-4">
          Your Tax Results are Ready!
        </h2>
        <p className="text-brand-muted mt-3 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-blue/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Review your details before comparing the regimes.
        </p>
        {isTie ? (
          <p className="text-xl text-brand-muted">
            Both regimes result in the same tax. New Regime is usually simpler to file.
          </p>
        ) : (
          <div className="inline-block bg-brand-green/10 border border-brand-green/30 rounded-2xl p-4 px-8">
            <p className="text-brand-text text-lg">
              The <strong className="text-brand-green font-bold">{winner === 'old' ? 'Old Regime' : 'New Regime'}</strong> is better for you.
            </p>
            <p className="text-3xl font-bold text-brand-green mt-1">
              It saves you {formatINR(savings)} / year!
            </p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
        {/* New Regime Card */}
        <div className={`card p-6 sm:p-8 relative overflow-hidden transition-all duration-300 ${winner === 'new' ? 'ring-4 ring-brand-green shadow-xl scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}>
          {winner === 'new' && (
            <div className="absolute top-0 right-0 bg-brand-green text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              RECOMMENDED
            </div>
          )}
          <h3 className="text-2xl font-bold text-brand-text mb-1">New Regime</h3>
          <p className="text-sm text-brand-muted mb-6">Simpler, fewer deductions required.</p>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-brand-border">
              <span className="text-brand-muted">Gross Income</span>
              <span className="font-semibold">{formatINR(grossIncome)}</span>
            </div>
            
            <div className="py-2 border-b border-brand-border">
              <div className="flex justify-between mb-2">
                <span className="text-brand-muted">Total Deductions</span>
                <span className="text-red-500 font-semibold">
                  −{formatINR(newRegime.breakdown.standardDeduction + newRegime.breakdown.nps80ccd2)}
                </span>
              </div>
              <ul className="text-xs text-brand-muted space-y-1 pl-4 list-disc">
                <li>Standard Deduction: {formatINR(newRegime.breakdown.standardDeduction)}</li>
                {newRegime.breakdown.nps80ccd2 > 0 && <li>Employer NPS: {formatINR(newRegime.breakdown.nps80ccd2)}</li>}
              </ul>
            </div>

            <div className="flex justify-between py-2 border-b border-brand-border">
              <span className="text-brand-muted">Taxable Income</span>
              <span className="font-semibold">{formatINR(newRegime.taxable)}</span>
            </div>
          </div>

          <div className="mt-8 bg-brand-blue-xlight rounded-xl p-6 text-center border border-brand-blue-light">
            <p className="text-brand-muted text-sm mb-1">Total Tax Liability</p>
            <p className={`text-4xl font-bold ${winner === 'new' ? 'text-brand-green' : 'text-brand-text'}`}>
              {formatINR(newRegime.totalTax)}
            </p>
            <p className="text-xs text-brand-muted mt-2">Take-home: {formatINR(newRegime.takeHome)}/yr</p>
          </div>
        </div>

        {/* Old Regime Card */}
        <div className={`card p-6 sm:p-8 relative overflow-hidden transition-all duration-300 ${winner === 'old' ? 'ring-4 ring-brand-green shadow-xl scale-[1.02]' : 'opacity-90 hover:opacity-100'}`}>
          {winner === 'old' && (
            <div className="absolute top-0 right-0 bg-brand-green text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              RECOMMENDED
            </div>
          )}
          <h3 className="text-2xl font-bold text-brand-text mb-1">Old Regime</h3>
          <p className="text-sm text-brand-muted mb-6">Best if you maximize your investments.</p>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-brand-border">
              <span className="text-brand-muted">Gross Income</span>
              <span className="font-semibold">{formatINR(grossIncome)}</span>
            </div>
            
            <div className="py-2 border-b border-brand-border">
              <div className="flex justify-between mb-2">
                <span className="text-brand-muted">Total Deductions</span>
                <span className="text-red-500 font-semibold">
                  −{formatINR(Object.values(oldRegime.breakdown).reduce((a, b) => a + b, 0))}
                </span>
              </div>
              <ul className="text-xs text-brand-muted space-y-1 pl-4 list-disc grid grid-cols-2 gap-x-2">
                <li>Standard Ded: {formatINR(oldRegime.breakdown.standardDeduction)}</li>
                {oldRegime.breakdown.hraExemption > 0 && <li>HRA: {formatINR(oldRegime.breakdown.hraExemption)}</li>}
                {oldRegime.breakdown.pt > 0 && <li>Prof Tax: {formatINR(oldRegime.breakdown.pt)}</li>}
                {oldRegime.breakdown.homeLoan > 0 && <li>Home Loan: {formatINR(oldRegime.breakdown.homeLoan)}</li>}
                {oldRegime.breakdown.sec80c > 0 && <li>80C: {formatINR(oldRegime.breakdown.sec80c)}</li>}
                {oldRegime.breakdown.sec80d > 0 && <li>80D: {formatINR(oldRegime.breakdown.sec80d)}</li>}
                {oldRegime.breakdown.sec80e > 0 && <li>80E: {formatINR(oldRegime.breakdown.sec80e)}</li>}
                {oldRegime.breakdown.nps80ccd1b > 0 && <li>NPS 1B: {formatINR(oldRegime.breakdown.nps80ccd1b)}</li>}
                {oldRegime.breakdown.nps80ccd2 > 0 && <li>Emp NPS: {formatINR(oldRegime.breakdown.nps80ccd2)}</li>}
              </ul>
            </div>

            <div className="flex justify-between py-2 border-b border-brand-border">
              <span className="text-brand-muted">Taxable Income</span>
              <span className="font-semibold">{formatINR(oldRegime.taxable)}</span>
            </div>
          </div>

          <div className="mt-8 bg-brand-blue-xlight rounded-xl p-6 text-center border border-brand-blue-light">
            <p className="text-brand-muted text-sm mb-1">Total Tax Liability</p>
            <p className={`text-4xl font-bold ${winner === 'old' ? 'text-brand-green' : 'text-brand-text'}`}>
              {formatINR(oldRegime.totalTax)}
            </p>
            <p className="text-xs text-brand-muted mt-2">Take-home: {formatINR(oldRegime.takeHome)}/yr</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-12 mb-8">
        <button type="button" className="btn-secondary" onClick={onBack}>← Edit Answers</button>
        <button type="button" className="btn-primary" onClick={handleRestart}>Start Over</button>
      </div>
      
      <p className="text-center text-xs text-brand-muted max-w-2xl mx-auto">
        Disclaimer: This calculator is for informational purposes only. It uses provisional rules for FY 2025-26 
        and does not constitute professional tax advice. Always consult a chartered accountant before filing your returns.
      </p>
    </div>
  )
}
