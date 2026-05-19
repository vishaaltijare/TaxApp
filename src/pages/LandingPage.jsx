import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

/* ── tiny SVG icon helpers ── */
function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-brand-green flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

function RouteIcon({ className = "w-5 h-5 text-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3"></circle>
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path>
      <circle cx="18" cy="5" r="3"></circle>
    </svg>
  )
}



/* ── Social Proof / Logo Strip ── */
function SocialProof() {
  return (
    <div className="border-y border-brand-border bg-white py-10 relative z-10 animate-fade-in-up">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-brand-muted text-sm sm:text-base font-medium max-w-2xl mx-auto">
          "Thousands of salaried professionals struggle choosing between the old and new tax regimes. <span className="text-brand-blue font-semibold">TaxRoute makes it mathematically simple.</span>"
        </p>
      </div>
    </div>
  )
}

/* ── Grid Feature Cards (Replaces Bullet Section) ── */
function FeatureGrid() {
  const cards = [
    { icon: '⚡', title: 'Live Tax Comparison', desc: 'See both regimes update instantly as you type.' },
    { icon: '💰', title: 'Find Hidden Savings', desc: 'Discover exactly how much more you keep.' },
    { icon: '📊', title: 'Slab Breakdown', desc: 'Understand exactly where your tax goes.' },
    { icon: '🔒', title: 'Privacy First', desc: 'No signup. No data storage. Everything is local.' },
  ]
  return (
    <div className="grid sm:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      {cards.map((c) => (
        <div key={c.title} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-xl">
            {c.icon}
          </div>
          <h3 className="text-white font-semibold mb-2">{c.title}</h3>
          <p className="text-white/70 text-sm leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── How It Works Section ── */
function HowItWorks() {
  const steps = [
    { num: '1', title: 'Enter salary details', desc: 'Tell us your annual gross salary. We handle the complex math.' },
    { num: '2', title: 'Answer simple questions', desc: 'Rent, investments, home loan? Just plain English questions.' },
    { num: '3', title: 'See your best regime', desc: 'Get a clear AI-driven recommendation and full slab breakdown instantly.' },
  ]
  return (
    <section id="how-it-works" className="bg-brand-bg py-24 border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-brand-blue font-semibold uppercase tracking-wider text-sm mb-2">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text">Three steps to clarity.</h2>
        </div>
        
        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-border via-brand-blue/30 to-brand-border" />
          
          {steps.map((s, i) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-2xl bg-white shadow-xl border border-brand-border flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-blue to-emerald-500 font-black text-4xl">{s.num}</span>
              </div>
              <h3 className="font-bold text-brand-text text-xl mb-3">{s.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed max-w-[260px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Main Landing Page ── */
export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-blue selection:text-white">

      {/* ── Premium Navbar ── */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center shadow-inner group-hover:bg-brand-blue-dark transition-colors">
              <RouteIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-brand-blue text-2xl tracking-tight">TaxRoute</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-brand-muted hover:text-brand-blue transition-colors">How it Works</a>
          </div>

          {/* Right side CTA */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 text-brand-muted text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">
              <ShieldIcon />
              No Signup Required
            </span>
            <button
              id="nav-cta"
              className="btn-primary whitespace-nowrap !bg-gradient-to-r !from-orange-500 !to-amber-500 hover:!from-orange-600 hover:!to-amber-600 !border-0 !text-white !py-2 !px-5 !text-sm shadow-md hover:shadow-orange-500/40"
              onClick={() => navigate('/calculator')}
            >
              Start Calculator
            </button>
          </div>
        </div>
      </nav>

      {/* ── Modern Fintech Hero ── */}
      <section className="gradient-hero relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36">
        
        {/* Subtle noise/texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left: Headline & Text (Takes up 7 cols) */}
            <div className="lg:col-span-7 animate-fade-in-up">
              
              <div className="inline-flex items-center gap-2 glass-pill mb-8">
                <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                Updated for FY 2025–26 Rules
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-white text-balance">
                You Could Be Paying More Tax Than You Need To.
              </h1>

              <p className="text-blue-100/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl font-medium">
                Compare the old vs new tax regime instantly and discover which option keeps more money in your pocket. Simple questions, live results, zero confusion.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  id="hero-cta"
                  className="btn-primary whitespace-nowrap !bg-gradient-to-r !from-orange-500 !to-amber-500 hover:!from-orange-600 hover:!to-amber-600 !border-0 !text-white !py-4 !px-8 !text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] group transition-all"
                  onClick={() => navigate('/calculator')}
                >
                  Check My Savings
                  <ArrowRightIcon />
                </button>

              </div>

              {/* Trust Badges under CTA */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span className="flex items-center gap-1.5 text-blue-200 text-sm font-medium">
                  <CheckIcon /> No login required
                </span>
                <span className="flex items-center gap-1.5 text-blue-200 text-sm font-medium">
                  <CheckIcon /> Data never stored
                </span>
                <span className="flex items-center gap-1.5 text-blue-200 text-sm font-medium">
                  <CheckIcon /> Free forever
                </span>
              </div>
            </div>

            {/* Right: Feature Grid (Takes up 5 cols) */}
            <div className="lg:col-span-5 lg:ml-auto w-full mt-10 lg:mt-0">
              <FeatureGrid />
            </div>

          </div>
        </div>
      </section>

      <SocialProof />
      <HowItWorks />

      {/* ── Bottom CTA ── */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="card p-10 md:p-16 text-center gradient-card shadow-2xl relative overflow-hidden group">
            {/* Hover glow effect behind CTA */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
                Stop guessing. Start saving.
              </h2>
              <p className="text-brand-muted text-lg mb-10 max-w-xl mx-auto">
                Answer 13 plain-English questions. Takes about 5 minutes. Get your complete tax comparison for FY 2025–26.
              </p>
              <button
                id="bottom-cta"
                className="btn-primary whitespace-nowrap !bg-gradient-to-r !from-orange-500 !to-amber-500 hover:!from-orange-600 hover:!to-amber-600 !border-0 !text-white !py-4 !px-10 !text-lg shadow-xl hover:shadow-orange-500/40 group transition-all"
                onClick={() => navigate('/calculator')}
              >
                Check My Savings
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-50 border-t border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center shadow-inner">
                <RouteIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-brand-blue text-2xl tracking-tight">TaxRoute</span>
            </div>
            
            <div className="flex items-center md:justify-center gap-2 text-brand-green text-sm font-medium bg-brand-green/10 px-4 py-2 rounded-full w-fit md:mx-auto">
              <ShieldIcon />
              Calculations run in your browser.
            </div>

            <div className="flex gap-6 text-brand-muted text-sm font-medium md:justify-end">
              <span className="hover:text-brand-blue cursor-pointer transition-colors">FY 2025–26</span>
              <a href="#disclaimer" className="hover:text-brand-blue transition-colors">Disclaimer</a>
            </div>
          </div>

          {/* disclaimer */}
          <div id="disclaimer" className="p-4 bg-white border border-slate-200 rounded-xl text-slate-500 text-xs leading-relaxed shadow-sm">
            <strong>⚠ Tax Disclaimer:</strong> This calculator provides estimates based on FY 2025–26 Income Tax rules.
            It does not account for surcharge (income above ₹50 lakh), capital gains, freelance or business income.
            This is an educational tool only — not a substitute for professional tax advice.
            Always consult a Chartered Accountant for filing your ITR.
          </div>

          <p className="text-center text-slate-400 text-xs mt-8 font-medium">
            © 2026 TaxRoute · For salaried individuals in India · AY 2026–27
          </p>
        </div>
      </footer>

    </div>
  )
}
