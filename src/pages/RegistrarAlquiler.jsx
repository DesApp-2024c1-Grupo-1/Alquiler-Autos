import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Card, CardMedia, Grid, Stack, Typography, TextField, OutlinedInput,
  InputLabel, InputAdornment, FormControl, Button
} from "@mui/material";
import { getAllCars } from "../services/CarsService.js";
import { blueGrey } from "@mui/material/colors";
import { useParams } from 'react-router-dom';


function CardAlquiler({car}) {
  return <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'column' }} elevation={2}>
    <CardMedia
      // image={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Orange_Enzo_Ferrari_%287191948164%29.jpg/800px-Orange_Enzo_Ferrari_%287191948164%29.jpg"}
      image={car.image}
      sx={{ width: { xs: 200, sm: 500 }, height: 300 }}
    />
    <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
      <Box sx={{ typography: 'h5', mb: 2, textAlign: 'center' }}>{car.name}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>{car.capacidad} personas</Box>
      {car.ac && <Box sx={{ typography: 'h6', mb: 1 }}>AC</Box>}
      <Box sx={{ typography: 'h6', mb: 1 }}>Transmision: {car.transmision[0].toUpperCase() + car.transmision.slice(1)}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>{car.color[0].toUpperCase() + car.color.slice(1)}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>{car.combustible[0].toUpperCase() + car.combustible.slice(1)}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>Patente: {car.patente}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>${car.price}</Box>
    </Stack>
  </Card>;
}


function FormAlquiler() {
  return (
    <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'column' }} elevation={2} >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Lugar de entrega"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Lugar de devolución"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Fecha de entrega"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Hora de entrega"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Fecha de devolución"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Hora de devolución"
            defaultValue=""
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, display: 'flex', justifyContent: 'center' }} variant="outlined">
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, width: '52ch' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Precio final</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Precio final"
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 2, display: 'flex', justifyContent: 'center' }} variant="outlined">
          </FormControl>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Stack direction="row" spacing={5}>
              <Button variant="contained" color="success">
                Reservar
              </Button>
              <Button variant="contained" color="error">
                Cancelar
              </Button>
            </Stack>
          </Box>
        </div>
      </Box>
    </Card>
  );
}


export function PageAlquiler() {
  const [allCars, setAllCars] = useState();

  const fetchAllCars = useCallback(async () => {
    const obtainedCars = await getAllCars();
    setAllCars(obtainedCars);
  }, []);

  useEffect(() => {
    fetchAllCars()
  }, [fetchAllCars]);

  const params = useParams();
  const carID = params['*'];

  console.log(carID)



  return allCars && <Stack direction='column'>
    <Typography variant='h4' sx={{ mb: 2 }}>Registrar Alquiler</Typography>
    <Grid sx={{ display: 'flex', placeContent: "center" }}>
      <Grid item key={1} xs={12} md={6} sx={{ px: 2, py: 2, mr: 10 }}>
        {
          allCars && allCars.filter((carData) => carData.id == carID).map((carData) => (
            <CardAlquiler car={carData} key={carData.id} />
          ))
        }

      </Grid>
      <Grid item key={2} xs={12} md={6} sx={{ px: 2, py: 2 }}><FormAlquiler /></Grid>

    </Grid>
  </Stack>;
}