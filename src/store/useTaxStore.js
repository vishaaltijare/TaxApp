import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  currentStepId: 'age',

  // Step 1 — Age
  ageGroup: null, // 'below_60' | 'senior_60_79' | 'super_senior_80'

  // Step 2 — Monthly take-home salary
  monthlyTakeHome: '',

  // Step 3 — State
  state: '',

  // Step 4 — City type
  cityType: null, // 'metro' | 'non_metro'

  // Step 5 — Rent
  paysRent: null, // true | false
  monthlyRent: '',

  // Step 6 — HRA
  hasHRA: null, // true | false | 'not_sure'
  monthlyHRA: '',

  // Step 7 — Home loan
  homeLoanType: null, // 'self_occupied' | 'rented_out' | 'none'
  homeLoanInterestAnnual: '',

  // Step 8 — PF
  hasPF: null, // true | false | 'not_sure'
  basicSalaryMonthly: '',

  // Step 9 — 80C investments
  has80C: null, // true | false | 'not_sure'
  investments80CAnnual: '',

  // Step 10 — Health insurance
  hasHealthInsurance: null,
  healthInsuranceAnnual: '',

  // Step 11 — Education loan
  hasEducationLoan: null,
  educationLoanInterestAnnual: '',

  // Step 12 — NPS
  npsType: null, // 'self' | 'employer_only' | 'none'
  npsPersonalAnnual: '',
  npsEmployerPercent: '',

  // Step 13 — Bonus
  hasBonus: null,
  bonusAnnual: '',
}

export const useTaxStore = create(
  persist(
    (set) => ({
      ...initialState,
      setField: (field, value) => set({ [field]: value }),
      goToStep: (stepId) => set({ currentStepId: stepId }),
      reset: () => set({ ...initialState }),
    }),
    { name: 'taxCalcState_v1' }
  )
)
