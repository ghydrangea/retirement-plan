import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatCurrency } from "./formatters";

describe("formatCurrency", () => {
  it("formats USD using the US locale", () => {
    assert.equal(formatCurrency(1234, "USD", "en-US"), "$1,234");
  });

  it("formats THB using the Thai locale", () => {
    assert.equal(formatCurrency(1234, "THB", "th-TH"), "฿1,234");
  });
});
