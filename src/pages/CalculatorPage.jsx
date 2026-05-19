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

      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <Wizard />
      </div>
    </div>
  )
}
