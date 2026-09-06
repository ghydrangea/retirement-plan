import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { currency } from "@/lib/formatters";

export type RetirementSummaryProps = {
  currentSavings: number;
  targetSavings: number;
  annualContribution: number;
  expectedReturn: number;
  yearsToRetirement: number;
};

export default function RetirementSummary({
  currentSavings,
  targetSavings,
  annualContribution,
  expectedReturn,
  yearsToRetirement,
}: RetirementSummaryProps) {
  const gap = Math.max(targetSavings - currentSavings, 0);

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="overline" color="text.secondary">
              Retirement snapshot
            </Typography>
            <Typography variant="h4">{currency(currentSavings)}</Typography>
            <Typography variant="body2" color="text.secondary">
              Current savings
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Annual contribution
            </Typography>
            <Typography variant="h6">{currency(annualContribution)}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Expected return
            </Typography>
            <Typography variant="h6">{expectedReturn}%</Typography>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="overline">Remaining to goal</Typography>
            <Typography variant="h4">{currency(gap)}</Typography>
            <Typography variant="body2">
              {yearsToRetirement} years left to retirement
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Typography variant="body2" color="text.secondary">
        Target goal: <strong>{currency(targetSavings)}</strong>
      </Typography>
    </Stack>
  );
}
