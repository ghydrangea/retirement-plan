import { Container, Typography } from "@mui/material";
import RetirementCalculator from "@/components/RetirementCalculator";

export default function Home() {
  return (
    <main>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Retirement plan calculator
        </Typography>
        <RetirementCalculator />
      </Container>
    </main>
  );
}
