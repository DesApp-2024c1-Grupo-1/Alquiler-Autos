import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Card, CardMedia, Grid, Stack, Typography, TextField, OutlinedInput,
  InputLabel, InputAdornment, FormControl, Button,
  CardContent,
  Icon
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

import BuildIcon from '@mui/icons-material/Build';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

function CardAlquiler({ car }) {
  // return <Card sx={{ color:blueGrey[700], display: 'flex', flexDirection: 'column' }} elevation={2}>
  //   <CardMedia
  //     // image={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Orange_Enzo_Ferrari_%287191948164%29.jpg/800px-Orange_Enzo_Ferrari_%287191948164%29.jpg"}
  //     image={car.image}
  //     sx={{ width: { xs: 200, sm: 500 }, height: 300 }}
  //   />
  //   <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
  //     <Box sx={{ typography: 'h5', mb: 2, textAlign: 'center' }}>{car.name}</Box>
  //     <Box sx={{ typography: 'h6', mb: 1 }}>{car.capacidad} personas</Box>
  //     {car.ac && <Box sx={{ typography: 'h6', mb: 1 }}>AC</Box>}
  //     <Box sx={{ typography: 'h6', mb: 1 }}>Transmision: {car.transmision[0].toUpperCase() + car.transmision.slice(1)}</Box>
  //     <Box sx={{ typography: 'h6', mb: 1 }}>{car.color[0].toUpperCase() + car.color.slice(1)}</Box>
  //     <Box sx={{ typography: 'h6', mb: 1 }}>{car.combustible[0].toUpperCase() + car.combustible.slice(1)}</Box>
  //     <Box sx={{ typography: 'h6', mb: 1 }}>Patente: {car.patente}</Box>
  //     <Box sx={{ typography: 'h6', mb: 1 }}>${car.price} / dia</Box>
  //   </Stack>
  // </Card>;
  return (
    <Card sx={{ 
      //maxWidth: 345 
      //backgroundColor: "#e4e9f0", 
      //display: 'flex', 
      //flexDirection: 'column', 
      justifyContent: 'space-between', // Asegura que el contenido se distribuya de manera uniforme
      height: '100%', // Hace que la tarjeta ocupe todo el espacio disponible
    }}>
        <CardMedia
          component="img"
          height="140"
          image={car.image}
          alt="car image"
          sx={{ width: { xs: 200, sm: 500 }, height: 300 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            {car.brand}
          </Typography>

          <Typography gutterBottom variant="h5" component="div" >
            {car.name}
          </Typography>
          
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <FormatColorFillIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                {car.color}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center"}}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <BuildIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                  {car.transmision}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <LocalGasStationIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                {car.combustible}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <AcUnitIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
              AC: {car.ac ? "Si" : "No"}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <GroupAddIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                {car.capacidad}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <DirectionsCarIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                {car.patente}
              </Box>
            </Grid>
            <Typography gutterBottom variant="h6" component="div" >
              <Box sx={{ fontWeight: 600, color: blueGrey[840], display:"flex", alignItems:"center", pt:2 }}>
                <Icon sx={{display: "flex", alignItems: "center",pr:4}} >
                  <LocalAtmIcon sx={{height:24, width:24, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                 ${car.price} / dia
             </Box>
          </Typography>           
          </Grid>
        </CardContent>
    </Card>
  );
}

export function FormAlquiler({ car }) {

  const dispatch = useDispatch();
  const formAlquiler = useSelector(state => state.alquiler);

  const [retiroValido,setRetiroValido] = useState(true)
  const [devolucionValido,setDevolucionValido] = useState(true)
  const [activeButton,setButton] = useState(true)
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


  const handleLugarRetiroChange = (e) => {
    const value = e.target.value;
    dispatch(editLugarRetiro(value));
    setLugarRetiroValido(!!value); // Verifica si el campo no está vacío
  };

  const handleLugarDevolucionChange = (e) => {
    const value = e.target.value;
    dispatch(editLugarDevolucion(value));
    setLugarDevolucionValido(!!value); // Verifica si el campo no está vacío
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
        <div>
          <TextField
            required
            id="outlined-required"
            label="Lugar de Retiro"
            defaultValue={formAlquiler.lugarRetiro}
            onChange={handleLugarRetiroChange}
            error={!lugarRetiroValido}
            helperText={!lugarRetiroValido ? "El lugar de retiro es obligatorio" : ""}
          />
          <TextField
            required
            id="outlined-required"
            label="Lugar de devolución"
            defaultValue={formAlquiler.lugarDevolucion}
            onChange={handleLugarDevolucionChange}
            error={!lugarDevolucionValido}
            helperText={!lugarDevolucionValido ? "El lugar de devolución es obligatorio" : ""}
          />
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