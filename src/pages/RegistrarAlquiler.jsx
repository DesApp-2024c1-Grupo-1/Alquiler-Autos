import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Card, CardMedia, Grid, Stack, Typography, TextField, OutlinedInput,
  InputLabel, InputAdornment, FormControl, Button
} from "@mui/material";
import { getAllCars } from "../services/CarsService.js";
import { blueGrey } from "@mui/material/colors";
import { useParams } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

import { useDispatch, useSelector } from "react-redux";
import { calculateCantDias,calculatePrecioFinal ,newAlquiler, editFechaRetiro, editLugarRetiro, editFechaDevolucion, editLugarDevolucion, editPrecioFinal, editAuto } from "../store/alquilerFormSlice.js";

function CardAlquiler({ car }) {
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
      <Box sx={{ typography: 'h6', mb: 1 }}>${car.price} / dia</Box>
    </Stack>
  </Card>;
}


function FormAlquiler({ car }) {

  const dispatch = useDispatch();
  const formAlquiler = useSelector(state => state.alquiler);

  useEffect(() => {
    dispatch(editAuto(car));
    dispatch(calculateCantDias())
    dispatch(calculatePrecioFinal(car.price));
  }, []);

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
            label="Lugar de Retiro"
            defaultValue={formAlquiler.lugarRetiro}
            onChange={(e) => dispatch(editLugarRetiro(e.target.value))}
          />
          <TextField
            required
            id="outlined-required"
            label="Lugar de devolución"
            defaultValue={formAlquiler.lugarDevolucion}
            onChange={(e) => dispatch(editLugarDevolucion(e.target.value))}
          />
          <Box>
            <Grid direction="column" container spacing={2} my={2.5}>
              <Grid
                pr={1}
                item xs={12} sm={12} xl={12} lg={12}
                sx={{ display: "flex", placeContent: "center", justifyContent: "space-around" }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDateTimePicker
                    label="Retiro"
                    value={new Date(formAlquiler.fechaRetiro)}
                    onChange={(newValue) => dispatch(editFechaRetiro(newValue.toString()))}
                    sx={{ backgroundColor: "#f5f7fa" }}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDateTimePicker
                    label="Devolucion"
                    value={new Date(formAlquiler.fechaDevolucion)}
                    onChange={(newValue) => dispatch(editFechaDevolucion(newValue.toString()))}
                    sx={{ backgroundColor: "#f5f7fa" }}
                  />
                </LocalizationProvider>

              </Grid>
            </Grid>
          </Box>
        </div>
        <div>
          <FormControl sx={{ m: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row' }} variant="outlined">
            <TextField
              required
              id="outlined-required"
              label="Cantidad de dias"
              value={formAlquiler.cantDias}
              disabled
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, width: '52ch' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Precio final</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Precio final"
              value={formAlquiler.precioFinal}
              onChange={(e) => dispatch(editPrecioFinal(e.target.value))}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 2, display: 'flex', justifyContent: 'center' }} variant="outlined">

            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <Stack direction="row" spacing={5}>
                <Button variant="contained" color="success" onClick={() => console.log(formAlquiler)}>
                  Reservar
                </Button>
                <Button variant="contained" color="error" onClick={cancelar}>
                  Cancelar
                </Button>
              </Stack>
            </Box>
          </FormControl>
        </div>
      </Box>
    </Card>
  );
}

function cancelar() {
  history.back();
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

  return allCars && <Stack direction='column'>
    <Typography variant='h4' sx={{ mb: 2 }}>Registrar Alquiler</Typography>
    <Grid sx={{ display: 'flex', placeContent: "center" }}>
      {
        allCars && allCars.filter((carData) => carData.id == carID).map((carData) => (
          <><Grid item key={1} xs={12} md={6} sx={{ px: 2, py: 2, mr: 10 }}>
            <CardAlquiler car={carData} key={carData.id} />
          </Grid><Grid item key={2} xs={12} md={6} sx={{ px: 2, py: 2 }}>
              <FormAlquiler car={carData} />
            </Grid></>
        ))
      }

    </Grid>
  </Stack>;
}