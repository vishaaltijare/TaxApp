export function computeStepSequence(state) {
  const steps = [
    'age', 
    'salary', 
    'state', 
    'city', 
    'rent_question',
    'hra_question',
    'home_loan_question',
    'pf_question',
    'investments_80c_question',
    'health_insurance_question',
    'education_loan_question',
    'nps_question',
    'bonus_question',
    'review'
  ]

  return steps
}

// Maps any step ID → the main step number (1-13) shown in progress bar
export const STEP_TO_MAIN = {
  age: 1,
  salary: 2,
  state: 3, city: 3,
  rent_question: 4, rent_amount: 4,
  hra_question: 5, hra_amount: 5,
  home_loan_question: 6, home_loan_interest: 6,
  pf_question: 7, basic_salary: 7,
  investments_80c_question: 8, investments_80c_amount: 8,
  health_insurance_question: 9, health_insurance_amount: 9,
  education_loan_question: 10, education_loan_amount: 10,
  nps_question: 11, nps_personal_amount: 11, nps_employer_percent: 11,
  bonus_question: 12, bonus_amount: 12,
  review: 13,
}

export const TOTAL_MAIN_STEPS = 13

export const MAIN_STEP_LABELS = [
  'Age', 'Salary', 'Location', 'Rent', 'HRA',
  'Home Loan', 'PF', 'Investments', 'Insurance',
  'Edu Loan', 'NPS', 'Bonus', 'Review',
]
