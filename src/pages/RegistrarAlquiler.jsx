import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Card, Grid, Stack, Typography, TextField,
   InputAdornment, Button, Autocomplete
} from "@mui/material";
import { getCarById } from "../services/CarsService.js";
import { blueGrey } from "@mui/material/colors";
import { useParams } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import { useDispatch, useSelector } from "react-redux";
import { calculateCantDias, calculatePrecioFinal, editFechaRetiro, editLugarRetiro, editFechaDevolucion, editLugarDevolucion, editPrecioFinal, editAuto } from "../store/alquilerFormSlice.js";
import { enGB } from 'date-fns/locale';
import { es } from 'date-fns/locale';

import AddClientDialog from '../components/AddClientDialog.jsx';

import { CarCard } from "../components/CarCard.jsx";
// Lista de lugares predefinidos para los campos "Lugar de Retiro" y "Lugar de Devolución".
import { lugaresFijos } from "../components/Filtros.jsx";

export function FormAlquiler({ car }) {

  const dispatch = useDispatch();
  const formAlquiler = useSelector(state => state.alquiler);

  const [retiroValido, setRetiroValido] = useState(!!formAlquiler.fechaRetiro);
  const [devolucionValido, setDevolucionValido] = useState(!!formAlquiler.fechaDevolucion);
  const [lugarRetiroValido, setLugarRetiroValido] = useState(!!formAlquiler.lugarRetiro);
  const [lugarDevolucionValido, setLugarDevolucionValido] = useState(!!formAlquiler.lugarDevolucion);
  const [activeButton, setButton] = useState()


  useEffect(() => {
    dispatch(editAuto(car));
    dispatch(calculateCantDias())
    dispatch(calculatePrecioFinal(car.price));
    setButton(retiroValido && devolucionValido && lugarRetiroValido && lugarDevolucionValido);
  }, []);


  useEffect(() => {
    // Actualiza el estado del botón considerando los campos de lugar
    setButton(retiroValido && devolucionValido && lugarRetiroValido && lugarDevolucionValido);
  }, [retiroValido, devolucionValido, lugarRetiroValido, lugarDevolucionValido]);



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
    setLugarRetiroValido(!!newValue);
  };

  const handleLugarDevolucionChange = async (event, newValue) => {
    dispatch(editLugarDevolucion(newValue));
    setLugarDevolucionValido(!!newValue);
  };

  const handleFechas = async (newValue, tipo) => {
    if (tipo == 'retiro') {
      dispatch(editFechaRetiro(newValue.toString()));
      validarFechas(newValue.toString(), formAlquiler.fechaDevolucion, tipo);
    }
    if (tipo == 'devolucion') {
      dispatch(editFechaDevolucion(newValue.toString()));
      validarFechas(formAlquiler.fechaRetiro, newValue.toString());
    }
    
  }

  const validarFechas = (fRetiro,fDevolucion) => {
    fRetiro = new Date(fRetiro)
    fDevolucion = new Date(fDevolucion)
    if(fRetiro < fDevolucion){
      setRetiroValido(true)
      setDevolucionValido(true)
    }else{
      setRetiroValido(false)
      setDevolucionValido(false)
    }
  }

  const handleFechasError = (newError, tipo) => {
    if (tipo == 'retiro') {
      setRetiroValido(false)
      setErrorRetiro(newError);
    }
    if (tipo == 'devolucion') {
      setDevolucionValido(false)
      setErrorDevolucion(newError);
    }
  }
  
  
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
                onInputChange={(event, newValue) => {
                  const filteredValue = newValue.replace(/[0-9]/g, ''); // Elimina números
                  handleLugarRetiroChange(event, filteredValue); //Almacena el lugar incluso si no está en la lista.
                }} 
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Lugar de Retiro"
                    error={!lugarRetiroValido}
                    helperText={!lugarRetiroValido ? "El lugar de retiro es obligatorio" : ""}
                    inputProps={{
                      ...params.inputProps,
                      onKeyPress: (event) => {
                        if (/[0-9]/.test(event.key)) {
                          event.preventDefault(); // Bloquea números en tiempo real
                        }
                      },
                    }}
                  />
                )}
              />

          </Grid>
          <Grid item xs={12} md={6}>
          <Autocomplete
                freeSolo
                options={lugaresFijos} // Usa la misma lista de lugares predefinidos
                value={formAlquiler.lugarDevolucion || ''}
                onInputChange={(event, newValue) => {
                  const filteredValue = newValue.replace(/[0-9]/g, ''); // Elimina números
                  handleLugarDevolucionChange(event, filteredValue); //Almacena el lugar incluso si no está en la lista.
                }} 
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Lugar de Devolución"
                    error={!lugarDevolucionValido}
                    helperText={!lugarDevolucionValido ? "El lugar de devolución es obligatorio" : ""}
                    inputProps={{
                      ...params.inputProps,
                      onKeyPress: (event) => {
                        if (/[0-9]/.test(event.key)) {
                          event.preventDefault(); // Bloquea números en tiempo real
                        }
                      },
                    }}
                  />
                )}
              />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                  <MobileDateTimePicker
                    label="Retiro"
                    value={new Date(formAlquiler.fechaRetiro)}
                    onChange={(newValue) => {
                      handleFechas(newValue, 'retiro')
                      dispatch(editFechaRetiro(newValue.toString()))
                    }}
                    disablePast
                    minutesStep={30} //Horarios cada 30 minutos
                    onError={(newError) => {handleFechasError(newError, 'retiro')}}
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
          </Grid>
          <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                  <MobileDateTimePicker
                    label="Devolucion"
                    value={new Date(formAlquiler.fechaDevolucion)}
                    onChange={(newValue) => {
                      handleFechas(newValue, 'devolucion')
                      dispatch(editFechaDevolucion(newValue.toString()))
                    }}
                    disablePast
                    minutesStep={30} //Horarios cada 30 minutos
                    minDate={new Date(formAlquiler.fechaRetiro)}
                    onError={(newError) => {handleFechasError(newError, 'devolucion')}}
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
    const obtainedCar = await getCarById(carID);
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
              sx={{ maxWidth: '500px', mr: '2%'}}
            >
              <CarCard car={car} isHomePage={false} />
            </Box>
          </Grid>
          <Grid
            item xs={12} sm={6} md={6} lg={7} xl={6} sx={{  display: 'flex', justifyContent: 'flex-start'   }}
          >
            <Box 
              sx={{ maxWidth: '700px', ml: '2%' }}
            >
              <FormAlquiler car={car} />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    )
  );


}