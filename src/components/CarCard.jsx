import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export function CarCard({ car }) {
  return <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'row' }} elevation={2}>
    <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
      <Box sx={{ typography: 'h5', mb: 2 }}>{car.name}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>{car.price}</Box>
    </Stack>
    <CardMedia
      component="img"
      image={car.image}
      alt="Auto"
      sx={{ width: { xs: 100, sm: 140, lg: 200 }, height: 200 }}
    />          
  </Card>;
}