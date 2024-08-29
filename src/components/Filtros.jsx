import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Grid, FormLabel, InputLabel, Select, MenuItem, Button, Autocomplete } from '@mui/material';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { editFechaRetiro, editLugarRetiro, editFechaDevolucion, editLugarDevolucion } from "../store/alquilerFormSlice.js";
import { useLocalStorage } from "../config/useLocalStorage.js";
import { enGB } from 'date-fns/locale';


const Filtros = ({handleFiltros}) => {
  const [selectedAireAcondicionado, setAireAcondicionado] = useState(null);
  const [selectedCombustibleType, setCombustibleType] = useState(null);
  const [selectedTransmisionType, setTransmisionType] = useState(null);
  const [capacitiy, setCapacity] = useState("");
  const [retiro, setRetiro] = useState(null)
  const [devolucion, setDevolucion] = useState(null)

  const AireAcondicionadoTypeChange = (event) => {
    setAireAcondicionado(event.target.value);
    console.log("AC: ", event.target.value)
  };

  const CombustibleTypeChange = (event) => {
    setCombustibleType(event.target.value);
    console.log("Combustible: ", event.target.value)
  };

  const TransmisionTypeChange = (event) => {
    setTransmisionType(event.target.value);
    console.log("Transmision: ", event.target.value)
  };

  const CapacityTypeChange = (event) => {
    setCapacity(event.target.value);
    console.log("Capacity: ", event.target.value)
  };

  const BuscarButton = (event) => {
    console.log("BuscarButton: ", selectedAireAcondicionado, selectedCombustibleType, selectedTransmisionType, capacitiy, retiro, devolucion)
    const filtros = {ac: selectedAireAcondicionado, combustible: selectedCombustibleType, transmision: selectedTransmisionType, capacidad: capacitiy || null, retiro: retiro, devolucion: devolucion}
    handleFiltros(filtros)
  }

  const BorrarButton = (event) => {
    const filtros = {ac: null, combustible: null, transmision: null, capacidad: null, retiro: null, devolucion: null}
    setCapacity('')
    setCombustibleType(null)
    setTransmisionType(null)
    setAireAcondicionado(null)
    handleFiltros(filtros)
  }


  const dispatch = useDispatch();
  const formAlquiler = useSelector(state => state.alquiler);

  const [error, setError] = React.useState(null);

  const errorMessage = React.useMemo(() => {
    switch (error) {
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
  }, [error]);

  // Lista de lugares predefinidos para los campos "Lugar de Retiro" y "Lugar de Devolución"
  const predefinedLocations = ["Hurlingham", "Morón", "San Martin", "Aeroparque", "Aeropuerto Ezeiza"];

  return (
    <Box sx={{ backgroundColor: "#B3D0FB", height: '100%', p: 3, borderRadius: 5 }}>
      <Box>
        <Grid direction="column" container spacing={2}>
          <Grid
            pr={1}
            my={2}
            item xs={12} sm={12} xl={12} lg={12}
            sx={{ display: "flex", placeContent: "center", justifyContent: "space-around" }}
          >
            <Autocomplete
              freeSolo
              options={predefinedLocations} //Utiliza la lista de lugares predefinidos
              value={retiro || formAlquiler.lugarRetiro} //Aca Maneja el valor actual
              onChange={(event, newValue) => {
                setRetiro(newValue); //Actualiza el estado local
                dispatch(editLugarRetiro(newValue)); //Actualiza el valor en Redux
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Lugar de Retiro"
                  sx={{ backgroundColor: "#B3D0FB", pl: 1, flex: 1, mr: 1 }}
                />
              )}
            />
            <Autocomplete
              freeSolo
              options={predefinedLocations} //Utiliza la misma lista de lugares predefinidos
              value={devolucion || formAlquiler.lugarDevolucion} //Aca Maneja el valor actual
              onChange={(event, newValue) => {
                setDevolucion(newValue); //Actualiza el estado local
                dispatch(editLugarDevolucion(newValue)); //Actualiza el valor en Redux
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Lugar de devolución"
                  sx={{ backgroundColor: "#B3D0FB", pl: 1, flex: 1, mx: 1 }}
                />
              )}
            />
          </Grid>

          <Grid
            my={2}
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
                sx={{ backgroundColor: "#B3D0FB", flex: 1, pr: 0, mx: 1 }}
                disablePast
                onError={(newError) => {
                  setError(newError)
                }}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
              />
            </LocalizationProvider>
  
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
              <DesktopDateTimePicker
                label="Devolucion"
                value={new Date(formAlquiler.fechaDevolucion)}
                onChange={(newValue) => dispatch(editFechaDevolucion(newValue.toString()))}
                sx={{ backgroundColor: "#B3D0FB", flex: 1, pl: 1, mx: 1 }}
                disablePast
                minDate={new Date(formAlquiler.fechaRetiro)}
                onError={(newError) => {
                  setError(newError)
                }}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
  
      <Box sx={{ p: 3, display: "flex", placeContent: "center", justifyContent: "space-around" }}>
        <FormControl sx={{ mr: 6 }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Aire Acondicionado</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedAireAcondicionado}
            onChange={AireAcondicionadoTypeChange}
          >
            <FormControlLabel value={true} control={<Radio />} label="Si" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
  
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Combustible</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedCombustibleType}
            onChange={CombustibleTypeChange}
          >
            <FormControlLabel value="Nafta" control={<Radio />} label="Nafta" />
            <FormControlLabel value="Electrico" control={<Radio />} label="Electrico" />
          </RadioGroup>
        </FormControl>
      </Box>
  
      <Box sx={{ p: 3, display: "flex", placeContent: "center", justifyContent: "space-around"  }}>
        <FormControl sx={{ mr: 2 }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Transmisión</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedTransmisionType}
            onChange={TransmisionTypeChange}
          >
            <FormControlLabel value="Automatica" control={<Radio />} label="Automática" />
            <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
          </RadioGroup>
        </FormControl>
  
        <FormControl sx={{ ml: 10, width: 140 }} size="small">
          <InputLabel id="demo-select-small-label">Capacidad</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={capacitiy}
            label="capacidad"
            onChange={CapacityTypeChange}
            sx={{ backgroundColor: "#B3D0FB" }}
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Box>
  
      <Box sx={{ p: 3, display: "flex", placeContent: "center", justifyContent: "space-around"  }}>
        <Button 
        variant="outlined" 
        color="success" 
        sx={{ mr: 3 }}
        onClick={() => BuscarButton()}
        >
          Buscar
        </Button>
        <Button 
        variant="outlined" 
        color="error"
        onClick={() => BorrarButton()}
        >
          Borrar
        </Button>
      </Box>
    </Box>
  );
  
};

export default Filtros;