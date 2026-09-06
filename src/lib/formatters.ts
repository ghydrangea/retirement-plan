import { currencyMap, type SupportedCurrency } from "@/lib/i18n";

export function formatCurrency(
  value: number,
  currency: SupportedCurrency,
  locale: string = "en-US",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function currency(value: number, currencyCode: SupportedCurrency = "USD", locale = "en-US") {
  return formatCurrency(value, currencyCode, locale);
}

export function formatCurrencyInput(value: number, currencyCode: SupportedCurrency) {
  return `${currencyMap[currencyCode].symbol}${value.toLocaleString()}`;
}
