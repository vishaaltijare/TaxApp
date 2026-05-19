import { useNavigate } from 'react-router-dom'
import Wizard from '../components/wizard/Wizard'

export default function CalculatorPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F4FF] via-[#F8FAFC] to-[#EFF6FF] flex flex-col relative overflow-hidden isolate">
      {/* Faint Noise Texture */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-multiply z-[-1]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          opacity: 0.02
        }}
      ></div>

      {/* Subtle Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-2]">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-blue/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[70%] h-[70%] rounded-full bg-brand-blue/[0.04] blur-[140px]" />
      </div>
      {/* Navbar */}
      <nav className="bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-[0_2px_20px_rgba(0,0,0,0.02)] relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center shadow-inner">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="19" r="3"></circle>
                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path>
                <circle cx="18" cy="5" r="3"></circle>
              </svg>
            </div>
            <span className="font-bold text-brand-blue text-2xl sm:text-3xl hidden sm:block tracking-tight">TaxRoute</span>
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

      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <Wizard />
      </div>
    </div>
  )
}
