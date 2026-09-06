export type RetirementInputs = {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number;
  annualInflation: number;
  monthlyTargetIncome: number;
  desiredIncomeReplacement: number;
};

export function calculateRetirementProjection(input: RetirementInputs) {
  const years = Math.max(input.retirementAge - input.currentAge, 0);
  const yearsToRetirement = Math.max(years, 0);

  const monthlyRate = input.annualReturn / 100 / 12;
  let balance = input.currentSavings;

  for (let i = 0; i < yearsToRetirement * 12; i += 1) {
    balance = balance * (1 + monthlyRate) + input.monthlyContribution;
  }

  const inflationAdjustedMonthlyTarget =
    input.monthlyTargetIncome * (1 + input.annualInflation / 100) ** yearsToRetirement;

  const monthlyIncomeAtRetirement =
    Math.max(inflationAdjustedMonthlyTarget * (input.desiredIncomeReplacement / 100), 0);

  const annualIncomeNeeded = monthlyIncomeAtRetirement * 12;
  const annualWithdrawalRate = Math.max(input.annualReturn / 100, 0.03);
  const retirementFundNeeded = annualIncomeNeeded / annualWithdrawalRate;

  const shortfall = Math.max(retirementFundNeeded - balance, 0);

  return {
    yearsToRetirement,
    projectedBalance: balance,
    retirementFundNeeded,
    annualIncomeNeeded,
    monthlyIncomeAtRetirement,
    shortfall,
    targetIncomeAtRetirement: monthlyIncomeAtRetirement,
  };
}
