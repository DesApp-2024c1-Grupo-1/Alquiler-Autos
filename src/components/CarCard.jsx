import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export function CarCard({ car }) {
  return <Card sx={{ backgroundColor: "#e4e9f0", display: 'flex', flexDirection: 'row' }} elevation={2}>
    <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
      <Box sx={{ typography: 'h5', mb: 2 }}>{car.name}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>{car.color}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>{car.transmision}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>{car.combustible}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>AC: {car.ac ? "Si" : "No"}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>Capacidad: {car.capacidad}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>Patente: {car.patente}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>${car.price}</Box>
    </Stack>
    <CardMedia
      component="img"
      image={car.image}
      alt="Auto"
      sx={{ width: { xs: 100, sm: 140, lg: 140, xl:140 }}}
    />          
  </Card>;
}