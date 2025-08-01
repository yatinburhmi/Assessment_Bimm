import { Box, Card, CardContent, Typography } from "@mui/material";
import { Car } from "../types/car.types";

const CarCard = ({ car }: { car: Car }) => {
  const { make, model, year, color, mobile, tablet, desktop } = car;

  return (
    <Card sx={{ maxWidth: 300, mx: "auto" }}>
      <Box>
        <picture>
          <source media="(min-width:1024px)" srcSet={desktop} />
          <source media="(min-width:641px)" srcSet={tablet} />
          <img
            src={mobile}
            alt={`${make} ${model}`}
            style={{ width: "100%", height: "auto", display: "block" }}
            loading="lazy"
          />
        </picture>
      </Box>
      <CardContent>
        <Typography variant="h6">
          {make} {model} {year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {color}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CarCard;
