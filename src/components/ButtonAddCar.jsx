//import React from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { postCar } from '../services/CarsService';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import { useState } from 'react';


export default function ButtonAddCar() {
  const [open, setOpen] = React.useState(false);
  const [combustible, setCombustible] = React.useState('');
  const [transmision, setTransmision] = React.useState('');
  const [ac, setAc] = React.useState('');
  const [capacidad, setCapacidad] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    formJson.combustible = combustible;
    formJson.transmision = transmision;
    formJson.ac = ac === 'Sí' ? true : false;
    formJson.capacidad = capacidad;

    console.log(formJson);
    postCar(formJson);
    setOpenSnack(true);
    handleClose();
  };

  const handleCloseSnack = () => {
    setOpenSnack(false)
  }

  const [openSnack, setOpenSnack] = useState(false);

   
    return (
    
        <React.Fragment>
          <Button variant="contained" onClick={handleClickOpen} endIcon={<AddCircleOutlineIcon />} sx={{mr: '1rem'}}>
            Agregar Nuevo Auto
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Agregar Nuevo Auto</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Complete los campos a continuación para agregar un nuevo auto.
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="brand"
                  name="brand"
                  label="Marca"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required  
                  margin="dense"
                  id="name"
                  name="name"
                  label="Modelo"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="year"
                  name="year"
                  label="Año"
                  type="number"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="km"
                  name="km"
                  label="Kilometraje"
                  type="number"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="color"
                  name="color"
                  label="Color"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="price"
                  name="price"
                  label="Precio por Día"
                  type="number"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="image"
                  name="image"
                  label="Imagen URL"
                  type="url"
                  fullWidth
                  variant="standard"
                />
                <FormControl fullWidth variant="standard" margin="dense" required>
                    <InputLabel id="transmision-label">Transmisión</InputLabel>
                    <Select
                        labelId="transmision-label"
                        id="transmision"
                        name="transmision"
                        value={transmision}
                        onChange={(e) => setTransmision(e.target.value)}
                        label="transmision"
                    >
                        <MenuItem value="Automática">Automática</MenuItem>
                        <MenuItem value="Manual">Manual</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="standard" margin="dense" required>
                    <InputLabel id="combustible-label">Combustible</InputLabel>
                    <Select
                        labelId="combustible-label"
                        id="combustible"
                        name="combustible"
                        value={combustible}
                        onChange={(e) => setCombustible(e.target.value)}
                        label="Combustible"
                    >
                        <MenuItem value="Nafta">Nafta</MenuItem>
                        <MenuItem value="Eléctrico">Eléctrico</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="standard" margin="dense" required>
                    <InputLabel id="ac-label">Aire Acondicionado</InputLabel>
                    <Select
                        labelId="ac-label"
                        id="ac"
                        name="ac"
                        value={ac}
                        onChange={(e) => setAc(e.target.value)}
                        label="Aire Acondicionado"
                    >
                        <MenuItem value="Sí">Sí</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth variant="standard" margin="dense" required>
                    <InputLabel id="capacidad-label">Capacidad</InputLabel>
                    <Select
                        labelId="capacidad-label"
                        id="capacidad"
                        name="capacidad"
                        value={capacidad}
                        onChange={(e) => setCapacidad(e.target.value)}
                        label="Capacidad"
                    >
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="patente"
                  name="patente"
                  label="Patente"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Agregar Auto</Button>
              </DialogActions>
            </form>
          </Dialog>

          <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert
                    onClose={handleCloseSnack}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Auto agregado con exito
                </Alert>
            </Snackbar>
        </React.Fragment>
      );
}
