import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Card, CardMedia, Grid, Stack, Typography, TextField, OutlinedInput,
  InputLabel, InputAdornment, FormControl, Button, Autocomplete
} from "@mui/material";
import {  getCarById,getCarByIdFake  } from "../services/CarsService.js";
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

  const [retiroValido,setRetiroValido] = useState(true)
  const [devolucionValido,setDevolucionValido] = useState(true)
  const [activeButton,setButton] = useState(true)
  const [lugarRetiroValido, setLugarRetiroValido] = useState(!!formAlquiler.lugarRetiro);
  const [lugarDevolucionValido, setLugarDevolucionValido] = useState(!!formAlquiler.lugarDevolucion);

  // Lista de lugares predefinidos para los campos "Lugar de Retiro" y "Lugar de Devolución"
  const predefinedLocations = ["Hurlingham", "Morón", "San Martin", "Aeroparque", "Aeropuerto Ezeiza"];

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
    if(retiroValido && devolucionValido){
      setButton(true)
    }else{
      setButton(false)
    }
  },[retiroValido,devolucionValido])

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


  // Maneja el cambio de lugar de retiro usando Autocomplete
  const handleLugarRetiroChange = (event, value) => {
    dispatch(editLugarRetiro(value));
    setLugarRetiroValido(!!value);
  };

  // Maneja el cambio de lugar de devolución usando Autocomplete
  const handleLugarDevolucionChange = (event, value) => {
    dispatch(editLugarDevolucion(value));
    setLugarDevolucionValido(!!value);
  };


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
        {/* Campo de Lugar de Retiro y Devolucion modificado para usar Autocomplete */}
        <div>
          {/* Usamos un Grid para alinear los campos de Lugar de Retiro y Lugar de Devolución en una fila */}
          <Grid container spacing={2}> {/* Grid container para organizar los elementos en una fila */}
            <Grid item xs={12} sm={6}> {/* Lugar de Retiro en la primera columna */}
              <Autocomplete
                freeSolo
                options={predefinedLocations} // Usa la lista de lugares predefinidos
                value={formAlquiler.lugarRetiro}
                onChange={handleLugarRetiroChange} // Usa el manejador adaptado para Autocomplete
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

            <Grid item xs={12} sm={6}> {/* Lugar de Devolución en la segunda columna */}
              <Autocomplete
                freeSolo
                options={predefinedLocations} // Usa la misma lista de lugares predefinidos
                value={formAlquiler.lugarDevolucion}
                onChange={handleLugarDevolucionChange} // Usa el manejador adaptado para Autocomplete
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
          </Grid>

          <Box>
            <Grid direction="column" container spacing={2} my={2.5}>
              <Grid
                pr={1}
                item xs={12} sm={12} xl={12} lg={12}
                sx={{ display: "flex", placeContent: "center", justifyContent: "space-around" }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                  <DesktopDateTimePicker
                    label="Retiro"
                    value={new Date(formAlquiler.fechaRetiro)}
                    onChange={(newValue) => {
                      dispatch(editFechaRetiro(newValue.toString()))
                    }}
                    sx={{ backgroundColor: "#f5f7fa" }}
                    disablePast
                    onError={(newError) => {
                      setErrorRetiro(newError)
                      setRetiroValido(false)
                    }}
                    onAccept={() => {
                      setRetiroValido(true)
                    }}
                    slotProps={{
                      textField: {
                        helperText: errorMessageRetiro,
                      },
                    }}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                  <DesktopDateTimePicker
                    label="Devolucion"
                    value={new Date(formAlquiler.fechaDevolucion)}
                    onChange={(newValue) => {
                      dispatch(editFechaDevolucion(newValue.toString()))
                    }}
                    sx={{ backgroundColor: "#f5f7fa" }}
                    disablePast
                    minDate={new Date(formAlquiler.fechaRetiro)}
                    onError={(newError) => {
                      setErrorDevolucion(newError)
                      setDevolucionValido(false)
                    }}
                    slotProps={{
                      textField: {
                        helperText: errorMessageDevolucion,
                      },
                    }}
                    onAccept={() => {
                      setDevolucionValido(true)
                    }}
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
              value={formAlquiler.cantidadDias}
              disabled
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, width: '52ch' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Precio final</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
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
                <AddClientDialog validated={activeButton}></AddClientDialog>
                <Button variant="contained" color="error" onClick={() => {cancelar}}>
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


  return car && <Stack direction='column'>
    <Typography variant='h4' sx={{ mb: 2 }}>Registrar Alquiler</Typography>
    <Grid sx={{ display: 'flex', placeContent: "center" }}>
          <><Grid item key={1} xs={12} md={6} sx={{ px: 2, py: 2, mr: 10 }}>
            <CardAlquiler car={car} key={car.id} />
          </Grid><Grid item key={2} xs={12} md={6} sx={{ px: 2, py: 2 }}>
              <FormAlquiler car={car} />
            </Grid></>
    </Grid>
  </Stack>;
}