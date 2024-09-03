import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Card, CardMedia, Grid, Stack, Typography, TextField, OutlinedInput,
  InputLabel, InputAdornment, FormControl, Button, Autocomplete
} from "@mui/material";
import { getCarById, getCarByIdFake } from "../services/CarsService.js";
import { blueGrey } from "@mui/material/colors";
import { useParams } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

import { useDispatch, useSelector } from "react-redux";
import { calculateCantDias, calculatePrecioFinal, newAlquiler, editFechaRetiro, editLugarRetiro, editFechaDevolucion, editLugarDevolucion, editPrecioFinal, editAuto } from "../store/alquilerFormSlice.js";
import { enGB } from 'date-fns/locale';

import AddClientDialog from '../components/AddClientDialog.jsx';
import { set } from "lodash";

import { CarCard } from "../components/CarCard.jsx";
// Lista de lugares predefinidos para los campos "Lugar de Retiro" y "Lugar de Devolución".
import { lugaresFijos } from "../components/Filtros.jsx";

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

export function FormAlquiler({ car }) {

  const dispatch = useDispatch();
  const formAlquiler = useSelector(state => state.alquiler);

  const [retiroValido, setRetiroValido] = useState(true)
  const [devolucionValido, setDevolucionValido] = useState(true)
  const [activeButton, setButton] = useState(true)
  const [lugarRetiroValido, setLugarRetiroValido] = useState(!!formAlquiler.lugarRetiro);
  const [lugarDevolucionValido, setLugarDevolucionValido] = useState(!!formAlquiler.lugarDevolucion);


  useEffect(() => {
    dispatch(editAuto(car));
    dispatch(calculateCantDias())
    dispatch(calculatePrecioFinal(car.price));
  }, []);


  useEffect(() => {
    // Actualiza el estado del botón considerando los campos de lugar
    setButton(retiroValido && devolucionValido && lugarRetiroValido && lugarDevolucionValido);
  }, [retiroValido, devolucionValido, lugarRetiroValido, lugarDevolucionValido]);


  useEffect(() => {
    if (retiroValido && devolucionValido) {
      setButton(true)
    } else {
      setButton(false)
    }
  }, [retiroValido, devolucionValido])

  const [errorRetiro, setErrorRetiro] = React.useState(null);
  const [errorDevolucion, setErrorDevolucion] = React.useState(null);

  const errorMessageRetiro = React.useMemo(() => {
    switch (errorRetiro) {
      case 'minDate': {
        return 'La fecha de devolución no puede ser menor a la de retiro';
      }

      case 'invalidDate': {
        return 'La fecha es invalida';
      }

      case 'disablePast': {
        return 'La fecha no puede ser en el pasado';
      }

      default: {
        return '';
      }
    }
  }, [errorRetiro]);

  const errorMessageDevolucion = React.useMemo(() => {
    switch (errorDevolucion) {
      case 'minDate': {
        return 'La fecha de devolución no puede ser menor a la de retiro';
      }

      case 'invalidDate': {
        return 'La fecha es invalida';
      }

      case 'disablePast': {
        return 'La fecha no puede ser en el pasado';
      }

      default: {
        return '';
      }
    }
  }, [errorDevolucion]);


  //Manteniene los valores ingresados por el usuario
  const handleLugarRetiroChange = (event, newValue) => {
    dispatch(editLugarRetiro(newValue)); 
  };

  const handleLugarDevolucionChange = (event, newValue) => {
    dispatch(editLugarDevolucion(newValue)); 
  };

  return (
    <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'column' }} elevation={2}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 0, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={'8%'} sx={{ p: 2 }}>
          <Grid item xs={12} md={6}>
          <Autocomplete
                freeSolo
                options={lugaresFijos} // Usa la lista de lugares predefinidos
                value={formAlquiler.lugarRetiro || ''}
                onInputChange={handleLugarRetiroChange} //Almacena el lugar incluso si no está en la lista.
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Lugar de Retiro"
                    error={!lugarRetiroValido}
                    helperText={!lugarRetiroValido ? "El lugar de retiro es obligatorio" : ""}
                  />
                )}
              />

          </Grid>
          <Grid item xs={12} md={6}>
          <Autocomplete
                freeSolo
                options={lugaresFijos} // Usa la misma lista de lugares predefinidos
                value={formAlquiler.lugarDevolucion || ''}
                onInputChange={handleLugarDevolucionChange} //Almacena el lugar incluso si no está en la lista.
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Lugar de Devolución"
                    error={!lugarDevolucionValido}
                    helperText={!lugarDevolucionValido ? "El lugar de devolución es obligatorio" : ""}
                  />
                )}
              />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
              <DesktopDateTimePicker
                label="Retiro"
                value={new Date(formAlquiler.fechaRetiro)}
                onChange={(newValue) => dispatch(editFechaRetiro(newValue))}
                disablePast
                onError={(newError) => {
                  setErrorRetiro(newError);
                  setRetiroValido(false);
                }}
                onAccept={() => setRetiroValido(true)}
                slotProps={{
                  textField: { helperText: errorMessageRetiro },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
              <DesktopDateTimePicker
                label="Devolucion"
                value={new Date(formAlquiler.fechaDevolucion)}
                onChange={(newValue) => dispatch(editFechaDevolucion(newValue))}
                disablePast
                minDate={new Date(formAlquiler.fechaRetiro)}
                onError={(newError) => {
                  setErrorDevolucion(newError);
                  setDevolucionValido(false);
                }}
                onAccept={() => setDevolucionValido(true)}
                slotProps={{
                  textField: { helperText: errorMessageDevolucion },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="outlined-required"
              label="Cantidad de días"
              value={formAlquiler.cantidadDias}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              label="Precio final"
              value={formAlquiler.precioFinal}
              onChange={(e) => dispatch(editPrecioFinal(e.target.value))}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Stack direction="row" spacing={2}>
            <AddClientDialog validated={activeButton} />
            <Button variant="contained" color="error" onClick={cancelar}>
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}

function cancelar() {
  history.back();
}




export function PageAlquiler() {
  const params = useParams();
  const carID = params['*'];
  const [car, setCar] = useState();

  const axiosCarById = useCallback(async () => {
    //Descomentar para usar la Base de Datos
    const obtainedCar = await getCarById(carID);
    //const obtainedCar = await getCarByIdFake(carID);
    setCar(obtainedCar);
  }, []);


  useEffect(() => {
    axiosCarById()
  }, []);

  return (
    car && (
      <Stack direction="column" spacing={2} alignItems="inherit">
        <Typography variant="h4" align="left">Registrar Alquiler</Typography>
        <Grid container justifyContent="center">
          <Grid
            item xs={12} sm={6} md={6} lg={5} xl={6} sx={{ display: 'flex', justifyContent: 'flex-end'}}
          >
            <Box 
              // display="flex" justifyContent="flex-start"
              // sx={{ maxWidth: '500px', minWidth: '300px' }}
              sx={{ maxWidth: '500px', mr: '2%'}}
            >
              <CarCard car={car} isHomePage={false} />
            </Box>
          </Grid>
          <Grid
            item xs={12} sm={6} md={6} lg={7} xl={6} sx={{  display: 'flex', justifyContent: 'flex-start'   }}
          >
            <Box 
              // display="flex" justifyContent="s"
              //  sx={{ maxWidth: '700px', minWidth: '350px' }}
              sx={{ maxWidth: '700px', ml: '2%' }}
            >
              <FormAlquiler car={car} />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    )
  );

  return (
    car && (
      <Stack direction="column" spacing={2} alignItems="inherit">
        <Typography variant="h4" align="left">Registrar Alquiler</Typography>
        <Grid container justifyContent="center">
          <Grid
            item xs={12} sm={6} md={6} lg={5} sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Box display="flex" justifyContent="center"
              // sx={{ maxWidth: '500px', minWidth: '300px' }}
              sx={{ maxWidth: '500px', mr: 1 }}
            >
              <CarCard car={car} isHomePage={false} />
            </Box>
          </Grid>
          <Grid
            item xs={12} sm={6} md={6} lg={7} sx={{  display: 'flex', justifyContent: 'center' }}
          >
            <Box display="flex" justifyContent="center"
              //  sx={{ maxWidth: '700px', minWidth: '350px' }}
              sx={{ maxWidth: '700px', ml: 1 }}
            >
              <FormAlquiler car={car} />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    )
  );

}