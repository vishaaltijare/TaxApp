import { STATES } from '../data/states'

const OLD_REGIME_SLABS = [
  { limit: 250000, rate: 0 },
  { limit: 500000, rate: 0.05 },
  { limit: 1000000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
]

const OLD_REGIME_SENIOR_SLABS = [
  { limit: 300000, rate: 0 },
  { limit: 500000, rate: 0.05 },
  { limit: 1000000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
]

const OLD_REGIME_SUPER_SENIOR_SLABS = [
  { limit: 500000, rate: 0 },
  { limit: 1000000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
]

// FY 2025-26 New Regime Slabs
const NEW_REGIME_SLABS = [
  { limit: 400000, rate: 0 },
  { limit: 800000, rate: 0.05 },
  { limit: 1200000, rate: 0.10 },
  { limit: 1600000, rate: 0.15 },
  { limit: 2000000, rate: 0.20 },
  { limit: 2400000, rate: 0.25 },
  { limit: Infinity, rate: 0.30 },
]

function calculateTaxFromSlabs(income, slabs) {
  let tax = 0
  let previousLimit = 0

  for (const slab of slabs) {
    if (income > previousLimit) {
      const taxableInThisSlab = Math.min(income, slab.limit) - previousLimit
      tax += taxableInThisSlab * slab.rate
      previousLimit = slab.limit
    } else {
      break
    }
  }
  return tax
}

// 87A Rebate logic
function applyRebate(tax, income, regime) {
  if (regime === 'new' && income <= 1200000) {
    return 0 // Full rebate up to 12L in new regime
  }
  if (regime === 'old' && income <= 500000) {
    return 0 // Full rebate up to 5L in old regime
  }
  
  // Marginal relief on 87A (New Regime only)
  // If income slightly above 12L, tax should not exceed the income above 12L
  if (regime === 'new' && income > 1200000) {
    const taxAt12L = calculateTaxFromSlabs(1200000, NEW_REGIME_SLABS)
    const extraIncome = income - 1200000
    // If tax > extra income, restrict tax to extra income
    if (tax > extraIncome) {
      tax = extraIncome
    }
  }
  
  return tax
}

export function calculateTax(state) {
  // 1. Calculate Gross Income
  let grossSalary = Number(state.annualGrossSalary || 0)
  
  const basicAnnual = Number(state.basicSalaryMonthly || 0) * 12
  const bonus = Number(state.bonusAnnual || 0)
  
  const hasPF = state.hasPF === true || state.hasPF === 'not_sure'
  const pfEmployeeAnnual = hasPF && basicAnnual ? Math.round(basicAnnual * 0.12) : 0
  
  const stateData = STATES.find(s => s.value === state.state)
  const ptAnnual = stateData?.hasPT ? 2500 : 0 // Rough average PT is ~2500/yr
  
  // If we have HRA, it's already part of take-home/gross.
  const hraReceivedAnnual = state.hasHRA === true ? Number(state.monthlyHRA || 0) * 12 : 0

  // 2. Standard Deduction
  const standardDeductionOld = 50000
  const standardDeductionNew = 75000

  // 3. HRA Exemption (Old Regime Only)
  let hraExemption = 0
  if (state.hasHRA === true && state.paysRent === true && basicAnnual > 0) {
    const rentPaidAnnual = Number(state.monthlyRent || 0) * 12
    const condition1 = hraReceivedAnnual
    const condition2 = Math.max(0, rentPaidAnnual - (0.10 * basicAnnual))
    const condition3 = state.cityType === 'metro' ? 0.50 * basicAnnual : 0.40 * basicAnnual
    hraExemption = Math.min(condition1, condition2, condition3)
  }

  // 4. Home Loan Interest (Section 24b)
  let homeLoanInterestOld = 0
  let homeLoanInterestNew = 0
  const hlInterestAnnual = Number(state.homeLoanInterestAnnual || 0)
  if (state.homeLoanType === 'self_occupied') {
    homeLoanInterestOld = Math.min(hlInterestAnnual, 200000)
    homeLoanInterestNew = 0 // Not allowed in New Regime
  } else if (state.homeLoanType === 'rented_out') {
    // For rented out, old regime allows up to 2L loss to be set off against salary.
    // New regime restricts set-off of house property loss against salary.
    homeLoanInterestOld = Math.min(hlInterestAnnual, 200000) 
    homeLoanInterestNew = 0 // Strictly speaking, no set-off of house property loss against salary in New Regime
  }

  // 5. Section 80C
  let eightyC = pfEmployeeAnnual
  if (state.homeLoanType === 'self_occupied' || state.homeLoanType === 'rented_out') {
    // Just a dummy estimate for principal if hl interest exists, but user inputs separate 80C
  }
  if (state.has80C === true) {
    eightyC += Number(state.investments80CAnnual || 0)
  }
  const eightyCOld = Math.min(eightyC, 150000)

  // 6. Section 80D (Health Insurance)
  const healthPremium = state.hasHealthInsurance === true ? Number(state.healthInsuranceAnnual || 0) : 0
  const eightyDOld = Math.min(healthPremium, 75000) // Upper bound assuming senior parents

  // 7. Section 80E (Education Loan)
  const eduLoanInterest = state.hasEducationLoan === true ? Number(state.educationLoanInterestAnnual || 0) : 0
  const eightyEOld = eduLoanInterest // No upper limit

  // 8. NPS - 80CCD(1B) and 80CCD(2)
  const npsPersonal = state.npsType === 'self' ? Number(state.npsPersonalAnnual || 0) : 0
  const npsPersonalOld = Math.min(npsPersonal, 50000)
  
  const npsEmployerPercent = Number(state.npsEmployerPercent || 0)
  const npsEmployer = (state.npsType === 'self' || state.npsType === 'employer_only') 
    ? (basicAnnual * npsEmployerPercent / 100) 
    : 0
  
  // Employer NPS is added to gross (as perquisite) and then deducted under both regimes
  grossSalary += npsEmployer
  const npsEmployerDeduction = npsEmployer

  // 9. Total Income
  const totalGrossIncome = grossSalary + bonus

  // 10. Compute Taxable Income
  // OLD REGIME
  let oldTaxable = totalGrossIncome 
    - standardDeductionOld 
    - ptAnnual 
    - hraExemption 
    - homeLoanInterestOld
    - eightyCOld
    - eightyDOld
    - eightyEOld
    - npsPersonalOld
    - npsEmployerDeduction

  oldTaxable = Math.max(0, oldTaxable)

  // NEW REGIME
  let newTaxable = totalGrossIncome
    - standardDeductionNew
    - npsEmployerDeduction // 80CCD(2) is allowed in new regime!
    // No HRA, No PT, No 80C, No 80D, No 80E, No HL (self occupied)

  newTaxable = Math.max(0, newTaxable)

  // 11. Select Slabs
  let oldSlabs = OLD_REGIME_SLABS
  if (state.ageGroup === 'senior_60_79') oldSlabs = OLD_REGIME_SENIOR_SLABS
  if (state.ageGroup === 'super_senior_80') oldSlabs = OLD_REGIME_SUPER_SENIOR_SLABS

  // 12. Calculate Tax
  let oldTax = calculateTaxFromSlabs(oldTaxable, oldSlabs)
  let newTax = calculateTaxFromSlabs(newTaxable, NEW_REGIME_SLABS)

  // 13. Rebate 87A
  oldTax = applyRebate(oldTax, oldTaxable, 'old')
  newTax = applyRebate(newTax, newTaxable, 'new')

  // 14. Cess (4%)
  const oldCess = oldTax * 0.04
  const newCess = newTax * 0.04

  const finalOldTax = Math.round(oldTax + oldCess)
  const finalNewTax = Math.round(newTax + newCess)

  return {
    grossIncome: totalGrossIncome,
    old: {
      taxable: Math.round(oldTaxable),
      baseTax: Math.round(oldTax),
      cess: Math.round(oldCess),
      totalTax: finalOldTax,
      takeHome: Math.round(totalGrossIncome - finalOldTax - pfEmployeeAnnual - ptAnnual - npsPersonal - npsEmployer),
      breakdown: {
        standardDeduction: standardDeductionOld,
        hraExemption: Math.round(hraExemption),
        pt: ptAnnual,
        homeLoan: Math.round(homeLoanInterestOld),
        sec80c: Math.round(eightyCOld),
        sec80d: Math.round(eightyDOld),
        sec80e: Math.round(eightyEOld),
        nps80ccd1b: Math.round(npsPersonalOld),
        nps80ccd2: Math.round(npsEmployerDeduction)
      }
    },
    new: {
      taxable: Math.round(newTaxable),
      baseTax: Math.round(newTax),
      cess: Math.round(newCess),
      totalTax: finalNewTax,
      takeHome: Math.round(totalGrossIncome - finalNewTax - pfEmployeeAnnual - ptAnnual - npsPersonal - npsEmployer),
      breakdown: {
        standardDeduction: standardDeductionNew,
        nps80ccd2: Math.round(npsEmployerDeduction)
      }
    }
  }
}
