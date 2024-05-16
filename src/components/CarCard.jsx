import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

export function CarCard({ car }) {
  return (
    <NavLink to={`/reserve/${car.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ 
        backgroundColor: "#e4e9f0", 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', // Asegura que el contenido se distribuya de manera uniforme
        height: '100%', // Hace que la tarjeta ocupe todo el espacio disponible
        }} elevation={2}
      >
        <CardMedia
  component="img"
  image={car.image}
  alt="Auto"
  sx={{ 
    width: '100%', 
    height: '100%', // Asegura que la imagen ocupe todo el espacio disponible
    objectFit: 'cover', // Hace que la imagen cubra todo el espacio disponible
  }}
/>

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
      </Card>
    </NavLink>
  );
}
