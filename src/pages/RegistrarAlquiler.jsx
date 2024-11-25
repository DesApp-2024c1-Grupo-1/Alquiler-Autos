import {
  Autocomplete,
  Box,
  Button,
  Card, Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getCarById } from "../services/CarsService.js";

import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { es } from 'date-fns/locale';
import { useDispatch, useSelector } from "react-redux";
import { calculateCantDias, calculatePrecioFinal, editAuto, editFechaDevolucion, editFechaRetiro, editLugarDevolucion, editLugarRetiro, editPrecioFinal } from "../store/alquilerFormSlice.js";

import AddClientDialog from '../components/AddClientDialog.jsx';

import faviconRegistrarAlquiler from '../assets/faviconRegistrarAlquiler.png';
import { CarCard } from "../components/CarCard.jsx";
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
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = faviconRegistrarAlquiler; 
    document.head.appendChild(favicon);

    return () => {
        favicon.href = '/favicon.ico';
    };
}, []);


  useEffect(() => {
    dispatch(editAuto(car));
    dispatch(calculateCantDias())
    dispatch(calculatePrecioFinal(car.price));
    setButton(retiroValido && devolucionValido && lugarRetiroValido && lugarDevolucionValido);
  }, []);


  useEffect(() => {
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
          '& .MuiTextField-root': { m: 0, width: '100%', height: '30%' },
          ml: 0, 
          p: 5, 
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={6} sx={{ p: 0 }}>
          <Grid item xs={12} md={6}>
          <Autocomplete
              freeSolo
              options={lugaresFijos}
              value={formAlquiler.lugarRetiro || ''}
              onInputChange={(event, newValue) => {
                const filteredValue = newValue.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/g, '');
                handleLugarRetiroChange(event, filteredValue);
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
                      //Bloquea cualquier tecla que no sea letra, número, tilde o espacio
                      if (/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/.test(event.key) || event.key === '+') {
                        event.preventDefault();
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
              options={lugaresFijos}
              value={formAlquiler.lugarDevolucion || ''}
              onInputChange={(event, newValue) => {
                //Filtra los caracteres permitidos: letras, números, tildes, y espacios
                const filteredValue = newValue.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/g, '');
                handleLugarDevolucionChange(event, filteredValue);
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
                      //Bloquea cualquier tecla que no sea letra, número, tilde o espacio
                      if (/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/.test(event.key) || event.key === '+') {
                        event.preventDefault();
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
                    minutesStep={30}
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
                    minutesStep={30}
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