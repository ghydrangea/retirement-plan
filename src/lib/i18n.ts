export type SupportedLanguage = "en" | "th";
export type SupportedCurrency = "USD" | "THB";

export type AppLocale = {
  language: SupportedLanguage;
  currency: SupportedCurrency;
};

export const localeMap: Record<SupportedLanguage, { label: string; locale: string }> = {
  en: { label: "English", locale: "en-US" },
  th: { label: "ไทย", locale: "th-TH" },
};

export const currencyMap: Record<SupportedCurrency, { label: string; symbol: string }> = {
  USD: { label: "USD", symbol: "$" },
  THB: { label: "THB", symbol: "฿" },
};

export const translations = {
  en: {
    title: "Retirement plan calculator",
    currentAge: "Current age",
    retirementAge: "Retirement age",
    lifeExpectancy: "Planning age",
    currentSavings: "Current savings",
    monthlyContribution: "Monthly saving",
    annualReturn: "Annual return (%)",
    inflation: "Inflation (%)",
    monthlyTargetIncome: "Monthly expense target",
    replacement: "Replacement (%)",
    ageTarget: "Retirement age target",
    projection: "Projection",
    onTrack: "You are on track to meet your retirement goal.",
    offTrack: "You may need {amount} more to reach your target.",
    yearsToRetirement: "Years to retirement",
    yearsInRetirement: "Planned years after retirement",
    requiredFund: "Required retirement fund",
    incomeAtRetirement: "Monthly income at retirement",
    strongPlan: "Based on these assumptions, your projected savings cover the planned retirement period.",
    weakPlan: "Based on these assumptions, consider increasing savings or delaying retirement to close the gap.",
    reset: "Reset",
    language: "Language",
    currency: "Currency",
    help: {
      currentAge: "Your age today. It determines how many years you still have to save.",
      retirementAge: "The age you plan to stop working and start drawing retirement income.",
      lifeExpectancy: "The age you want your retirement plan to cover. Add a safety margin if needed.",
      currentSavings: "The amount you already have saved today.",
      monthlyContribution: "How much you save each month before retirement.",
      annualReturn: "Expected yearly investment growth before retirement.",
      inflation: "The average yearly increase in living costs.",
      monthlyTargetIncome: "The monthly lifestyle cost you want in retirement.",
      replacement: "The percentage of your working income you want to replace after retirement.",
    },
  },
  th: {
    title: "เครื่องคำนวณแผนเกษียณ",
    currentAge: "อายุปัจจุบัน",
    retirementAge: "อายุเกษียณ",
    lifeExpectancy: "อายุที่วางแผนให้เงินครอบคลุมถึง",
    currentSavings: "เงินออมปัจจุบัน",
    monthlyContribution: "การออมต่อเดือน",
    annualReturn: "ผลตอบแทนต่อปี (%)",
    inflation: "เงินเฟ้อ (%)",
    monthlyTargetIncome: "ค่าใช้จ่ายรายเดือนเป้าหมาย",
    replacement: "อัตราทดแทน (%)",
    ageTarget: "เป้าหมายอายุเกษียณ",
    projection: "ผลคาดการณ์",
    onTrack: "คุณอยู่ในเส้นทางที่ทำให้บรรลุเป้าหมายเกษียณได้",
    offTrack: "คุณอาจต้องเพิ่มอีก {amount} เพื่อให้ถึงเป้าหมาย",
    yearsToRetirement: "ปีที่เหลือจนถึงเกษียณ",
    yearsInRetirement: "จำนวนปีหลังเกษียณที่วางแผนไว้",
    requiredFund: "เงินที่ต้องมีเพื่อเกษียณ",
    incomeAtRetirement: "รายได้ต่อเดือนเมื่อเกษียณ",
    strongPlan: "จากสมมติฐานปัจจุบัน เงินออมที่คาดการณ์ไว้ครอบคลุมช่วงเวลาหลังเกษียณที่วางแผนไว้",
    weakPlan: "จากสมมติฐานปัจจุบัน ควรเพิ่มการออมหรือเลื่อนอายุเกษียณเพื่อปิดช่องว่าง",
    reset: "รีเซ็ต",
    language: "ภาษา",
    currency: "สกุลเงิน",
    help: {
      currentAge: "อายุของคุณในปัจจุบัน ซึ่งกำหนดจำนวนปีที่เหลือก่อนเกษียณ",
      retirementAge: "อายุที่คุณวางแผนจะหยุดทำงานและเริ่มใช้เงินเกษียณ",
      lifeExpectancy: "อายุที่ต้องการให้แผนการเงินครอบคลุม ควรเผื่อระยะปลอดภัยเพิ่มเติมตามความเหมาะสม",
      currentSavings: "จำนวนเงินที่คุณมีสะสมอยู่ในปัจจุบัน",
      monthlyContribution: "จำนวนเงินที่คุณออมทุกเดือนก่อนเกษียณ",
      annualReturn: "อัตราผลตอบแทนจากการลงทุนต่อปีที่คาดหวัง",
      inflation: "อัตราเงินเฟ้อเฉลี่ยต่อปีที่คาดไว้",
      monthlyTargetIncome: "ค่าใช้จ่ายต่อเดือนที่คุณต้องการในช่วงเกษียณ",
      replacement: "เปอร์เซ็นต์ของรายได้ก่อนเกษียณที่คุณต้องการให้คงอยู่หลังเกษียณ",
    },
  },
} as const;
