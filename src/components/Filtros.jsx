import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Grid,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  editFechaRetiro,
  editLugarRetiro,
  editFechaDevolucion,
  editLugarDevolucion,
} from "../store/alquilerFormSlice.js";
import { useLocalStorage } from "../config/useLocalStorage.js";
import { enGB } from "date-fns/locale";
import { es } from "date-fns/locale";

// Lista de lugares predefinidos para los campos "Lugar de Retiro" y "Lugar de Devolución"
export const lugaresFijos = [
  "Hurlingham",
  "Morón",
  "San Martin",
  "Aeroparque",
  "Aeropuerto Ezeiza",
];

const Filtros = ({ handleFiltros }) => {
  const [selectedAireAcondicionado, setAireAcondicionado] = useState(null);
  const [selectedCombustibleType, setCombustibleType] = useState(null);
  const [selectedTransmisionType, setTransmisionType] = useState(null);
  const [capacitiy, setCapacity] = useState("");
  const [retiro, setRetiro] = useState(null);
  const [devolucion, setDevolucion] = useState(null);
  const [loading, setLoading] = useState(false);

  const AireAcondicionadoTypeChange = (event) => {
    setAireAcondicionado(event.target.value);
    console.log("AC: ", event.target.value);
  };

  const CombustibleTypeChange = (event) => {
    setCombustibleType(event.target.value);
    console.log("Combustible: ", event.target.value);
  };

  const TransmisionTypeChange = (event) => {
    setTransmisionType(event.target.value);
    console.log("Transmision: ", event.target.value);
  };

  const CapacityTypeChange = (event) => {
    setCapacity(event.target.value);
    console.log("Capacity: ", event.target.value);
  };

  const BuscarButton = (event) => {
    console.log(
      "BuscarButton: ",
      selectedAireAcondicionado,
      selectedCombustibleType,
      selectedTransmisionType,
      capacitiy,
      retiro,
      devolucion
    );
    setLoading(true);
    const filtros = {
      ac: selectedAireAcondicionado, 
      combustible: selectedCombustibleType, 
      transmision: selectedTransmisionType, 
      capacidad: capacitiy, 
      fechaRetiro: formAlquiler.fechaRetiro, 
      fechaDevolucion: formAlquiler.fechaDevolucion
    }
    console.log("Filtros en BuscarButton: ", filtros);
    handleFiltros(filtros);

    setTimeout(() => setLoading(false), 1380); // Simula llamada a  la api
  };

  const BorrarButton = (event) => {
    const filtros = {
      ac: null,
      combustible: null,
      transmision: null,
      capacidad: null,
      retiro: null,
      devolucion: null,
      fechaRetiro: null, 
      fechaDevolucion: null
    };
    setCapacity("");
    setCombustibleType(null);
    setTransmisionType(null);
    setAireAcondicionado(null);
    handleFiltros(filtros);
  };

  const dispatch = useDispatch();
  const formAlquiler = useSelector((state) => state.alquiler);

  const [error, setError] = React.useState(null);

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "minDate": {
        return "La fecha de devolución no puede ser menor a la de retiro";
      }

      case "invalidDate": {
        return "La fecha es invalida";
      }

      case "disablePast": {
        return "La fecha no puede ser en el pasado";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  //Maneja los cambios en lugar de retiro
  const handleLugarRetiroChange = (event, newValue) => {
    dispatch(editLugarRetiro(newValue)); 
  };

  //Maneja los cambios en lugar de devolución
  const handleLugarDevolucionChange = (event, newValue) => {
    dispatch(editLugarDevolucion(newValue)); 
  };

  {
    /* Campo de Lugar de Retiro y Devolucion modificado para usar Autocomplete */
  }
  return (
    <Box
      sx={{ backgroundColor: "#B3D0FB", height: "100%", p: 3, borderRadius: 5 }}
    >
      <Box>
      <Grid container spacing={2}>
          {/* Lugar de Retiro */}
          <Grid item xs={12} sm={6}>
            <Autocomplete
              freeSolo
              options={lugaresFijos} //Utiliza la misma lista de lugares predefinidos
              value={formAlquiler.lugarRetiro || ''} //Maneja el valor actual
              onInputChange={(event, newValue) => {
                //Permitir solo letras, números, y el símbolo de tilde (´), excluyendo el "+"
                const filteredValue = newValue.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/g, ''); //Filtra caracteres no permitidos
                handleLugarRetiroChange(event, filteredValue); //Actualiza el valor del lugar de retiro
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Lugar de Retiro"
                  sx={{
                    backgroundColor: "#B3D0FB",
                    width: "100%", //Asegura que ocupe todo el ancho del Grid item
                  }}
                  inputProps={{
                    ...params.inputProps,
                    onKeyPress: (event) => {
                      //Bloquear cualquier tecla que no sea letra, número, tilde o espacio
                      if (/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/.test(event.key) || event.key === '+') {
                        event.preventDefault(); //Bloquea los caracteres no permitidos, incluyendo "+"
                      }
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Lugar de Devolución */}
          <Grid item xs={12} sm={6}>
            <Autocomplete
              freeSolo
              options={lugaresFijos} //Utiliza la misma lista de lugares predefinidos
              value={formAlquiler.lugarDevolucion || ''} //Maneja el valor actual
              onInputChange={(event, newValue) => {
                //Permitir solo letras, números, y el símbolo de tilde (´), excluyendo el "+"
                const filteredValue = newValue.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/g, ''); //Filtra caracteres no permitidos
                handleLugarDevolucionChange(event, filteredValue); //Actualiza el valor del lugar de devolución
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Lugar de Devolución"
                  sx={{
                    backgroundColor: "#B3D0FB",
                    width: "100%", //Asegura que ocupe todo el ancho del Grid item
                  }}
                  inputProps={{
                    ...params.inputProps,
                    onKeyPress: (event) => {
                      //Bloquear cualquier tecla que no sea letra, número, tilde o espacio
                      if (/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/.test(event.key) || event.key === '+') {
                        event.preventDefault(); //Bloquea los caracteres no permitidos, incluyendo "+"
                      }
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} my={2}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <MobileDateTimePicker
                label="Retiro"
                value={new Date(formAlquiler.fechaRetiro)}
                onChange={(newValue) => {
                  dispatch(editFechaRetiro(newValue.toString()));
                }}
                sx={{
                  backgroundColor: "#B3D0FB",
                  width: "100%",
                }}
                disablePast
                minutesStep={30} //Horarios cada 30 minutos
                onError={(newError) => {
                  setError(newError);
                }}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <MobileDateTimePicker
                label="Devolucion"
                value={new Date(formAlquiler.fechaDevolucion)}
                onChange={(newValue) =>
                  dispatch(editFechaDevolucion(newValue.toString()))
                }
                sx={{
                  backgroundColor: "#B3D0FB",
                  width: "100%",
                }}
                disablePast
                minutesStep={30} //Horarios cada 30 minutos
                minDate={new Date(formAlquiler.fechaRetiro)}
                onError={(newError) => {
                  setError(newError);
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

      <Box
        sx={{
          p: 3,
          display: "flex",
          placeContent: "center",
          justifyContent: "space-around",
        }}
      >
        <FormControl sx={{ mr: 6 }}>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Aire Acondicionado
          </FormLabel>
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
          <FormLabel id="demo-controlled-radio-buttons-group">
            Combustible
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedCombustibleType}
            onChange={CombustibleTypeChange}
          >
            <FormControlLabel value="Nafta" control={<Radio />} label="Nafta" />
            <FormControlLabel
              value="Electrico"
              control={<Radio />}
              label="Electrico"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        sx={{
          p: 3,
          display: "flex",
          placeContent: "center",
          justifyContent: "space-around",
        }}
      >
        <FormControl sx={{ mr: 2 }}>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Transmisión
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedTransmisionType}
            onChange={TransmisionTypeChange}
          >
            <FormControlLabel
              value="Automatica"
              control={<Radio />}
              label="Automática"
            />
            <FormControlLabel
              value="Manual"
              control={<Radio />}
              label="Manual"
            />
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
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          p: 3,
          display: "flex",
          placeContent: "center",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="outlined"
          color="success"
          sx={{ mr: 3 }}
          onClick={BuscarButton}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24}/> : "Buscar"}
        </Button>
        <Button variant="outlined" color="error" onClick={() => BorrarButton()}>
          Borrar
        </Button>
      </Box>
    </Box>
  );
};

export default Filtros;
