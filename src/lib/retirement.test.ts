import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateRetirementProjection } from "./retirement";

describe("calculateRetirementProjection", () => {
  it("calculates a simple retirement projection", () => {
    const result = calculateRetirementProjection({
      currentAge: 30,
      retirementAge: 65,
      lifeExpectancy: 90,
      currentSavings: 100000,
      monthlyContribution: 1000,
      annualReturn: 7,
      annualInflation: 2.5,
      monthlyTargetIncome: 80000,
      desiredIncomeReplacement: 70,
    });

    assert.equal(result.yearsToRetirement, 35);
    assert.equal(result.yearsInRetirement, 25);
    assert.ok(result.projectedBalance > 0);
    assert.ok(result.retirementFundNeeded > 0);
    assert.ok(result.annualIncomeNeeded > 0);
  });

  it("does not require retirement savings when life expectancy is at retirement age", () => {
    const result = calculateRetirementProjection({
      currentAge: 40,
      retirementAge: 65,
      lifeExpectancy: 65,
      currentSavings: 0,
      monthlyContribution: 0,
      annualReturn: 7,
      annualInflation: 2.5,
      monthlyTargetIncome: 50000,
      desiredIncomeReplacement: 70,
    });

    assert.equal(result.yearsInRetirement, 0);
    assert.equal(result.retirementFundNeeded, 0);
  });
});
