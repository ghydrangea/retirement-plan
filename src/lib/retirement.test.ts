import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateRetirementProjection } from "./retirement";

describe("calculateRetirementProjection", () => {
  it("calculates a simple retirement projection", () => {
    const result = calculateRetirementProjection({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 100000,
      monthlyContribution: 1000,
      annualReturn: 7,
      annualInflation: 2.5,
      monthlyTargetIncome: 80000,
      desiredIncomeReplacement: 70,
    });

    assert.equal(result.yearsToRetirement, 35);
    assert.ok(result.projectedBalance > 0);
    assert.ok(result.retirementFundNeeded > 0);
    assert.ok(result.annualIncomeNeeded > 0);
  });
});
