import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Grid, FormLabel, InputLabel, Select, MenuItem } from '@mui/material';

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

  return (
    <Box sx={{ backgroundColor: "#B3D0FB", height: '100%', p: 3, border:2}}>
        
        <Box sx={{border:2, backgroundColor:"#ffffff"}}>
          <Box sx={{display:"flex", direction:'row'}}>
            <Box sx={{border:1, backgroundColor:"#AFEEEE"}}>
              <div>Ingrese fecha de retiro</div>
            </Box>
            <Box sx={{border:1, backgroundColor:"#E0FFFF"}}>
              <div>Ingrese fecha de devolución</div>
            </Box>
          </Box>

          <Box sx={{display:"flex"}}>
            <Box sx={{border:1, backgroundColor:"#AFEEEE"}}>
              <div>Ingrese Hora de retiro</div>
            </Box>
            <Box sx={{border:1, backgroundColor:"#E0FFFF"}}>
              <div>Ingrese Hora de devolución</div>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ p: 3, display:"flex", placeContent:"center"}}>
          <FormControl sx={{mr:2}}>
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

        <Box sx={{ p: 3, display:"flex", placeContent:"center"}}>
          <FormControl sx={{mr:2}}>
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