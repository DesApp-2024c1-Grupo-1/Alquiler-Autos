import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Grid, FormLabel, InputLabel, Select, MenuItem } from '@mui/material';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

const Filtros = () => {
  const [selectedAireAcondicionado, setAireAcondicionado] = useState('');
  const [selectedCombustibleType, setCombustibleType] = useState('');
  const [selectedTransmisionType, setTransmisionType] = useState('');
  const [capacitiy, setCapacity] = useState('');

  const AireAcondicionadoTypeChange = (event) => {
    setAireAcondicionado(event.target.value);
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

  const [fechaRetiro, setFechaRetiro] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');

  return (
    <Box sx={{ backgroundColor: "#B3D0FB", height: '100%', p: 3, border: 2 }}>

      <Box>
        <Grid direction="column" container spacing={2} my={2.5}>
          <Grid
            pr={1}
            item xs={12} sm={12} xl={12} lg={12}
            sx={{ display: "flex", placeContent: "center", justifyContent: "space-around"}}
            >
            

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                label="Retiro"
                value={fechaRetiro}
                onChange={(newValue) => setFechaRetiro(newValue)}
                sx={{ backgroundColor: "#f5f7fa"}}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                label="Devolucion"
                value={fechaDevolucion}
                onChange={(newValue) => setFechaDevolucion(newValue)}
                sx={{ backgroundColor: "#f5f7fa"}}
              />
            </LocalizationProvider>

          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: 3, display: "flex", placeContent: "center" }}>
        <FormControl sx={{ mr: 2 }}>
          <FormLabel id="demo-controlled-radio-buttons-group">Aire Acondicionado</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedAireAcondicionado}
            onChange={AireAcondicionadoTypeChange}
          >
            <FormControlLabel value="Si" control={<Radio />} label="Si" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
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

        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
          <InputLabel id="demo-select-small-label">Capacidad</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={capacitiy}
            label="capacidad"
            onChange={CapacityTypeChange}
            sx={{ backgroundColor: "#f5f7fa"}}
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
    </Box>
  );
};

export default Filtros;