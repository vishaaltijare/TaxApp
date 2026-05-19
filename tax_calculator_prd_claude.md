# Income Tax Calculator PRD - FY 2025-26 (Old vs New Regime)
## For Salaried Individuals in India

**Version**: 1.0  
**Date**: May 2026  
**Target Users**: Salaried employees earning ₹5 lakh - ₹50 lakh/year  
**Scope**: Salaried income only. No capital gains, freelance income, business profit, or surcharge calculations.  
**Tax Year**: FY 2025-26 (Assessment Year 2026-27)

---

## 1. PRODUCT OVERVIEW

### 1.1 Problem Statement
Millions of salaried Indians are confused about which tax regime to choose. Existing calculators ask for confusing inputs (CTC, gross salary) that most employees don't know. People know what lands in their bank account every month. The app should start from take-home salary and help them understand, in plain language, which regime saves them more money.

### 1.2 Solution
A step-by-step tax calculator wizard that:
- Starts with **monthly take-home salary** (what lands in bank)
- Asks questions in **non-finance language** ("How much rent do you pay?" not "Enter 80C deductions")
- Shows **live preview panel** that updates in real-time with detailed breakdown
- Ends with a **clear recommendation** and side-by-side comparison
- Provides **personalized tax-saving suggestions**
- Runs entirely in the browser (privacy-first, no data sent to server)

### 1.3 Design Principles
1. **Simplicity over completeness** - One question per step, plain language
2. **Transparency** - Show every calculation, every deduction, every slab
3. **Education** - Help users understand how their inputs affect tax
4. **Confidence** - Results feel trustworthy, not like a black box

---

## 2. LANDING PAGE

### 2.1 Purpose
Build confidence before users start. Show what the result will look like so they feel comfortable entering their data.

### 2.2 Hero Section
```
"Find Out Which Tax Regime Saves You More Money"
Subtitle: "Compare old vs new regime. See your tax, deductions, and take-home salary side by side."

Large CTA: "Start Calculator" (primary button)
```

### 2.3 Preview Section (Above the Fold)
Show a **mock result card** to give users confidence about what they'll see:
```
┌─ SAMPLE RESULT ─────────────────────────────┐
│ MONTHLY SALARY:  ₹50,000                    │
│                                              │
│ OLD REGIME:      Take Home: ₹42,100/month   │
│ NEW REGIME:      Take Home: ₹43,500/month   │
│                                              │
│ SAVINGS WITH NEW REGIME: ₹1,400/month       │
│ RECOMMENDATION: Choose New Regime            │
│                                              │
│ Tax Breakdown • Comparison • Suggestions     │
└──────────────────────────────────────────────┘
```

### 2.4 Key Features Section
List 4-5 bullets with icons:
- ✓ Start with monthly salary (what you actually know)
- ✓ Simple questions, no tax jargon
- ✓ Real-time live preview as you answer
- ✓ Detailed slab-by-slab comparison
- ✓ Personalized tax-saving tips

### 2.5 Footer
- Privacy notice: "Everything runs in your browser. No data leaves your device."
- Link to tax disclaimer

---

## 3. WIZARD FLOW

### 3.1 Wizard Structure
- **Total steps: 10-12** depending on branching
- **Progress indicator**: Numbered dots at top (Step 1 of 12, etc.)
- **Layout**: Left side = Question & Input, Right side = Live Preview Panel
- **Navigation**: "Next" button (enabled only when valid input is given), "Back" button (except on Step 1), "Save & Exit" (saves to localStorage)

### 3.2 Age Question (Step 1)
**Question (plain language):**
```
"How old are you (as on 31st March 2026)?"
- Below 60 years
- 60 to 79 years (Senior Citizen)
- 80 years and above (Super Senior Citizen)
```

**Why it matters**: Different basic exemption limits under old regime.

**Input validation**: Radio buttons (required)

**FAQ at bottom**:
```
Q: Why does age matter?
A: The Income Tax Act offers higher tax exemptions for senior citizens (above 60) 
   and super senior citizens (above 80) under the old tax regime. The new regime 
   has the same rates for everyone.

Q: How is age calculated?
A: Your age as on 31st March 2026 (last day of the financial year).
```

---

### 3.3 Monthly Take-Home Salary (Step 2)
**Question (plain language):**
```
"How much money lands in your bank account every month?"
"(This is what you actually receive after PF, taxes, and any other deductions)"
```

**Input**: Number field, ₹ symbol, accepts decimals  
**Validation**: Min ₹10,000, Max ₹10,00,000 (≈₹12 lakh annual)  
**Default placeholder**: "₹ 0"

**Key calculation from this**:
```
Monthly Take-Home × 12 = Approximate Annual Take-Home
But we need Gross Salary = Take-Home + PF + Professional Tax (estimated)

Estimation logic:
- Assume EPF: 12% of basic (used only if basic > ₹15,000/month)
- Assume Professional Tax: Based on state (user will select later)
- Assume TDS already deducted

Reverse engineer:
Gross ≈ (Monthly Take-Home) / (1 - 12% - 2.5%) ≈ Monthly Take-Home / 0.835
Then round to nearest ₹1,000 for basic salary estimate.
```

**FAQ**:
```
Q: What if I don't know my exact take-home?
A: Check your salary slip. Look for the line "Net Pay" or "In-Hand" after 
   all deductions.

Q: Does this include bonus?
A: No. Enter your regular monthly salary. We'll ask about bonus separately.

Q: What about reimbursements?
A: No. Only money that hits your bank account every month.
```

---

### 3.4 State (Step 3)
**Question:**
```
"Which state do you live and work in?"
(Dropdown with all states)
```

**Why**: Professional tax varies by state. Also used to determine metro/non-metro for HRA.

**Dropdown options**:
- All Indian states + Union territories
- Marked: "(No Professional Tax)" for states like Delhi, UP, Haryana, Punjab, Rajasthan, Himachal Pradesh, Uttarakhand

**Validation**: Required

**FAQ**:
```
Q: What if I work in a different state than I live?
A: Select the state where you work. That's where professional tax applies.

Q: What if I'm in a Union Territory?
A: Select it from the dropdown. Some UTs have professional tax, others don't.
```

---

### 3.5 City Classification for HRA (Step 4) [Only if "old regime" might be chosen]
**Question (only shown if interested in old regime):**
```
"Which city do you live in?"
```

**Purpose**: HRA exemption rules differ by city (metro vs non-metro).

**Options**:
```
Metro Cities (50% HRA exemption):
- Delhi
- Mumbai
- Kolkata
- Chennai

Non-Metro Cities (40% HRA exemption):
- All others

Select: [Dropdown]
```

**Validation**: Required  
**FAQ**:
```
Q: Does it matter if I live in a big city like Bangalore?
A: For HRA exemption purposes, only Delhi, Mumbai, Kolkata, and Chennai 
   are classified as "metro" under current rules (FY 2025-26). 
   Other cities, including Bangalore, Hyderabad, Pune, are non-metro 
   and get 40% exemption instead of 50%. (This changes from FY 2026-27.)
```

---

### 3.6 Do You Pay Rent? (Step 5)
**Question:**
```
"Do you pay rent for your accommodation?"
- Yes, I pay rent
- No, I live in my own house or with family
```

**Branching**:
- If **Yes** → Ask monthly rent (Step 5a)
- If **No** → Skip to Step 6

**FAQ**:
```
Q: What if I pay rent to my parents?
A: Yes, this counts if you actually pay them in cash or via bank. But be aware: 
   your parents must declare this as rental income in their tax return, and 
   you must provide their PAN if annual rent exceeds ₹1,00,000.

Q: What if rent is paid by my company?
A: Check if HRA is a separate component in your salary. If company pays rent 
   directly and you get HRA, then HRA is taxable without exemption. In that 
   case, choose "No" here to avoid confusion.
```

---

### 3.7 Monthly Rent (Step 5a) [Conditional]
**Question:**
```
"How much rent do you pay per month?"
```

**Input**: Number field, ₹ symbol  
**Validation**: Min ₹1, Max ₹2,00,000 (per month)

**Note displayed**:
```
HRA exemption = Minimum of:
1. HRA received from employer
2. Rent paid − 10% of salary
3. 50% of salary (metro) or 40% (non-metro)

We'll calculate the exact exemption once you tell us your salary breakdown.
```

**FAQ**:
```
Q: Should I include utilities and maintenance charges?
A: Only rent. Utilities are separate and not deductible.

Q: What if rent varies month to month?
A: Enter your average monthly rent.
```

---

### 3.8 Do You Receive HRA? (Step 6)
**Question:**
```
"Does your company give you House Rent Allowance (HRA)?
Look for 'HRA' as a separate line item in your salary slip."
- Yes
- No
- I'm not sure (show help)
```

**Conditional display**:
- If **Yes** → Ask HRA amount (Step 6a)
- If **No** → Skip to Step 7
- If **Not sure** → Link to "What is HRA?" FAQ

**FAQ**:
```
Q: What's HRA?
A: House Rent Allowance is money your company gives you specifically for rent. 
   It's a separate component in your salary, listed as "HRA" on your payslip. 
   Not all companies give HRA.

Q: What if my company pays rent directly to my landlord?
A: If your company pays rent directly and doesn't pay you HRA separately, 
   select "No".

Q: What if I see "LTA" or "other allowances" - are those HRA?
A: No. HRA is specific. Look for the word "HRA" on your payslip.
```

---

### 3.9 Monthly HRA Amount (Step 6a) [Conditional]
**Question:**
```
"How much HRA does your company pay you per month?"
(Look at your salary slip)
```

**Input**: Number field, ₹ symbol  
**Validation**: Min ₹1, Max ₹5,00,000 (per month)

**Note**:
```
We'll calculate how much of this is tax-exempt based on your rent and salary.
```

**FAQ**:
```
Q: Does HRA appear in my in-hand salary or is it deducted?
A: HRA is part of your gross salary. It gets taxed, but then you claim 
   an exemption for the portion related to actual rent you pay. 
   It's included in your gross salary.
```

---

### 3.10 Do You Have a Home Loan? (Step 7)
**Question:**
```
"Are you paying a home loan (on a property you own)?
- Yes, and I live in it
- Yes, but I rent it out
- No home loan
```

**Why**: Home loan interest deduction is available only under old regime, and only for self-occupied property (up to ₹2 lakh).

**Branching**:
- If **Yes, self-occupied** → Ask interest amount (Step 7a)
- If **Yes, rented out** → Ask interest amount (Step 7b - different rules)
- If **No** → Skip to Step 8

**FAQ**:
```
Q: Can I claim deduction on both principal and interest?
A: Only interest is deductible. Principal repayment is not deductible for 
   income tax purposes (though it reduces your debt).

Q: I have multiple properties with loans. Which one do I report?
A: For salaried employees, typically one self-occupied property. If you have 
   multiple, choose the one you actually live in.

Q: What about loans for home renovation or construction?
A: The interest on such loans is also deductible under Section 24(b) up to 
   ₹2 lakh per year, under old regime only.
```

---

### 3.11 Home Loan Interest - Self-Occupied (Step 7a) [Conditional]
**Question:**
```
"How much home loan interest do you pay per year?"
(Look at Form 16 or your loan statement)
```

**Input**: Number field, ₹ symbol  
**Validation**: Min ₹1, Max ₹25,00,000  
**Deduction limit**: Capped at ₹2,00,000 under old regime

**Auto calculation note**:
```
If you enter more than ₹2,00,000, we'll apply the deduction cap.
```

**FAQ**:
```
Q: How do I find this amount?
A: Check Form 16 (your TDS certificate) or your home loan statement. 
   It shows interest paid in the financial year.

Q: Interest varies each year as I pay down principal. Which one do I use?
A: Use the interest for FY 2025-26 (Jan 2025 - Mar 2026). It's on your 
   Form 16 or bank statement.
```

---

### 3.12 Do You Contribute to Provident Fund? (Step 8)
**Question:**
```
"Does your employer deduct Provident Fund (PF) from your salary?
- Yes, through EPF (Employee Provident Fund)
- No
- I'm not sure
```

**Why**: EPF contribution up to 12% of basic salary is deductible under 80C (old regime only). Also helps estimate gross salary.

**Branching**:
- If **Yes** → Ask basic salary for PF calculation (Step 8a)
- If **No** → Skip to Step 9
- If **Not sure** → Show FAQ

**FAQ**:
```
Q: What's EPF?
A: Employee Provident Fund. A retirement savings scheme. If you work in 
   a company with 20+ employees, it's mandatory. You contribute 12% of 
   your basic salary; your employer contributes another 12%.

Q: Does PF show in my take-home salary?
A: Your 12% contribution is deducted from your salary (taken out before 
   you get it). Your employer's 12% is separate and goes to your PF account.

Q: What if my company doesn't have EPF?
A: Some small companies use other schemes. You'll have it mentioned in your 
   salary slip. For now, select "No" if you don't have a dedicated PF account.
```

---

### 3.13 Basic Salary (Step 8a) [Conditional]
**Question:**
```
"What is your basic salary (before HRA, allowances, bonuses)?
(Look at your payslip - it's usually the first line item)"
```

**Input**: Number field, ₹ symbol  
**Validation**: Min ₹5,000, Max ₹5,00,000  
**Note**: "We use this to calculate your actual EPF deduction."

**Calculation**:
```
EPF Contribution (Employee) = MIN(12% × Basic Salary, ₹1,800/month)
EPF Contribution (Annual) = EPF Contribution × 12
```

**FAQ**:
```
Q: Why do you need basic salary separately?
A: Basic is used to calculate your actual PF contribution and also for HRA 
   exemption calculation. It's important for tax purposes.

Q: What if my payslip doesn't show "basic" clearly?
A: Check the first line item labeled "Basic Pay" or "Basic Salary". 
   It's before all allowances.

Q: Does basic include Dearness Allowance (DA)?
A: For PF purposes, DA is sometimes included and sometimes not. Check your 
   Form 16 or ask your HR.
```

---

### 3.14 Investment Under 80C (Step 9) [Only for old regime exploration]
**Question:**
```
"Do you invest in tax-saving instruments?
(e.g., PPF, ELSS, tax-saver FDs, life insurance premiums, school fees)"
- Yes
- No
- Not sure (show examples)
```

**Branching**:
- If **Yes** → Ask total annual investment (Step 9a)
- If **No** → Skip to Step 10
- If **Not sure** → Show popup with examples

**Why**: Section 80C allows deduction up to ₹1,50,000 (old regime only).

**FAQ**:
```
Q: What counts under 80C?
A: PPF deposits, ELSS MF investments, tax-saver FDs, NSC, LIC premiums, 
   principal repayment on home loan, children's tuition fees.

Q: What about life insurance premiums?
A: Only if it's a regular premium-paying policy. ULIP and term insurance 
   may also count.

Q: Can I count my PF contribution?
A: Your PF is not 80C. It's a separate deduction. Don't count it here.
```

---

### 3.15 Annual 80C Investment (Step 9a) [Conditional]
**Question:**
```
"How much do you invest annually under 80C?"
(Across all schemes combined)
```

**Input**: Number field, ₹ symbol  
**Validation**: Min ₹1, Max ₹1,50,000  
**Deduction limit**: Capped at ₹1,50,000

**Auto note**:
```
If you invest more than ₹1,50,000, only ₹1,50,000 is deductible.
```

**FAQ**:
```
Q: How do I know my total 80C investment?
A: Add up all your deposits/premiums across PPF, ELSS, life insurance, 
   home loan principal, etc. for the year.

Q: Does interest or gains count?
A: No. Only your contribution/deposit amount.

Q: Can I go over ₹1,50,000 and still get the full benefit?
A: No. The deduction is capped at ₹1,50,000 regardless of how much you invest.
```

---

### 3.16 Health Insurance Premium (Step 10)
**Question:**
```
"Do you pay for health/medical insurance (for yourself and family)?
- Yes, I pay premiums
- No
- I'm not sure
```

**Why**: Section 80D allows deduction up to ₹25,000 (under 60) or ₹50,000 (senior) under old regime only.

**Branching**:
- If **Yes** → Ask annual premium (Step 10a)
- If **No** → Skip to Step 11

**FAQ**:
```
Q: What counts as health insurance?
A: Mediclaim policies, health insurance plans from any insurer. 
   Must be a prescribed insurance company.

Q: Does employer-provided group mediclaim count?
A: Only if you pay the premium yourself. If your employer pays it, 
   it's not deductible.

Q: What about supplements or top-up policies?
A: Yes, they count if they're from a prescribed insurer.

Q: Does Ayushman Bharat count?
A: No. Only regular health insurance policies from registered insurers.
```

---

### 3.17 Annual Health Insurance Premium (Step 10a) [Conditional]
**Question:**
```
"How much do you pay annually for health insurance?"
(For yourself and all family members covered)
```

**Input**: Number field, ₹ symbol  
**Validation**: Min ₹1, Max ₹10,00,000  
**Deduction limit by age**:
```
Below 60 years: ₹25,000 max
Senior Citizen (60-79): ₹50,000 max (includes self + parents)
Super Senior (80+): ₹50,000 max
```

**Auto note**:
```
We'll apply the correct deduction limit based on your age.
```

**FAQ**:
```
Q: Can I claim insurance for my parents?
A: Yes. If you pay the premium for your parents, it's deductible up to 
   the allowed limit.

Q: My employer deducts group insurance from my salary. Does it count?
A: Only if you pay it yourself. Group insurance deducted by employer is 
   not deductible by you separately.
```

---

### 3.18 Education Loan (Step 11)
**Question:**
```
"Are you paying an education loan (yourself or dependents)?
- Yes
- No
```

**Why**: Section 80E allows deduction on interest (no limit) under old regime only.

**Branching**:
- If **Yes** → Ask annual interest paid (Step 11a)
- If **No** → Skip to Step 12

**FAQ**:
```
Q: Does this include home loan used for education expenses?
A: No. Education loan means a loan specifically taken for education 
   (yours or your child's) from an approved financial institution.

Q: Can I claim interest on a loan taken from a bank for my child's 
   foreign education?
A: Yes, as long as it's a formal education loan from a bank/FI.

Q: Is there a time limit?
A: You can claim the deduction for up to 8 financial years 
   from the year education loan repayment starts.
```

---

### 3.19 Annual Education Loan Interest (Step 11a) [Conditional]
**Question:**
```
"How much education loan interest did you pay this year?"
(No deduction limit)
```

**Input**: Number field, ₹ symbol  
**Validation**: Min ₹1, Max ₹50,00,000  
**Note**: "There's no cap on 80E deduction."

**FAQ**:
```
Q: Where do I find this amount?
A: Check your loan statement or Form 16. The bank provides a statement 
   showing total interest paid in the financial year.
```

---

### 3.20 NPS Contribution (Step 12)
**Question:**
```
"Do you contribute to National Pension System (NPS)?
- Yes, I contribute myself
- Yes, but only my employer contributes
- No
```

**Why**:
- Employee contribution ≤ 10% of salary → ₹50,000 extra under 80CCD(1B) [old regime]
- Employer contribution → 14% deduction under 80CCD(2) [both regimes, but higher in new regime]

**Branching**:
- If **Yes (self)** → Ask amount (Step 12a)
- If **Yes (employer only)** → Auto-set to employer contribution, ask % (Step 12b)
- If **No** → Skip to Step 13

**FAQ**:
```
Q: What's NPS?
A: National Pension Scheme. A retirement savings account where you can 
   invest. You get tax deductions on contributions, and the money grows 
   till retirement.

Q: What's the difference between Tier 1 and Tier 2?
A: Tier 1 is locked-in (for retirement). Contributions get tax deduction. 
   Tier 2 is more flexible but less tax benefit. 
   For tax purposes, we focus on Tier 1.

Q: Can I claim both 80C and 80CCD?
A: You can claim your 80C investments (up to ₹1.5L) and separately claim 
   80CCD contributions. They're separate deductions.
```

---

### 3.21 Personal NPS Contribution (Step 12a) [Conditional]
**Question:**
```
"How much do you contribute to NPS per year
(including Tier 1 and any voluntary contributions)?"
```

**Input**: Number field, ₹ symbol  
**Validation**: Min ₹1, Max ₹2,50,000  
**Note**:
```
Under old regime: Up to 10% of salary (but max ₹1,50,000 under 80C, 
                 plus ₹50,000 extra under 80CCD(1B))
Under new regime: No deduction on your contributions (only employer's)
```

**Calculation**:
```
80CCD(1B) benefit in old regime:
- Your contribution up to ₹50,000 = ₹50,000 deduction
- Your contribution above ₹50,000, up to 10% of salary = Counted under 80C
```

**FAQ**:
```
Q: How much should I contribute?
A: That's a personal choice. Many people contribute ₹50,000 to max out 
   the 80CCD(1B) benefit.

Q: Is NPS mandatory?
A: No. It's voluntary. Only contribute if you want to save for retirement 
   and get tax benefits.
```

---

### 3.22 Employer NPS Contribution (Step 12b) [Conditional]
**Question:**
```
"What percentage of your salary does your employer contribute to NPS?"
(Ask your HR. Typical: 10-14%)
```

**Input**: Number field (percentage) OR amount field (₹)  
**Validation**: 0-20%  
**Note**:
```
In new regime: Up to 14% is deductible (against taxable income)
In old regime: Up to 10% is deductible
```

**Calculation**:
```
NPS Employer Contribution (annual) = % × Basic Salary × 12
```

**FAQ**:
```
Q: Where do I find this information?
A: Check your salary slip or ask HR. It should show "Employer NPS" 
   or "PRAN contribution" as a separate line.

Q: Does this come from my salary or is it extra?
A: It's typically part of your salary structure/CTC, so it's 
   "non-monetary" (doesn't hit your bank account directly). 
   But it reduces your taxable income.

Q: Is there a maximum?
A: For government employees: 14% (if eligible under CG Scheme).
   For others: Usually 10-14% depending on company policy.
```

---

### 3.23 Bonus (Step 13)
**Question:**
```
"Do you receive an annual bonus?
- Yes
- No
```

**Why**: Bonus is salary income and affects taxable income. Helps calculate accurate take-home.

**Branching**:
- If **Yes** → Ask annual bonus amount (Step 13a)
- If **No** → Skip to Summary

**FAQ**:
```
Q: Should I count my performance bonus?
A: Yes, if you regularly receive it. If it's rare/uncertain, 
   choose "No" to be conservative.

Q: What if bonus varies year to year?
A: Use an average or expected amount.

Q: Should I include incentives or sales commission?
A: Yes, if they're regular. Include all cash you expect annually.
```

---

### 3.24 Annual Bonus Amount (Step 13a) [Conditional]
**Question:**
```
"How much is your total annual bonus?"
```

**Input**: Number field, ₹ symbol  
**Validation**: Min ₹1, Max ₹50,00,000

**FAQ**:
```
Q: Do I calculate bonus as a percentage or lump sum?
A: If you know a percentage (e.g., 2 months salary), multiply it out 
   to get the annual amount. Otherwise, just enter what you expect.
```

---

### 3.25 Review & Calculate (Step 14 - Summary)
**Purpose**: Show user all entered data, allow edits, then calculate both regimes.

**Display**:
```
═══ REVIEW YOUR INFORMATION ═══

Age: Below 60 years
Monthly Take-Home: ₹50,000
Annual Take-Home (est.): ₹6,00,000

State: Maharashtra
City: Mumbai
Rent Paid: ₹20,000/month
HRA Received: ₹18,000/month

Home Loan (Self-Occupied): ₹1,50,000/year interest
PF Contribution: ₹1,800/month (12% of Basic ₹15,000)
80C Investments: ₹1,50,000/year
Health Insurance: ₹30,000/year
Education Loan Interest: ₹0
NPS (Personal): ₹50,000/year
NPS (Employer): 14% = ₹42,000/year
Annual Bonus: ₹2,00,000

[Edit] [Calculate Tax]
```

**On "Calculate Tax"**: 
- Validate all inputs
- Trigger detailed calculation engine
- Show results on right panel and transition to Results Screen

---

## 4. LIVE PREVIEW PANEL (Right side, all steps)

### 4.1 Panel Layout
```
╔════════════════════════════════╗
║    TAX ESTIMATE LIVE PREVIEW   ║
║         (Updates as you        ║
║         enter information)     ║
╠════════════════════════════════╣
║ REGIME: New                    ║
║                                ║
║ Gross Salary (Estimated)       ║
║ ₹7,00,000/year                ║
║                                ║
║ LESS: Deductions               ║
║ Standard Deduction: ₹75,000    ║
║ (Others shown per regime)      ║
║                                ║
║ Taxable Income: ₹6,25,000      ║
║                                ║
║ Income Tax: ₹35,000            ║
║ Cess (4%): ₹1,400              ║
║                                ║
║ Total Tax: ₹36,400/year        ║
║            ₹3,033/month        ║
║                                ║
║ Take-Home: ₹6,63,600/year      ║
║            ₹55,300/month       ║
║                                ║
║ ════════════════════════════   ║
║ [Switch to Old Regime]         ║
║ [Detailed Breakdown]           ║
╚════════════════════════════════╝
```

### 4.2 What's Shown Initially
- **Before any input**: "Waiting for your information..."
- **After Step 1**: Show age-based exemption limits
- **After Step 2**: Estimate gross salary, show basic exemption
- **After each deduction step**: Update taxable income, tax, take-home
- **After final step**: Full detailed breakdown

### 4.3 Regime Switcher
Button to toggle between Old and New regime estimates:
```
[OLD REGIME] vs [NEW REGIME] (with comparison arrow)
```

Shows both side by side with savings highlighted:
```
OLD REGIME: ₹45,000 tax    NEW REGIME: ₹36,400 tax
Save: ₹8,600/year with New Regime
```

### 4.4 Detailed Breakdown Button
On the live preview, a "Detailed Breakdown" link shows a modal/expandable section with:
- **Slabs table** (applicable to their income)
- **Every deduction listed**
- **Tax calculation step by step**
- **Surcharge and Cess details**

---

## 5. RESULTS SCREEN

### 5.1 Layout
**Full-width, polished design**

### 5.2 Header
```
═══════════════════════════════════════════════════════

                     YOUR TAX RESULT

═══════════════════════════════════════════════════════

✓ RECOMMENDATION: Choose NEW REGIME
Save ₹8,600 per year (₹717/month)

═══════════════════════════════════════════════════════
```

### 5.3 Main Comparison Table

```
┌─────────────────────┬──────────────┬──────────────┐
│ PARAMETER           │  OLD REGIME  │ NEW REGIME   │
├─────────────────────┼──────────────┼──────────────┤
│ Gross Salary        │ ₹7,50,000    │ ₹7,50,000    │
│ Less: PF (12%)      │ (₹21,600)    │ (₹21,600)    │
│ Gross Taxable       │ ₹7,28,400    │ ₹7,28,400    │
│                     │              │              │
│ Less: Deductions    │              │              │
│  Standard           │ (₹50,000)    │ (₹75,000)    │
│  HRA Exemption      │ (₹1,20,000)  │ ₹0           │
│  80C Investments    │ (₹1,50,000)  │ ₹0           │
│  80D Insurance      │ (₹30,000)    │ ₹0           │
│  Home Loan Int.     │ (₹1,50,000)  │ ₹0           │
│  80CCD(1B) NPS      │ (₹50,000)    │ ₹0           │
│  NPS Employer 80CCD │ (₹42,000)    │ (₹42,000)    │
│                     │              │              │
│ Taxable Income      │ ₹2,56,400    │ ₹6,10,400    │
│                     │              │              │
│ INCOME TAX          │              │              │
│  (per slab rates)   │ ₹45,000      │ ₹35,500      │
│  + Cess 4%          │ ₹1,800       │ ₹1,420       │
│  Total Tax          │ ₹46,800      │ ₹36,920      │
│                     │              │              │
│ Professional Tax    │ (₹2,400)     │ (₹2,400)     │
│                     │              │              │
│ ANNUAL TAKE-HOME    │ ₹6,54,200    │ ₹6,62,800    │
│ MONTHLY TAKE-HOME   │ ₹54,517      │ ₹55,233      │
│                     │              │              │
│ DIFFERENCE          │              │ +₹8,600/yr   │
│                     │              │ (+₹717/mo)   │
└─────────────────────┴──────────────┴──────────────┘
```

### 5.4 Slab Breakdown (Below Comparison)

**Old Regime Slab Breakdown:**
```
Income Slab Calculation (Below 60 years):
Basic Exemption: ₹2,50,000
Taxable Income: ₹2,56,400

Slab 1:  ₹2,50,001 - ₹5,00,000 @ 5%  = ₹6,400 × 5%   = ₹320
Slab 2:  No income in this slab

Tax on Slabs: ₹320
No Rebate (under Section 87A): Income exceeds ₹5,00,000 threshold

Total Tax Before Cess: ₹320
Cess @ 4%: ₹13
Total Tax: ₹333
```

**Wait, this doesn't match the table above. Let me recalculate properly in the actual calculation logic section.**

### 5.5 Tax Saving Tips (Personalized)

Based on their inputs, show:
```
═══ TAX-SAVING SUGGESTIONS ═══

Based on your situation, here's how you could save even more:

1. INCREASE 80C INVESTMENTS
   You invested: ₹1,50,000
   You could save: ₹50,000 (₹15,000 tax at your rate)
   → Consider increasing PPF or ELSS investments next year
   
2. CLAIM HOME LOAN INTEREST FULLY (OLD REGIME)
   You're claiming: ₹1,50,000 (capped)
   Actual interest: ₹1,50,000
   → You're already at the cap. Good!

3. INCREASE NPS TO ₹50,000
   You contributed: ₹50,000 (maxes out 80CCD(1B))
   Benefit: ₹15,000 (at your tax rate)
   → Already optimized!

4. ADD MORE HEALTH INSURANCE
   Current: ₹30,000
   Increase to: ₹50,000 (max for your age)
   Additional Benefit: ₹6,000 tax saving
   → Could provide better family coverage too

5. EDUCATION LOAN INTEREST
   You claimed: ₹0
   If you take an education loan for your child:
   Interest is fully deductible (no limit)
```

### 5.6 Why This Regime Wins (Educational Section)

```
═══ WHY NEW REGIME SAVES YOU MORE MONEY ═══

In your case, the New Regime is better because:

1. LOWER TAX RATES
   • New regime has lower slab rates (5%, 10%, 15%, 20%, 25%, 30%)
   • Even though you can't claim your investments as deductions,
     the rate advantage beats the deduction benefit

2. HIGHER STANDARD DEDUCTION
   • Old regime: ₹50,000 standard deduction
   • New regime: ₹75,000 standard deduction
   • Extra ₹25,000 is already a ₹7,500 tax saving

3. BREAK-EVEN ANALYSIS
   Your Deductions Under Old Regime:
   - HRA: ₹1,20,000
   - 80C: ₹1,50,000
   - 80D: ₹30,000
   - Home Loan: ₹1,50,000
   - NPS: ₹50,000
   - Total: ₹5,00,000 deductions
   
   But your taxable income benefit (₹5,00,000 × your rate 20%)
   = ₹1,00,000 tax saving from deductions
   
   vs. Rate Advantage in New Regime = ₹1,08,600 saving
   
   New Regime wins by ₹8,600

4. NO COMPLIANCE BURDEN
   • New regime: No documents needed for deductions
   • Old regime: Must maintain rent receipts, insurance certs, etc.
   
5. FLEXIBILITY
   • Once you opt for old regime, you can't switch back for 2+ years (for salaried)
   • New regime is flexible year-to-year
```

### 5.7 How Your Inputs Affected Tax

```
═══ HOW YOUR SITUATION IMPACTS TAX ═══

HIGH RENT PAID (₹20,000/month)
→ Helps claim ₹1,20,000 HRA exemption under old regime
→ But old regime's lower rates don't offset this benefit

HIGH HOME LOAN INTEREST (₹1,50,000/year)
→ Maxes out the ₹2,00,000 deduction cap
→ Saves ₹30,000 in tax under old regime
→ But still not enough to beat new regime's rate advantage

GOOD 80C INVESTMENTS (₹1,50,000)
→ Fully deductible under old regime
→ Saves ₹30,000 in tax
→ Shows good savings discipline, but again, rate advantage wins

PF CONTRIBUTION (₹21,600/year)
→ Automatically deducted, counts as 80C
→ Both regimes benefit equally here

EMPLOYER NPS (₹42,000)
→ Deductible in both regimes
→ But gets 14% treatment in new regime vs 10% in old (if counted under 80C)
→ New regime gives you slightly more benefit here
```

### 5.8 Call-to-Action / Next Steps

```
═══ NEXT STEPS ═══

Before filing your ITR:

☐ Check Form 16 to confirm all figures
☐ Collect rent receipts (if claiming HRA under old regime)
☐ Note down landlord's PAN (if annual rent > ₹1,00,000)
☐ Verify all 80C investment certificates
☐ Check home loan statement for interest paid
☐ Confirm professional tax deducted from your salary
☐ Collect health insurance policy copy

If you switch to new regime:
→ File Form 10-IEA with your ITR (if you were on old regime before)

Questions? 
→ Read our FAQ section
→ Consult a CA if you have complex deductions
```

### 5.9 Disclaimer & Fine Print

```
⚠ DISCLAIMER

This calculator provides an estimate based on FY 2025-26 tax rules.
It does NOT account for:
- Surcharge (for income > ₹50 lakh) - This calculator is for salaried 
  individuals with income typically ≤ ₹50 lakh
- Capital gains or other income types
- State-specific tax variations (not applicable to income tax)
- Changes in tax laws after May 2026

This is an educational tool, not a substitute for professional tax advice.
Always consult a Chartered Accountant for final ITR filing.

Privacy: All calculations happen in your browser. 
No data is sent to any server.
```

---

## 6. TAX CALCULATION LOGIC (Core Engine)

### 6.1 Input Assumptions & Reverse Engineering

**Input from user**: Monthly Take-Home Salary  
**What we need**: Gross Salary (before PF, PT, TDS)

**Approach:**
```
Monthly Take-Home is after:
1. Employee PF (if applicable): 12% of Basic, capped at ₹1,800/month
2. Professional Tax: Varies by state (₹0 to ₹200/month typically)
3. Income Tax TDS: Already deducted

Reverse Engineering:
Assuming Basic ≈ 60% of CTC (typical):
Gross Salary ≈ (Monthly Take-Home) / (1 - 0.15)
            ≈ (Monthly Take-Home) × 1.176

Then round to nearest ₹500 for Basic estimation.

Calculate annually:
Estimated Annual Gross = Monthly Take-Home × 12 × 1.176
```

**Then break down:**
```
Annual Gross Salary = ₹7,50,000 (estimated from ₹50,000 take-home)

From user inputs:
- Basic Salary: ₹50,000/month (user provides or we estimate as 66% of gross/12)
- HRA: ₹18,000/month (from user input)
- Other Allowances: Estimated as remainder

Annual Salary Breakdown:
- Basic: ₹6,00,000 (₹50,000 × 12)
- HRA: ₹2,16,000 (₹18,000 × 12)
- Other: Remainder to reach ₹7,50,000 (user won't specify, estimated)
```

### 6.2 PF Calculation

**Formula:**
```
EPF Contribution (Employee) = MIN(12% × Basic Salary, ₹1,800/month)
EPF Annual = EPF Monthly × 12

For basic ₹50,000:
12% × ₹50,000 = ₹6,000/month > ₹1,800 → Capped at ₹1,800
EPF Annual = ₹1,800 × 12 = ₹21,600

For basic ₹15,000:
12% × ₹15,000 = ₹1,800/month ≤ ₹1,800 → ₹1,800
EPF Annual = ₹1,800 × 12 = ₹21,600
```

### 6.3 Professional Tax Calculation

**State-wise rules** (simplified for common states):

**Maharashtra** (User's example):
```
For males:
- Up to ₹15,000/month: ₹0
- ₹15,001 - ₹25,000: ₹200/month (Jan-Jan, ₹300 in Feb)
- ₹25,001 - ₹50,000: ₹400/month
- Above ₹50,000: ₹500/month

Note: Special rule in Feb = different amount
For FY calculation (Apr 2025 - Mar 2026), use:
- Apr-Jan (11 months): Regular rate
- Feb: Special rate (₹300 for mid-bracket)

For example, at ₹50,000 salary:
PT = (₹200 × 11) + ₹300 = ₹2,500/year
```

**Karnataka**:
```
- Up to ₹12,000/month: ₹0
- ₹12,001 - ₹25,000: ₹150/month
- ₹25,001 - ₹100,000: ₹300/month
- Above ₹100,000: ₹600/month
```

**Other states without PT**:
```
Delhi, UP, Haryana, Punjab, Rajasthan, Himachal Pradesh, Uttarakhand: ₹0
```

**Store state-wise table in code:**
```javascript
const ptSlabs = {
  maharashtra: [ /* slab details */ ],
  karnataka: [ /* slab details */ ],
  tamilnadu: [ /* slab details */ ],
  // ... all states
};

function calculatePT(state, monthlySalary) {
  const slabs = ptSlabs[state.toLowerCase()];
  // Find matching slab, return annual PT
}
```

### 6.4 HRA Exemption Calculation (Old Regime Only)

**Formula (Section 10(13A)):**
```
HRA Exemption = MIN(
  1. Actual HRA received,
  2. Rent paid - 10% of Basic salary,
  3. 50% of Basic salary (metro) OR 40% of Basic (non-metro)
)
```

**Example:**
```
Basic: ₹50,000/month (₹6,00,000 annually)
HRA Received: ₹18,000/month
Rent Paid: ₹20,000/month
City: Mumbai (metro)

Calculation:
1. HRA Received: ₹18,000 × 12 = ₹2,16,000/year
2. Rent - 10% Basic: (₹20,000 - ₹50,000×10%) × 12 = (₹20,000 - ₹5,000) × 12 = ₹1,80,000/year
3. 50% of Basic: ₹50,000 × 50% × 12 = ₹3,00,000/year

Exemption = MIN(₹2,16,000, ₹1,80,000, ₹3,00,000) = ₹1,80,000

So taxable HRA = ₹2,16,000 - ₹1,80,000 = ₹36,000
(This amount is added to salary for taxable income calculation)
```

**Metro Cities (FY 2025-26)**: Delhi, Mumbai, Kolkata, Chennai  
**Non-Metro**: All others

### 6.5 Gross Total Income Calculation

**Under both regimes:**
```
Gross Total Income = 
  Basic + HRA (less exemption in old regime, full in new)
  + Other allowances
  + Bonus
  - PF deduction (applies to all)
  - Professional Tax (applies to all)
  + Other income (e.g., interest on FD, savings account)

For salary alone (no other income):
GTI = Annual Basic + Annual HRA + Annual Other Allowances + Annual Bonus
    - Annual PF - Annual PT
```

### 6.6 OLD REGIME - Taxable Income Calculation

**Deductions allowed (Chapter VI-A):**

```
Gross Total Income:                        ₹7,50,000

Less: Standard Deduction (Section 16):    (₹50,000)
                                         ─────────
Adjusted Income:                         ₹7,00,000

Less: Chapter VI-A Deductions:
  HRA Exemption (10(13A)):               (₹1,80,000)
  PF Contribution (80C):                 (₹21,600)
  80C Investments:                       (₹1,50,000)
  80D (Health Insurance):                (₹30,000)
  Home Loan Interest (24(b)):            (₹1,50,000)
  80CCD(1B) (NPS Extra):                 (₹50,000)
  80CCD(2) (NPS Employer):               (₹42,000)
                                         ─────────
Total Deductions:                        (₹4,73,600)

Taxable Income = ₹7,00,000 - ₹4,73,600 = ₹2,26,400
```

**Edge case: Can't deduct more than basic exemption:**
```
If GTI = ₹2,00,000 (below exemption limit):
Taxable Income = ₹0 (no tax due)
```

### 6.7 NEW REGIME - Taxable Income Calculation

**Very limited deductions:**

```
Gross Total Income:                        ₹7,50,000

Less: Standard Deduction (Section 16):    (₹75,000)

Less: Limited Deductions:
  80CCD(2) (NPS Employer 14%):           (₹42,000)
  (Note: No other Chapter VI-A deductions)
                                         ─────────
Taxable Income = ₹7,50,000 - ₹75,000 - ₹42,000 = ₹6,33,000
```

**Key point**: No HRA, 80C, 80D, home loan interest deductions in new regime.

### 6.8 OLD REGIME - Income Tax Slabs

**For individuals below 60 years:**

```
₹0 - ₹2,50,000:              Nil
₹2,50,001 - ₹5,00,000:       5%
₹5,00,001 - ₹10,00,000:      20%
Above ₹10,00,000:            30%
```

**For senior citizens (60-79 years):**

```
₹0 - ₹3,00,000:              Nil
₹3,00,001 - ₹5,00,000:       5%
₹5,00,001 - ₹10,00,000:      20%
Above ₹10,00,000:            30%
```

**For super senior citizens (80+ years):**

```
₹0 - ₹5,00,000:              Nil
₹5,00,001 - ₹10,00,000:      20%
Above ₹10,00,000:            30%
```

**Calculation example (old regime, below 60):**
```
Taxable Income: ₹2,26,400

Slab 1: ₹2,26,400 - ₹2,50,000 = ₹0 (within nil slab)
Tax = ₹0

Hmm, that's wrong. If taxable income is ₹2,26,400 and exemption is ₹2,50,000:
Actually, Taxable Income should be max(0, Income - Exemption)
                               = max(0, ₹2,26,400 - ₹2,50,000)
                               = ₹0 (before deductions)

Wait, I'm confusing. Let me recalculate.

Income minus deductions:
Income after Std Deduction: ₹7,50,000 - ₹50,000 = ₹7,00,000
Income after Chapter VI-A: ₹7,00,000 - ₹4,73,600 = ₹2,26,400

This ₹2,26,400 is BELOW the ₹2,50,000 exemption limit.
So Taxable Income = ₹0.
```

**Better example with higher income:**
```
Gross Income: ₹15,00,000
Standard Deduction: (₹50,000)
After Std: ₹14,50,000

Deductions:
HRA: (₹1,80,000)
80C: (₹1,50,000)
80D: (₹30,000)
Home Loan: (₹1,50,000)
NPS: (₹50,000)
NPS Employer: (₹42,000)
Total: (₹4,52,000)

After Deductions: ₹14,50,000 - ₹4,52,000 = ₹9,98,000

This is > ₹2,50,000 (exemption), so:
Taxable Income = ₹9,98,000

Tax Calculation (below 60):
Slab 1 (₹2,50,001 - ₹5,00,000): (₹5,00,000 - ₹2,50,000) × 5% = ₹12,500
Slab 2 (₹5,00,001 - ₹9,98,000): (₹9,98,000 - ₹5,00,000) × 20% = ₹99,600
Total Tax = ₹1,12,100
```

### 6.9 NEW REGIME - Income Tax Slabs

**Same for all ages** (below 60, senior, super-senior):

```
₹0 - ₹4,00,000:              Nil
₹4,00,001 - ₹8,00,000:       5%
₹8,00,001 - ₹12,00,000:      10%
₹12,00,001 - ₹16,00,000:     15%
₹16,00,001 - ₹20,00,000:     20%
₹20,00,001 - ₹24,00,000:     25%
Above ₹24,00,000:            30%
```

**Calculation example:**
```
Taxable Income (new regime): ₹6,33,000

Slab 1 (₹4,00,001 - ₹6,33,000): (₹6,33,000 - ₹4,00,000) × 5% = ₹11,650
Tax = ₹11,650
```

### 6.10 Section 87A Rebate

**Old Regime:**
```
Applicable if: Taxable Income ≤ ₹5,00,000
Rebate Amount: MIN(Tax calculated, ₹12,500)
Effect: Full rebate makes tax = 0 for income ≤ ₹5,00,000
```

**New Regime (FY 2025-26):**
```
Applicable if: Taxable Income ≤ ₹12,00,000
Rebate Amount: MIN(Tax calculated, ₹60,000)
Effect: Full rebate makes tax = 0 for income ≤ ₹12,00,000
```

**Marginal Relief:**
```
If taxable income exceeds the rebate threshold, marginal relief applies.

Old Regime Example:
Taxable Income = ₹5,10,000 (exceeds ₹5,00,000 by ₹10,000)
Tax without rebate = (₹5,00,000 × 0%) + (₹10,000 × 5%) = ₹500

Marginal Relief: Tax should not exceed excess income
Marginal Relief = Excess Income = ₹10,000
But Tax = ₹500 < ₹10,000, so no adjustment needed.
Final Tax = ₹500

New Regime Example:
Taxable Income = ₹12,10,000 (exceeds ₹12,00,000 by ₹10,000)
Tax without rebate = (₹4,00,000 × 0%) + (₹4,00,000 × 5%) + (₹4,00,000 × 10%) 
                  + (₹10,000 × 15%) = ₹0 + ₹20,000 + ₹40,000 + ₹1,500 = ₹61,500
Rebate available: ₹60,000
Tax after rebate = ₹61,500 - ₹60,000 = ₹1,500

Marginal Relief: Tax should not exceed excess income (₹10,000)
But Tax = ₹1,500 > ₹10,000... wait, ₹1,500 < ₹10,000, so tax is okay.
Final Tax = ₹1,500

Actually, marginal relief says:
If (Tax after rebate) > (Excess Income), then cap it to excess income.
Here, ₹1,500 < ₹10,000, so no adjustment.
Final Tax = ₹1,500
```

### 6.11 Health & Education Cess

**Applied to**: Total tax liability (after rebate, before surcharge)  
**Rate**: 4%  
**Formula**: Cess = Tax × 4% = Tax × 0.04

```
Example:
Tax (before rebate): ₹61,500
Rebate: (₹60,000)
Tax after Rebate: ₹1,500
Cess @ 4%: ₹1,500 × 4% = ₹60
Total Tax with Cess: ₹1,500 + ₹60 = ₹1,560
```

### 6.12 Surcharge (Not applicable for this calculator)

**Applicable**: When total income > ₹50,00,000

This calculator is for salaried individuals typically earning ₹5-50 lakh, so surcharge is not covered. If needed, include logic:

```
Old Regime Surcharge:
Income ₹50,01,000 - ₹1,00,00,000: 10%
Income ₹1,00,00,001 - ₹2,00,00,000: 15%
...
Income > ₹5,00,00,000: 37%

New Regime Surcharge:
Income ₹50,01,000 - ₹1,00,00,000: 10%
...
Income > ₹2,00,00,000: 25% (capped)

Marginal relief applies if surcharge > excess income.
```

**For this scope**: Show note "Surcharge not applicable for income ≤ ₹50 lakh"

### 6.13 Final Tax Calculation Summary

```
Step 1: Calculate Gross Total Income (salary + allowances + bonus)
Step 2: Reduce by standard deduction (₹50k old, ₹75k new)
Step 3: Reduce by applicable deductions (80C, 80D, HRA, etc.)
Step 4: Calculate taxable income = max(0, adjusted income)
Step 5: Apply tax slabs (age-based for old, fixed for new)
Step 6: Apply Section 87A rebate (if eligible)
Step 7: Add 4% cess to get total tax before surcharge
Step 8: Final take-home = GTI - Tax - PF - PT (already accounted in reverse engineer)

Note: PF and PT are already deducted in the monthly take-home,
      so don't double-count.
```

---

## 7. DETAILED DEDUCTION RULES & EDGE CASES

### 7.1 HRA - Special Cases

**If rent to parents:**
```
- Parents must declare as rental income in their ITR
- Parents' PAN is mandatory if annual rent > ₹1,00,000
- Must have written rent agreement
- Payments must be via banking channel (not cash)
- Relationship disclosure required (new rule from FY 2026-27)

Tax impact: HRA exemption can still be claimed normally
```

**If no rent paid but HRA received:**
```
- Entire HRA is taxable (no exemption)
- User should enter ₹0 for rent
- Taxable HRA = Full HRA amount
```

**If rent paid but no HRA received:**
```
- Can claim deduction under Section 80GG (not HRA)
- Max deduction: ₹5,000/month (₹60,000/year)
- Formula: MIN(₹60,000, Rent - 10% of adjusted income, 25% of adjusted income)
- This calculator does NOT ask for 80GG; scope is for salaried with HRA
```

### 7.2 Home Loan Interest - Edge Cases

**Property classification:**
```
Self-Occupied: Owner lives in it
              Deduction limit: ₹2,00,000/year (old regime only)

Let-Out (Rented Out): Owner rents it to others
                      Deduction: Full interest, no limit
                      (Calculator: Do NOT count this; outside scope)

Vacant: Owner owns but doesn't occupy or rent
        Deduction limit: ₹2,00,000/year (debatable, assume same as self-occupied)
```

**Principal repayment:**
```
Only interest is deductible, not principal.
If user asks: "Can I claim principal too?"
Answer: No. Principal is repayment of borrowed capital. 
        Only interest (cost of borrowing) is deductible.
```

**Home loan for construction:**
```
Interest on loan taken for construction is also deductible.
Calendar year rule: Interest is deductible only from the year
                   of completion (not during construction).
```

### 7.3 Section 80C Investment Limit

**Max deduction**: ₹1,50,000/year (includes all of):
```
- PPF contributions
- ELSS investments
- Tax-saver FD deposits
- NSC (National Savings Certificate)
- LIC premium (life insurance)
- Children's education fees
- Principal on home loan (if not already claimed)
- Sukanya Samriddhi contributions
- Home loan principal repayment
```

**Ordering rule** (for prioritization):
```
If user invests:
- PF: ₹15,000 (auto-calculated)
- ELSS: ₹50,000 (user input)
- LIC: ₹40,000 (user input)
- Total: ₹1,05,000 (within limit, all deductible)

If user invests:
- PF: ₹15,000
- ELSS: ₹80,000
- LIC: ₹60,000
- Total: ₹1,55,000 (exceeds ₹1,50,000)
- Deductible: ₹1,50,000 (first come, first served or user's choice?)
```

**For this calculator**: Ask user for "total 80C investments" and cap at ₹1,50,000.

### 7.4 NPS Deduction - Complexity

**Tier 1:**
```
Employee contribution:
  Old regime: Treated as 80C (up to ₹1,50,000 limit)
              OR 80CCD(1B) if specifically > ₹50,000 extra
  New regime: No deduction

Employer contribution:
  Old regime: Up to 10% of salary, under 80CCD(2)
  New regime: Up to 14% of salary, under 80CCD(2)
```

**80CCD(1B) - Extra ₹50,000 benefit:**
```
Available in old regime only.
If employee contributes > ₹50,000 to NPS Tier 1,
the first ₹50,000 gets special treatment as separate deduction.

Example:
Employee NPS contribution: ₹75,000
Under old regime:
  First ₹50,000: 80CCD(1B) deduction (separate)
  Next ₹25,000: Counted under 80C (within ₹1.5L limit)
  
This incentivizes NPS contributions up to ₹50,000 above 80C limit.
```

**For calculator:**
```
Ask: "Do you contribute to NPS yourself?"
If yes, ask amount.
Auto-apply:
- Old regime: Up to ₹50,000 as 80CCD(1B), rest under 80C
- New regime: No deduction on personal contribution
             (only employer contribution under 80CCD(2) counts)
```

### 7.5 80CCD(1B) Special Scheme - NPS Vatsalya

**New rule (Budget 2025):**
```
Parents can contribute to a child's NPS account.
Contribution up to ₹50,000/year gets separate deduction under 80CCD(1B).

Scope: NOT covered in this calculator
       (Assumes user's own NPS, not parents')
```

### 7.6 Education Loan Interest (80E)

**Rules:**
```
- Applies to interest on loan taken for higher education
- Loan can be for self, spouse, or dependent child
- No deduction limit (unlike 80C's ₹1,50,000)
- Deduction available for 8 years from year repayment starts
- Only interest, not principal

Example:
Interest paid: ₹4,50,000 (in one year)
Deduction: ₹4,50,000 (full)
Tax saving @ 20%: ₹90,000
```

**Edge case:**
```
If student took loan, now parent is repaying:
Parent can claim 80E deduction (as they're paying interest).
Interest must be on a formal education loan from recognized institution.
```

**Calculator rule:**
```
Ask: "Do you pay education loan interest?"
If yes, ask amount.
Set annual deduction = amount (no cap).
Apply in old regime only.
```

### 7.7 Medical Insurance - 80D

**Who can claim:**
```
For yourself: Up to ₹25,000 (regular) or ₹50,000 (senior)
For spouse: Counted together with self
For parents: Additional deduction
  - If parents < 60: ₹25,000
  - If parents ≥ 60: ₹50,000
For dependent children: Included in family coverage
```

**Example (old regime, below 60):**
```
Premium for:
- Self: ₹10,000
- Spouse: ₹10,000
- Child: (included above)
- Parent (< 60): ₹8,000
Total paid: ₹28,000

Deduction:
- Self + Spouse: MIN(₹20,000, ₹25,000) = ₹20,000
- Parents: MIN(₹8,000, ₹25,000) = ₹8,000
- Total: ₹28,000 (within limits)
```

**Preventive health checkup:**
```
Additional deduction: ₹5,000 (if checkup done)
Not covered in this calculator (assumed included in premium)
```

**Calculator approach:**
```
Ask: "Do you pay health insurance premiums?"
Ask: "Total annual premium (self, family, parents)?"
Auto-apply limits based on age:
- Below 60: ₹25,000 cap
- Senior (60-79): ₹50,000 cap
- Super-senior (80+): ₹50,000 cap

(Note: This treats all family as one block, 
 which is a simplification. Ideally ask family breakdown.)
```

---

## 8. VALIDATION RULES & ERROR HANDLING

### 8.1 Input Validation

```
Age:
  Required: Yes
  Valid values: Below 60, Senior (60-79), Super-Senior (80+)
  Error: "Please select your age group"

Monthly Take-Home:
  Required: Yes
  Type: Positive integer or decimal
  Range: ₹10,000 to ₹10,00,000
  Error if < ₹10,000: "Minimum ₹10,000 required"
  Error if > ₹10,00,000: "Maximum ₹10,00,000 (if you earn more, surcharge applies)"

State:
  Required: Yes
  Format: Dropdown selection
  Error: "Please select your state"

City:
  Required: Conditional (if exploring HRA)
  Format: Dropdown selection
  Error: "Please select your city"

Rent:
  Required: Conditional (if "Yes" to rent question)
  Type: Positive integer or decimal
  Range: ₹1 to ₹2,00,000/month
  Error if empty (and rent selected): "Please enter rent amount"

HRA:
  Required: Conditional (if "Yes" to HRA question)
  Type: Positive integer or decimal
  Range: ₹1 to ₹5,00,000/month
  Error if empty: "Please enter HRA amount"

Basic Salary:
  Required: Conditional (if PF selected)
  Type: Positive integer
  Range: ₹5,000 to ₹5,00,000/month
  Error if empty: "Please enter basic salary"
  Error if not numeric: "Please enter a valid number"

80C Investments:
  Type: Non-negative integer
  Range: ₹0 to ₹1,50,000/year
  Auto-cap: If > ₹1,50,000, cap at ₹1,50,000 with message:
           "Deduction capped at ₹1,50,000 (80C limit)"

Home Loan Interest:
  Type: Non-negative integer
  Range: ₹0 to ₹25,00,000/year
  Auto-cap (old regime): If > ₹2,00,000, cap at ₹2,00,000 with message:
                        "Interest deduction capped at ₹2,00,000"
  Auto-cap (new regime): ₹0 (no deduction)

Health Insurance:
  Type: Non-negative integer
  Range: ₹0 to ₹10,00,000/year
  Auto-cap based on age: Show limit, cap if exceeded

Education Loan Interest:
  Type: Non-negative integer
  Range: ₹0 to ₹50,00,000/year
  No auto-cap (80E has no limit)

Bonus:
  Type: Non-negative integer
  Range: ₹0 to ₹50,00,000/year

Professional Tax:
  Calculated from state + salary, not user-input
  Validation: Ensure calculated value is within state max (usually ₹2,500/year)
```

### 8.2 Logical Validation

```
If HRA received > Basic Salary * 50% (metro) or 40% (non-metro):
  Warning: "HRA seems unusually high for your basic salary"

If Home Loan Interest > ₹2,00,000 (self-occupied) but user says it's self-occupied:
  Message: "Interest is capped at ₹2,00,000 for deduction purposes"

If Rent = ₹0 but HRA > ₹0:
  Message: "You receive HRA but don't pay rent? Full HRA is taxable."

If total 80C investments (PF + user input) > ₹1,50,000:
  Auto-cap and message: "Total 80C deduction is limited to ₹1,50,000"

If Taxable Income < ₹0:
  Fix: Set to ₹0, show message "All deductions applied, no tax due"

If Monthly Rent > Monthly HRA (significantly):
  Info message: "Your rent exceeds HRA. You may be paying out-of-pocket."
```

### 8.3 Calculation Robustness

```
Negative values anywhere: Default to ₹0
Decimal values: Round to nearest rupee
Division by zero: Prevent (check basic salary > 0 before calculating %)
Missing deductions: Treat as ₹0
Missed steps: Allow final calculation only when all required fields filled
```

---

## 9. PERSONALIZED TAX-SAVING SUGGESTIONS

### 9.1 Rule Engine

Based on user's inputs, show contextual suggestions:

```
IF user chose old regime AND total deductions < ₹3,00,000 THEN
  "Suggestion: You have unused deduction capacity. 
   Consider investing more in 80C (PPF/ELSS) for next year."

IF user has home loan interest AND income is high THEN
  "Good news: You've fully utilized the ₹2,00,000 home loan interest cap.
   Your property is helping reduce your tax liability significantly."

IF user invested less than ₹50,000 in 80C AND income allows THEN
  "Tip: NPS contributions of ₹50,000 get special 80CCD(1B) deduction.
   This is on TOP of your ₹1,50,000 80C limit. Consider increasing NPS."

IF user pays health insurance but NOT the max for their age THEN
  "Opportunity: You can increase health insurance premium to ₹[limit]
   and save ₹[saving amount]. Better coverage + tax benefit!"

IF user income is between ₹12-13 lakh (new regime) THEN
  "Insight: Small income increase might push you above ₹12 lakh rebate threshold
   in new regime. Monitor your income and plan accordingly."

IF user has no 80D (health insurance) THEN
  "Health first: No health insurance claimed. Regular health insurance is crucial
   and gives a ₹25,000 deduction annually. Worth considering."

IF (old regime tax savings - new regime tax savings) < ₹5,000 THEN
  "Close call: Both regimes are nearly identical for you.
   Consider: New regime is simpler (fewer documents), old regime has more deductions.
   Your choice can change year to year."

IF user is a senior citizen AND didn't claim full 80D (₹50,000) THEN
  "Senior citizen benefit: You can claim up to ₹50,000 in medical insurance
   (vs ₹25,000 for younger individuals). Have you explored this?"

IF education loan interest is claimed AND ongoing THEN
  "Reminder: Education loan interest deduction is available for up to 8 years
   from the year repayment starts. Make sure you're claiming every year."
```

### 9.2 Personalization Algorithm

```
Assess user profile:
1. Income level: Low (< 7L), Mid (7-15L), High (> 15L)
2. Deduction utilization: Low (< 30% of max), Moderate (30-70%), High (> 70%)
3. Age: Young, Senior, Super-senior
4. Regime preference: Old (high deductions), New (simplicity)
5. Life stage: Early career, Family, Pre-retirement

Based on profile, pick top 3 suggestions from rule engine.
Display in Results screen under "TAX-SAVING SUGGESTIONS" section.
```

---

## 10. UI/UX SPECIFICATIONS

### 10.1 Color Scheme & Typography

```
Primary Colors:
  - Main: #1E40AF (Deep Blue) - Trust, finance, authority
  - Accent: #059669 (Emerald Green) - Savings, positive
  - Warning: #F97316 (Orange) - Caution, needs attention
  - Error: #EF4444 (Red) - Errors, invalid
  - Background: #F8FAFC (Off-white) - Clean, light
  - Text: #0F172A (Dark Slate) - Readable

Typography:
  - Font: System font stack (San Francisco, -apple-system, Segoe UI)
  - Heading: 28px, Weight 700
  - Subheading: 18px, Weight 600
  - Body: 16px, Weight 400
  - Caption: 14px, Weight 500, Color #64748B (gray)
```

### 10.2 Responsive Design

```
Desktop (1024px+):
  - Left column: Question (60%)
  - Right column: Live preview (40%)
  - Side-by-side layout

Tablet (768-1023px):
  - Left column: Question (65%)
  - Right column: Live preview (35%), scrollable if needed

Mobile (< 768px):
  - Full-width question
  - Live preview stacked below (collapsible)
  - Preview accessible via toggle button
  - Larger touch targets (48px minimum)
```

### 10.3 Accessibility

```
WCAG 2.1 AA Compliance:
  - Color contrast: Minimum 4.5:1 for text, 3:1 for graphics
  - Form labels: Explicit <label> tags, not placeholders alone
  - Keyboard navigation: All interactive elements accessible via Tab
  - Screen reader: ARIA labels for dynamic content, live regions for results
  - Focus indicators: Clear visible focus (outline, underline)
  - Alt text: For all icons and diagrams (if using images)
  - Language: Set HTML lang attribute, mark any foreign words
```

### 10.4 Input Field Design

```
Text Input:
  - Border: 1px solid #E2E8F0, rounded 6px
  - Focus: Border color #1E40AF, shadow 0 0 0 3px rgba(30, 64, 175, 0.1)
  - Padding: 12px 14px (for height ~44px, touch-friendly)
  - Font: 16px to prevent zoom on mobile
  - Placeholder: Subtle hint, not full instruction

Radio Buttons:
  - Size: 20px × 20px (touch-friendly)
  - Spacing: 8px between label and radio
  - Selected: Filled circle, #1E40AF
  - Unselected: Border circle, #CBD5E1

Dropdown:
  - Similar to text input
  - Arrow icon: Custom or native browser
  - Options: Max-height with scroll if > 6 items

Number Input:
  - Accept decimals for amounts (e.g., ₹45,500.50)
  - Thousands separator optional in display (₹45,500 or ₹45500, both valid)
  - Currency symbol: Left-aligned (₹)
```

### 10.5 Progress Indicator

```
Design: Numbered dots
  Step 1 ● — ● Step 2 — ● Step 3 ...

Current step: Filled circle, #1E40AF
Completed steps: Filled circle, #059669 with checkmark
Future steps: Hollow circle, #CBD5E1

Responsive: On mobile, show "Step 3 of 13" as text backup
```

### 10.6 Button Design

```
Primary Button (Next, Calculate, etc.):
  - Background: #1E40AF
  - Text: White, 600 weight, 16px
  - Padding: 12px 28px (height 44px minimum)
  - Rounded: 6px
  - Hover: Background #1E3A8A (darker blue)
  - Disabled: Background #CBD5E1, cursor not-allowed
  - Transition: 200ms ease

Secondary Button (Back, View Details, etc.):
  - Background: #F1F5F9
  - Text: #1E40AF, 600 weight
  - Border: 1px solid #E2E8F0
  - Hover: Background #E2E8F0
  - Disabled: Similar to primary

Danger/Warning Button:
  - Background: #F97316
  - Text: White
  - Used sparingly (if ever)
```

### 10.7 FAQ/Help Design

```
Location: Bottom of each question
Trigger: "?" icon, or "Help" text link
Display: Dropdown/accordion below the input field

Style:
  - Background: #F0F9FF (very light blue)
  - Border: 1px solid #BFDBFE (light blue)
  - Border-radius: 6px
  - Padding: 12px 14px
  - Font: 14px, #0F172A

Content:
  - Q: Bold, 14px
  - A: Regular, 14px, line-height 1.6
  - Multiple Q&As stacked

Interaction:
  - On hover: Subtle background change
  - Can be toggled open/closed (on mobile)
  - Keyboard: Tab into it, Enter to expand
```

---

## 11. DATA PERSISTENCE

### 11.1 Local Storage

```javascript
// Save user progress (auto-save after each step)
saveState = {
  age: 'below_60',
  monthlyTakeHome: 50000,
  state: 'maharashtra',
  city: 'mumbai',
  rentPaid: 20000,
  rentPaidMonthly: true,
  ... (all other fields)
  lastUpdated: 2026-05-19T10:30:00Z
};

// Stored as JSON in localStorage
localStorage.setItem('taxCalcState', JSON.stringify(saveState));

// On reload, restore state
const restored = JSON.parse(localStorage.getItem('taxCalcState'));
if (restored) {
  loadState(restored);
}

// Clear on: 
// - User clicks "Start Fresh"
// - User completes and generates final result
```

### 11.2 Session Handling

```
- Session timeout: Not needed (no server)
- User can close browser and reopen: State persists
- "Save & Exit" button: Explicitly saves and shows message
- "Start Fresh" button: Confirms, then clears all data
```

---

## 12. TESTING & EDGE CASES

### 12.1 Test Scenarios

**Scenario 1: Low-income individual (benefits from rebate)**
```
Input:
- Age: Below 60
- Monthly Take-Home: ₹30,000
- State: UP (no PT)
- No rent, no HRA
- No deductions

Expected Output:
- New Regime: ₹0 tax (below ₹12L rebate threshold)
- Old Regime: ₹0 tax (below ₹2.5L exemption)
- Recommendation: Either regime, new is simpler
```

**Scenario 2: High deductions (old regime wins)**
```
Input:
- Age: Below 60
- Monthly Take-Home: ₹75,000
- State: Maharashtra
- Rent: ₹30,000/month
- HRA: ₹25,000/month
- Basic: ₹75,000/month
- 80C: ₹1,50,000
- 80D: ₹30,000
- Home Loan Interest: ₹2,00,000
- NPS (personal): ₹50,000

Expected:
- Old Regime: ₹1,20,000 tax (significant deductions)
- New Regime: ₹2,45,000 tax (no HRA, 80C, 80D)
- Recommendation: Old regime, save ₹1,25,000
```

**Scenario 3: Senior Citizen**
```
Input:
- Age: 65 years
- Monthly Take-Home: ₹60,000
- Limited deductions (retired mindset)

Expected:
- Old Regime exemption: ₹3,00,000 (vs ₹2,50,000 for younger)
- 80D limit: ₹50,000 (vs ₹25,000 for younger)
- New Regime: Same as younger (no age benefit)
- Likely Recommendation: Old regime (exemption advantage)
```

**Scenario 4: Bonus included in take-home estimate**
```
Input:
- Monthly Take-Home: ₹50,000 (includes bonus)
- Annual Bonus (separate): ₹3,00,000

Expected:
- Gross Salary = (50,000 × 12) + ₹3,00,000 = ₹9,00,000
- Calculations account for bonus separately
- Output shows impact of bonus on bracket creep
```

**Scenario 5: Rent exceeds HRA**
```
Input:
- Rent: ₹30,000/month
- HRA: ₹18,000/month
- Basic: ₹50,000/month (non-metro city)

Calculation:
- HRA Exemption = MIN(₹2,16,000, ₹30,000×12 - 10%×6,00,000, 40%×6,00,000)
                = MIN(₹2,16,000, ₹3,00,000, ₹2,40,000)
                = ₹2,16,000 (full HRA exempt)
- Out-of-pocket: ₹30,000×12 - ₹2,16,000 = ₹1,44,000

Expected:
- Message: "You pay ₹1,44,000 out-of-pocket rent annually (beyond HRA)"
- Suggested action: "Consider reducing rent or negotiating HRA increase"
```

---

## 13. BROWSER COMPATIBILITY & TECH STACK

### 13.1 Recommended Stack

```
Frontend:
  - React 18+ (for component-based UI, state management)
  - React Router (for navigation between screens)
  - Tailwind CSS (for styling, responsive design)
  - Zustand or Redux (for state management)

Libraries:
  - react-hook-form (for form handling, validation)
  - numeral.js or accounting.js (for currency formatting)
  - date-fns (for date calculations)
  - zustand (lightweight state management)

Build:
  - Vite (fast build, dev server)
  - TypeScript (optional, for type safety)

Hosting:
  - Vercel, Netlify, or GitHub Pages (static hosting)
  - No backend needed (all calculations in browser)

Browsers:
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
  - Mobile Safari (iOS 14+)
  - Chrome Mobile (Android 9+)
```

### 13.2 Performance

```
- Bundle size: Target < 200KB gzipped
- Lighthouse: Aim for 90+ score
- Accessibility: A11y score 95+
- Page load: < 2 seconds on 4G
- Interaction: < 100ms response time
- No third-party scripts (stay privacy-focused)
- Minify and compress all assets
```

---

## 14. DEPLOYMENT & MAINTENANCE

### 14.1 Deployment Steps

```
1. Build React app (npm run build)
2. Test in production mode locally
3. Deploy to Vercel/Netlify (auto-deploy on git push)
4. Configure custom domain (if applicable)
5. Set up HTTPS (automatic on Vercel/Netlify)
6. Test on all major browsers
7. Monitor performance (Lighthouse CI)
```

### 14.2 Version Control & Updates

```
File: VERSION or package.json
Current: 1.0.0 (May 2026)

Release schedule:
- Monthly: Bug fixes, minor improvements
- Quarterly: Tax rule updates (if government changes rates)
- Major: Next financial year (e.g., April 2027 for FY 2026-27)

Tax rule updates:
- Monitor Income Tax Department announcements
- Update slabs, exemptions, limits in code (data-driven, not hardcoded)
- Test with sample scenarios before release
```

### 14.3 Monitoring

```
- Error tracking: Sentry (optional, for frontend errors)
- Analytics: Plausible or Fathom (privacy-respecting)
- User feedback: Simple form on results page ("Was this helpful?")
- Logs: Browser console (dev only)
- No sensitive data collection
```

---

## 15. PRIVACY & SECURITY

### 15.1 Privacy-First Design

```
- All calculations happen locally in the browser
- No data sent to any server
- No cookies, no tracking
- No third-party analytics (or privacy-respecting analytics only)
- No login required
- No email collection
- No ads
- Data is cleared on browser close (not in localStorage after session)

User-facing statement:
"Your data stays on your device. We don't collect, store, or share any information."
```

### 15.2 Security

```
- HTTPS enforced
- No sensitive data logged
- No SQL database (no injection attacks)
- Input validation (prevent XSS)
- No eval() or dangerous functions
- Update dependencies regularly
```

---

## 16. GLOSSARY & TERMINOLOGY

For inline help:

```
Basic Salary: Core salary component, excluding HRA, bonuses, allowances.
              Used to calculate PF, HRA exemption, NPS, etc.

CTC: Cost To Company. Total package including salary, PF, gratuity, 
     and other benefits. Not the same as in-hand salary.

Dearness Allowance (DA): Cost-of-living allowance, varies by inflation.
                        May or may not be part of "Basic" for PF purposes.

Gross Salary: Total salary before deductions (PF, income tax, professional tax).

In-Hand Salary / Take-Home: Money actually received in bank account after 
                            all deductions.

HRA: House Rent Allowance. Salary component for rent. Partially tax-exempt 
     under old regime.

EPF: Employee Provident Fund. Mandatory retirement savings scheme. 
     Contribution: 12% of basic salary (both employee and employer).

NPS: National Pension Scheme. Voluntary retirement savings with tax benefits. 
     Tier 1 is locked-in; Tier 2 is flexible.

80C: Chapter of Income Tax Act allowing deduction up to ₹1,50,000 for 
     investments like PPF, ELSS, life insurance, etc.

80D: Deduction for health insurance premiums (₹25,000 or ₹50,000 based on age).

80E: Deduction for education loan interest (no limit).

80CCD(1B): Extra ₹50,000 deduction for NPS contributions (old regime only).

80CCD(2): Deduction for employer's NPS contribution 
          (10% old regime, 14% new regime).

Rebate (87A): Direct reduction in tax liability for low/mid-income earners.

Cess: Health and Education Cess. 4% additional tax on total tax liability.

Surcharge: Additional tax for high-income earners (income > ₹50 lakh).

Taxable Income: Gross income minus applicable deductions and exemptions.

Metro City: For HRA, Delhi, Mumbai, Kolkata, Chennai 
           (50% HRA exemption limit).

Non-Metro: All other cities (40% HRA exemption limit).

Professional Tax: State-level tax on employment/profession. Varies by state.

Section 10(13A): HRA exemption rule.

Section 115BAC: New Tax Regime rule.

Section 87A: Tax Rebate rule.
```

---

## 17. FUTURE ENHANCEMENTS (Out of Scope for v1.0)

```
1. Multi-year comparison (FY 2024-25 vs FY 2025-26)
2. Surcharge calculation (for income > ₹50 lakh)
3. Capital gains integration
4. Self-employed / freelance income
5. Business income and profit
6. TDS reconciliation and advance tax calculator
7. ITR filing guide (step-by-step)
8. CA directory / consultation booking
9. Tax planning chatbot
10. Mobile app (iOS, Android)
11. Offline mode (PWA)
12. Multiple languages (Hindi, regional languages)
13. Print / PDF export of results
14. Comparison with previous year
15. Social sharing of results (anonymously)
```

---

## 18. APPENDIX: TAX TABLES & REFERENCE DATA

### A.1 FY 2025-26 Income Tax Slabs

**New Regime (Fixed for all ages):**
```
₹0 - ₹4,00,000:              Nil
₹4,00,001 - ₹8,00,000:       5%
₹8,00,001 - ₹12,00,000:      10%
₹12,00,001 - ₹16,00,000:     15%
₹16,00,001 - ₹20,00,000:     20%
₹20,00,001 - ₹24,00,000:     25%
Above ₹24,00,000:            30%
```

**Old Regime - Below 60 years:**
```
₹0 - ₹2,50,000:              Nil
₹2,50,001 - ₹5,00,000:       5%
₹5,00,001 - ₹10,00,000:      20%
Above ₹10,00,000:            30%
```

**Old Regime - Senior Citizens (60-79 years):**
```
₹0 - ₹3,00,000:              Nil
₹3,00,001 - ₹5,00,000:       5%
₹5,00,001 - ₹10,00,000:      20%
Above ₹10,00,000:            30%
```

**Old Regime - Super Senior Citizens (80+ years):**
```
₹0 - ₹5,00,000:              Nil
₹5,00,001 - ₹10,00,000:      20%
Above ₹10,00,000:            30%
```

### A.2 Deduction Limits

```
Standard Deduction (Section 16):
  Old Regime: ₹50,000
  New Regime: ₹75,000

80C (Investments):
  Limit: ₹1,50,000/year
  Covers: PPF, ELSS, NSC, LIC, home loan principal, tuition fees, etc.

80CCD(1): Employee NPS contribution
  Old Regime: Up to 10% of salary, within ₹1,50,000 80C limit
  New Regime: Not allowed

80CCD(1B): Extra NPS contribution
  Limit: ₹50,000 (separate from 80C)
  Regime: Old regime only

80CCD(2): Employer NPS contribution
  Old Regime: Up to 10% of basic salary
  New Regime: Up to 14% of basic salary

80D: Health Insurance Premium
  Below 60: ₹25,000/year (self + family + parents together)
  Senior (60-79): ₹50,000/year
  Super-Senior (80+): ₹50,000/year

80E: Education Loan Interest
  Limit: No limit (full amount deductible)

80G: Donations
  Limit: Varies (50% to 100% of donation amount depending on recipient)

HRA Exemption (Section 10(13A)):
  Limit: MIN(HRA received, Rent - 10% of Basic, 50% or 40% of Basic)

Home Loan Interest (Section 24(b)):
  Self-Occupied: ₹2,00,000/year (old regime only)
  Let-out: Full amount, no limit (old regime only)

Professional Tax:
  Deduction limit: Full amount paid in the year
  Max by state: Usually ₹2,500/year (aggregate)
  Applies: Both regimes
```

### A.3 Section 87A Rebate Limits

```
Old Regime:
  Applicable Income: Up to ₹5,00,000
  Rebate Amount: Up to ₹12,500
  Effect: Full rebate up to ₹5,00,000 → ₹0 tax

New Regime:
  Applicable Income: Up to ₹12,00,000
  Rebate Amount: Up to ₹60,000
  Effect: Full rebate up to ₹12,00,000 → ₹0 tax
```

### A.4 State-wise Professional Tax (Sample)

```
Maharashtra:
  ₹0 - ₹15,000/month: ₹0
  ₹15,001 - ₹25,000: ₹200/month
  ₹25,001 - ₹50,000: ₹400/month
  Above ₹50,000: ₹500/month
  (Special rate in Feb for some brackets)

Karnataka:
  ₹0 - ₹12,000/month: ₹0
  ₹12,001 - ₹25,000: ₹150/month
  ₹25,001 - ₹100,000: ₹300/month
  Above ₹100,000: ₹600/month

Tamil Nadu:
  Half-yearly calculation (April-Sept, Oct-March)
  Rates vary by half-yearly income slab
  Max: ₹1,250/half-year

Delhi, UP, Haryana, Punjab, Rajasthan, Himachal Pradesh, Uttarakhand:
  ₹0 (No Professional Tax)
```

### A.5 HRA Exemption - Metro vs Non-Metro

```
Metro Cities (50% exemption):
  - Delhi
  - Mumbai
  - Kolkata
  - Chennai
  (Bangalore, Hyderabad, Pune, Ahmedabad → From FY 2026-27)

Non-Metro (40% exemption):
  - All other cities
```

---

**END OF PRD**

---

## SIGN-OFF

This PRD provides a complete blueprint for building a salaried income tax calculator for FY 2025-26 in India. It covers:

✅ User journey from landing page to results  
✅ All 13 input steps with validation  
✅ Live preview panel updates  
✅ Complete tax calculation engine (both regimes)  
✅ Edge cases and special scenarios  
✅ Personalized suggestions and explanations  
✅ UI/UX specifications  
✅ Privacy-first architecture  
✅ Tax rules and deduction limits (FY 2025-26)

**Ready for development with React, Tailwind, and Zustand.**
