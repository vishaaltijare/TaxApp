import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaxStore } from '../../store/useTaxStore'
import { computeStepSequence, STEP_TO_MAIN } from '../../utils/stepSequence'
import ProgressBar from './ProgressBar'
import LivePreviewPanel from './LivePreviewPanel'

import Step1Age from './steps/Step1Age'
import Step2Salary from './steps/Step2Salary'
import Step3State from './steps/Step3State'
import Step4City from './steps/Step4City'
import Step5Rent from './steps/Step5Rent'
import Step6HRA from './steps/Step6HRA'
import Step7HomeLoan from './steps/Step7HomeLoan'
import Step8PF from './steps/Step8PF'
import Step980C from './steps/Step980C'
import Step10Health from './steps/Step10Health'
import Step11EduLoan from './steps/Step11EduLoan'
import Step12NPS from './steps/Step12NPS'
import Step13Bonus from './steps/Step13Bonus'
import Step14Review from './steps/Step14Review'

export default function Wizard() {
  const navigate = useNavigate()
  const state = useTaxStore()
  const currentStepId = state.currentStepId

  const steps = computeStepSequence(state)
  const currentIndex = steps.indexOf(currentStepId)

  // Safety check: if current step isn't in sequence (e.g. data cleared), reset to first
  useEffect(() => {
    if (currentIndex === -1) {
      state.goToStep(steps[0])
    }
  }, [currentIndex, steps, state])

  if (currentIndex === -1) return null

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      state.goToStep(steps[currentIndex + 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      state.goToStep(steps[currentIndex - 1])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSaveAndExit = () => {
    // State is already saved to localStorage via Zustand persist
    alert('Your progress has been saved securely in your browser.')
    navigate('/')
  }

  const currentMain = STEP_TO_MAIN[currentStepId] || 1

  return (
    <div className="flex-1 flex flex-col min-h-0 relative bg-transparent">
      {/* Top Progress Bar */}
      <div className="sticky top-16 z-40">
        <ProgressBar currentMain={currentMain} />
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 mx-auto w-full px-4 sm:px-6 py-8 md:py-12 ${currentStepId === 'review' ? 'max-w-5xl' : 'max-w-6xl'}`}>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
          
          {/* Left: Wizard Step Content */}
          <div className={`w-full pb-16 lg:pb-0 transition-all duration-500 ease-in-out animate-fade-in-up ${currentStepId === 'review' ? '' : 'lg:flex-[3] lg:min-w-0'}`} key={currentStepId}>
            {currentStepId === 'age' && <Step1Age onNext={handleNext} onBack={handleBack} isFirst={true} />}
            {currentStepId === 'salary' && <Step2Salary onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'state' && <Step3State onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'city' && <Step4City onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'rent_question' && <Step5Rent onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'hra_question' && <Step6HRA onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'home_loan_question' && <Step7HomeLoan onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'pf_question' && <Step8PF onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'investments_80c_question' && <Step980C onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'health_insurance_question' && <Step10Health onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'education_loan_question' && <Step11EduLoan onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'nps_question' && <Step12NPS onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'bonus_question' && <Step13Bonus onNext={handleNext} onBack={handleBack} />}
            {currentStepId === 'review' && <Step14Review onBack={handleBack} />}
          </div>

          {/* Right: Live Preview Panel (Desktop: sticky side, Mobile: toggle/bottom) */}
          {currentStepId !== 'review' && (
            <div className="w-full lg:flex-[2] lg:min-w-[320px]">
              <LivePreviewPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
