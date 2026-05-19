import { useNavigate } from 'react-router-dom'
import Wizard from '../components/wizard/Wizard'

export default function CalculatorPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center shadow-inner">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6"></path>
                <path d="M10 22h4"></path>
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
              </svg>
            </div>
            <span className="font-bold text-brand-blue text-xl sm:text-2xl hidden sm:block tracking-tight">TaxSense</span>
          </button>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-brand-muted text-sm">FY 2025–26</span>
            <button
              onClick={() => {
                alert('Your progress has been saved securely in your browser.')
                navigate('/')
              }}
              className="text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              Save & Exit
            </button>
          </div>
        </div>
      </nav>

      <Wizard />
    </div>
  )
}
