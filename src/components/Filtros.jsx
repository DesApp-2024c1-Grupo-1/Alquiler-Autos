import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const Filtros = () => {
  const [selectedAireAcondicionado, setAireAcondicionado] = useState('');
  const [selectedCombustibleType, setCombustibleType] = useState('');
  const [selectedTransmisionType, setTransmisionType] = useState('');
  const [selectedPuertasType, setPuertasType] = useState('');


  const AireAcondicionadoTypeChange = (event) => {
    setAireAcondicionado(event.target.value);
  };

  const CombustibleTypeChange = (event) => {
    setCombustibleType(event.target.value);
  };

  const TransmisionTypeChange = (event) => {
    setTransmisionType(event.target.value);
  };

  const PuertasTypeChange = (event) => {
    setPuertasType(event.target.value);
  };

  return (
    <Box sx={{ backgroundColor: "#B3D0FB", height: '100%', p: 3 }}>
      <Typography variant="h6">Aire Acondicionado</Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedAireAcondicionado} onChange={AireAcondicionadoTypeChange}>
          <FormControlLabel value="si" control={<Radio />} label="Sí" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <Typography variant="h6">Combustible</Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedCombustibleType} onChange={CombustibleTypeChange}>
          <FormControlLabel value="Nafta" control={<Radio />} label="Nafta" />
          <FormControlLabel value="Electrico" control={<Radio />} label="Eléctrico" />
        </RadioGroup>
      </FormControl>

      <Typography variant="h6">Transmisión</Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedTransmisionType} onChange={TransmisionTypeChange}>
          <FormControlLabel value="Automatico" control={<Radio />} label="Automático" />
          <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
        </RadioGroup>
      </FormControl>

      <Typography variant="h6">Puertas</Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedPuertasType} onChange={PuertasTypeChange}>
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </RadioGroup>
      </FormControl>

      
    </Box>
  );
};

export default Filtros;