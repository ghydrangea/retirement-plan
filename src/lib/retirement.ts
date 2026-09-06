export type RetirementInputs = {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number;
  annualInflation: number;
  monthlyTargetIncome: number;
};

export function calculateRetirementProjection(input: RetirementInputs) {
  const years = Math.max(input.retirementAge - input.currentAge, 0);
  const yearsToRetirement = Math.max(years, 0);
  const yearsInRetirement = Math.max(input.lifeExpectancy - input.retirementAge, 0);

  const monthlyRate = input.annualReturn / 100 / 12;
  let balance = input.currentSavings;

  for (let i = 0; i < yearsToRetirement * 12; i += 1) {
    balance = balance * (1 + monthlyRate) + input.monthlyContribution;
  }

  const inflationAdjustedMonthlyTarget =
    input.monthlyTargetIncome * (1 + input.annualInflation / 100) ** yearsToRetirement;

  const monthlyIncomeAtRetirement = Math.max(inflationAdjustedMonthlyTarget, 0);

  const annualIncomeNeeded = monthlyIncomeAtRetirement * 12;
  const retirementMonths = yearsInRetirement * 12;
  const monthlyInflationRate = input.annualInflation / 100 / 12;
  let retirementFundNeeded = 0;

  if (retirementMonths > 0) {
    if (monthlyRate === monthlyInflationRate) {
      retirementFundNeeded = monthlyIncomeAtRetirement * retirementMonths / (1 + monthlyRate);
    } else {
      retirementFundNeeded =
        monthlyIncomeAtRetirement *
        (1 - ((1 + monthlyInflationRate) / (1 + monthlyRate)) ** retirementMonths) /
        (monthlyRate - monthlyInflationRate);
    }
  }

  retirementFundNeeded = Math.max(retirementFundNeeded, 0);

  const shortfall = Math.max(retirementFundNeeded - balance, 0);

  return {
    yearsToRetirement,
    yearsInRetirement,
    projectedBalance: balance,
    retirementFundNeeded,
    annualIncomeNeeded,
    monthlyIncomeAtRetirement,
    shortfall,
    targetIncomeAtRetirement: monthlyIncomeAtRetirement,
  };
}
