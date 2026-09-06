"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { calculateRetirementProjection, type RetirementInputs } from "@/lib/retirement";
import { currency } from "@/lib/formatters";
import { localeMap, translations, type SupportedCurrency, type SupportedLanguage } from "@/lib/i18n";

const defaultInputs: RetirementInputs = {
  currentAge: 35,
  retirementAge: 65,
  lifeExpectancy: 90,
  currentSavings: 150000,
  monthlyContribution: 15000,
  annualReturn: 7,
  annualInflation: 2.5,
  monthlyTargetIncome: 45000,
  desiredIncomeReplacement: 70,
};

const formatNumberInput = (value: string) => {
  if (value === "") return "";
  const normalizedValue = value.replace(/,/g, "");
  if (!/^\d*\.?\d*$/.test(normalizedValue)) return value;
  const [whole, decimal] = normalizedValue.split(".");
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal !== undefined ? `${formattedWhole}.${decimal}` : formattedWhole;
};

const makeDrafts = (values: RetirementInputs) => ({
  currentAge: String(values.currentAge),
  retirementAge: String(values.retirementAge),
  lifeExpectancy: String(values.lifeExpectancy),
  currentSavings: formatNumberInput(String(values.currentSavings)),
  monthlyContribution: formatNumberInput(String(values.monthlyContribution)),
  annualReturn: formatNumberInput(String(values.annualReturn)),
  annualInflation: formatNumberInput(String(values.annualInflation)),
  monthlyTargetIncome: formatNumberInput(String(values.monthlyTargetIncome)),
  desiredIncomeReplacement: formatNumberInput(String(values.desiredIncomeReplacement)),
});

function numberField(
  label: string,
  value: string,
  helpText: string,
  onChange: (rawValue: string) => void,
  onBlur: () => void,
) {
  return (
    <TextField
      fullWidth
      label={label}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      size="small"
      slotProps={{
        htmlInput: { min: 0, inputMode: "decimal" },
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={helpText} arrow>
                <IconButton edge="end" size="small" aria-label={label} sx={{ p: 0.5 }}>
                  ?
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default function RetirementCalculator() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [currencyCode, setCurrencyCode] = useState<SupportedCurrency>("THB");
  const [inputs, setInputs] = useState<RetirementInputs>(defaultInputs);
  const [inputDrafts, setInputDrafts] = useState<Record<keyof RetirementInputs, string>>(makeDrafts(defaultInputs));
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("retirement-language");
    if (stored === "th" || stored === "en") {
      setLanguage(stored);
    }
    setIsReady(true);
  }, []);

  const locale = localeMap[language].locale;
  const t = translations[language];
  const result = useMemo(() => calculateRetirementProjection(inputs), [inputs]);

  const updateField = <K extends keyof RetirementInputs>(key: K, value: RetirementInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setInputDrafts((prev) => ({ ...prev, [key]: String(value) }));
  };

  const handleLanguageChange = (nextLanguage: SupportedLanguage) => {
    setLanguage(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("retirement-language", nextLanguage);
    }
  };

  const handleNumericInput = <K extends keyof RetirementInputs>(key: K, rawValue: string) => {
    if (rawValue === "") {
      setInputDrafts((prev) => ({ ...prev, [key]: "" }));
      setInputs((prev) => ({ ...prev, [key]: 0 }));
      return;
    }

    const normalizedValue = rawValue.replace(/,/g, "");
    if (!/^\d*\.?\d*$/.test(normalizedValue)) {
      return;
    }

    const formattedValue = formatNumberInput(rawValue);
    setInputDrafts((prev) => ({ ...prev, [key]: formattedValue }));

    const numericValue = Number(normalizedValue);
    if (!Number.isNaN(numericValue)) {
      setInputs((prev) => ({ ...prev, [key]: numericValue }));
    }
  };

  const handleNumericBlur = <K extends keyof RetirementInputs>(key: K, fallbackValue: number) => {
    const currentDraft = inputDrafts[key];
    const draftValue = currentDraft === "" || currentDraft === null || currentDraft === undefined ? "" : currentDraft;

    if (draftValue === "") {
      setInputDrafts((prev) => ({ ...prev, [key]: formatNumberInput(String(fallbackValue)) }));
      setInputs((prev) => ({ ...prev, [key]: fallbackValue }));
      return;
    }

    const normalizedValue = draftValue.replace(/,/g, "");
    if (normalizedValue === "" || Number.isNaN(Number(normalizedValue))) {
      setInputDrafts((prev) => ({ ...prev, [key]: formatNumberInput(String(fallbackValue)) }));
      setInputs((prev) => ({ ...prev, [key]: fallbackValue }));
    }
  };

  const isOnTrack = result.shortfall <= 0;
  const projectedAmount = currency(result.projectedBalance, currencyCode, locale);
  const shortfallAmount = currency(result.shortfall, currencyCode, locale);
  const requiredFundAmount = currency(result.retirementFundNeeded, currencyCode, locale);
  const monthlyIncomeAmount = currency(result.monthlyIncomeAtRetirement, currencyCode, locale);

  if (!isReady) {
    return (
      <Box
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} style={{ alignItems: "center" }}>
          <CircularProgress size={36} />
          <Typography variant="body2" color="text.secondary">
            {language === "th" ? "กำลังเตรียมแอป..." : "Loading app..."}
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
              }}
            >
              <Typography variant="h5">{t.title}</Typography>

              <Stack direction="row" spacing={2}>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                  <InputLabel id="language-label">{t.language}</InputLabel>
                  <Select
                    labelId="language-label"
                    value={language}
                    label={t.language}
                    onChange={(event) => handleLanguageChange(event.target.value as SupportedLanguage)}
                  >
                    {Object.entries(localeMap).map(([value, item]) => (
                      <MenuItem key={value} value={value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="currency-label">{t.currency}</InputLabel>
                  <Select
                    labelId="currency-label"
                    value={currencyCode}
                    label={t.currency}
                    onChange={(event) => setCurrencyCode(event.target.value as SupportedCurrency)}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="THB">THB</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                {numberField(t.currentAge, inputDrafts.currentAge, t.help.currentAge, (rawValue) => handleNumericInput("currentAge", rawValue), () => handleNumericBlur("currentAge", defaultInputs.currentAge))}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {numberField(t.retirementAge, inputDrafts.retirementAge, t.help.retirementAge, (rawValue) => handleNumericInput("retirementAge", rawValue), () => handleNumericBlur("retirementAge", defaultInputs.retirementAge))}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {numberField(t.lifeExpectancy, inputDrafts.lifeExpectancy, t.help.lifeExpectancy, (rawValue) => handleNumericInput("lifeExpectancy", rawValue), () => handleNumericBlur("lifeExpectancy", defaultInputs.lifeExpectancy))}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {numberField(t.currentSavings, inputDrafts.currentSavings, t.help.currentSavings, (rawValue) => handleNumericInput("currentSavings", rawValue), () => handleNumericBlur("currentSavings", defaultInputs.currentSavings))}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {numberField(t.monthlyContribution, inputDrafts.monthlyContribution, t.help.monthlyContribution, (rawValue) => handleNumericInput("monthlyContribution", rawValue), () => handleNumericBlur("monthlyContribution", defaultInputs.monthlyContribution))}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {numberField(t.annualReturn, inputDrafts.annualReturn, t.help.annualReturn, (rawValue) => handleNumericInput("annualReturn", rawValue), () => handleNumericBlur("annualReturn", defaultInputs.annualReturn))}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {numberField(t.inflation, inputDrafts.annualInflation, t.help.inflation, (rawValue) => handleNumericInput("annualInflation", rawValue), () => handleNumericBlur("annualInflation", defaultInputs.annualInflation))}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {numberField(t.monthlyTargetIncome, inputDrafts.monthlyTargetIncome, t.help.monthlyTargetIncome, (rawValue) => handleNumericInput("monthlyTargetIncome", rawValue), () => handleNumericBlur("monthlyTargetIncome", defaultInputs.monthlyTargetIncome))}
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                {numberField(t.replacement, inputDrafts.desiredIncomeReplacement, t.help.replacement, (rawValue) => handleNumericInput("desiredIncomeReplacement", rawValue), () => handleNumericBlur("desiredIncomeReplacement", defaultInputs.desiredIncomeReplacement))}
              </Grid>
            </Grid>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {t.ageTarget}
              </Typography>
              <Slider
                value={inputs.retirementAge}
                min={40}
                max={80}
                step={1}
                onChange={(_, value) => updateField("retirementAge", Number(value))}
                valueLabelDisplay="auto"
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: isOnTrack ? "success.light" : "warning.light" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="overline">{t.projection}</Typography>
            <Typography variant="h4">
              {projectedAmount} projected by {inputs.retirementAge}
            </Typography>
            <Typography variant="body1">
              {isOnTrack
                ? t.onTrack
                : t.offTrack.replace("{amount}", shortfallAmount)}
            </Typography>
            <Typography variant="body2">
              {t.yearsToRetirement}: {result.yearsToRetirement}
            </Typography>
            <Typography variant="body2">
              {t.yearsInRetirement}: {result.yearsInRetirement}
            </Typography>
            <Typography variant="body2">
              {t.requiredFund}: {requiredFundAmount}
            </Typography>
            <Typography variant="body2">
              {t.incomeAtRetirement}: {monthlyIncomeAmount}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Alert severity={isOnTrack ? "success" : "warning"}>
        {isOnTrack ? t.strongPlan : t.weakPlan}
      </Alert>

      <Button
        variant="contained"
        onClick={() => {
          setInputs(defaultInputs);
          setInputDrafts(makeDrafts(defaultInputs));
        }}
        sx={{ alignSelf: "flex-start" }}
      >
        {t.reset}
      </Button>
    </Stack>
  );
}
