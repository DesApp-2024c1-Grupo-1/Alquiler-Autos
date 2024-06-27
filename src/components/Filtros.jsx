import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Grid, FormLabel, InputLabel, Select, MenuItem, Button } from '@mui/material';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { editFechaRetiro, editLugarRetiro, editFechaDevolucion, editLugarDevolucion } from "../store/alquilerFormSlice.js";
import { useLocalStorage } from "../config/useLocalStorage.js";
import { enGB } from 'date-fns/locale';


const Filtros = () => {
  const [selectedAireAcondicionado, setAireAcondicionado] = useState('');
  const [selectedCombustibleType, setCombustibleType] = useState('');
  const [selectedTransmisionType, setTransmisionType] = useState('');
  const [capacitiy, setCapacity] = useState('');
  const [retiro, setRetiro] = useLocalStorage('retiro', '')
  const [devolucion, setDevolucion] = useLocalStorage('devolucion', '')

  const AireAcondicionadoTypeChange = (event) => {
    setAireAcondicionado(event.target.value);
    console.log("AC: ", event.target.value)
  };

  const CombustibleTypeChange = (event) => {
    setCombustibleType(event.target.value);
  };

  const TransmisionTypeChange = (event) => {
    setTransmisionType(event.target.value);
  };

  const CapacityTypeChange = (event) => {
    setCapacity(event.target.value);
  };


  const dispatch = useDispatch();
  const formAlquiler = useSelector(state => state.alquiler);

  return (
    <Box sx={{ backgroundColor: "#B3D0FB", height: '100%', p: 3, borderRadius: 5 }}>
      <Box>
        <Grid direction="column" container spacing={2} my={2.5}>
          <Grid
            pr={1}
            item xs={12} sm={12} xl={12} lg={12}
            sx={{ display: "flex", placeContent: "center", justifyContent: "space-around" }}
          >
            <TextField
              required
              id="outlined-required"
              label="Lugar de Retiro"
              sx={{ backgroundColor: "#B3D0FB", pl: 1, flex: 1, mr: 1 }}
              defaultValue={formAlquiler.lugarRetiro}
              onChange={(e) => {
                dispatch(editLugarRetiro(e.target.value));
                setRetiro(e.target.value);
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Lugar de devolución"
              sx={{ backgroundColor: "#B3D0FB", pl: 1, flex: 1, mx: 1 }}
              defaultValue={formAlquiler.lugarDevolucion}
              onChange={(e) => {
                dispatch(editLugarDevolucion(e.target.value));
                setDevolucion(e.target.value);
              }}
            />
          </Grid>
          <Grid
            pr={1}
            item xs={12} sm={12} xl={12} lg={12}
            sx={{ display: "flex", placeContent: "center", justifyContent: "space-around" }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
              <DesktopDateTimePicker
                label="Retiro"
                value={new Date(formAlquiler.fechaRetiro)}
                onChange={(newValue) => dispatch(editFechaRetiro(newValue.toString()))}
                sx={{ backgroundColor: "#B3D0FB", flex: 1, pr: 0, mx: 1 }}
              />
            </LocalizationProvider>
  
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
              <DesktopDateTimePicker
                label="Devolucion"
                value={new Date(formAlquiler.fechaDevolucion)}
                onChange={(newValue) => dispatch(editFechaDevolucion(newValue.toString()))}
                sx={{ backgroundColor: "#B3D0FB", flex: 1, pl: 1, mx: 1 }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
  
      <Box sx={{ p: 3, display: "flex", placeContent: "center" }}>
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
  
      <Box sx={{ p: 3, display: "flex", placeContent: "center" }}>
        <FormControl sx={{ mr: 2 }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Transmisión</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedTransmisionType}
            onChange={TransmisionTypeChange}
          >
            <FormControlLabel value="Automático" control={<Radio />} label="Automático" />
            <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
          </RadioGroup>
        </FormControl>
  
        <FormControl sx={{ ml: 5, minWidth: 140 }} size="small">
          <InputLabel id="demo-select-small-label">Capacidad</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={capacitiy}
            label="capacidad"
            onChange={CapacityTypeChange}
            sx={{ backgroundColor: "#B3D0FB" }}
          >
            <MenuItem value="">
              <em>2</em>
            </MenuItem>
            <MenuItem value={10}>3</MenuItem>
            <MenuItem value={20}>4</MenuItem>
            <MenuItem value={30}>5</MenuItem>
          </Select>
        </FormControl>
      </Box>
  
      <Box sx={{ p: 3, display: "flex", placeContent: "center" }}>
        <Button variant="outlined" color="success" sx={{ mr: 3 }}>
          Buscar
        </Button>
        <Button variant="outlined" color="error">
          Borrar
        </Button>
      </Box>
    </Box>
  );
  
};

export default Filtros;