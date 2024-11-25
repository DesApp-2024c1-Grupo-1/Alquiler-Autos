import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BuildIcon from '@mui/icons-material/Build';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Alert, Box, CardContent, CardMedia, Grid, Icon, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import placeholderImage from '../assets/car-placeholder.jpg';
import { postCar } from '../services/CarsService';





export default function ButtonAddCar({setAllCars, allCars}) {

  const [open, setOpen] = React.useState(false)
  const [openSnack, setOpenSnack] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const [editableCar, setEditableCar] = useState({
    name: null,
    brand: null,
    year: null,
    km: null,
    color: null,
    price: null,
    image: null,
    patente: null
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isPatenteDuplicated = (patente) => {
    return allCars.some(car => car.patente === patente);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (isPatenteDuplicated(editableCar.patente)) {
      setErrorMessage("La patente ya está registrada");
      setOpenSnack(true); // Muestra el snackbar con error
      return;
    }
    editableCar.ac = editableCar.ac === 'Sí' ? true : false;
    setErrorMessage("Auto agregado con éxito");

    console.log("Agregando auto: ", editableCar)
    const autoAgregado = await postCar(editableCar)
    console.log("Auto agregado: ", autoAgregado);
    setAllCars([...allCars, autoAgregado])
    setOpenSnack(true);
    handleClose();
    setEditableCar({
      name: null,
      brand: null,
      year: null,
      km: null,
      color: null,
      price: null,
      image: null,
      patente: null
    })
  };

  const handleCloseSnack = () => {
    setOpenSnack(false)
  }

  

  return (

    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} endIcon={<AddCircleOutlineIcon />} sx={{ mr: '1rem' }}>
        Agregar Nuevo Auto
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{
        sx: {
          width: '650px', 
          maxWidth: '90%',
        },
      }}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Agregar Nuevo Auto</DialogTitle>
          <DialogContent >
            <DialogContentText>
              Complete los campos a continuación para agregar un nuevo auto.
            </DialogContentText>
            <EditingCard setEditableCar={setEditableCar} editableCar={editableCar} />
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
          severity={errorMessage === "Auto agregado con éxito" ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

    </React.Fragment>
  );


}

function EditingCard({ setEditableCar, editableCar }) {

  function handleInputChange(event) {
    setEditableCar({ ...editableCar, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <CardMedia
        component="img"
        image={editableCar.image || placeholderImage}
        alt="car image"
        sx={{
          width: '400px',
          height: '250px',
          objectFit: 'cover',
          alignContent: 'center',
        }}
      />
      <Grid item xs={12} md={12}>
        <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
          <Icon sx={{ display: "flex", alignItems: "center" }}>
            <AddAPhotoIcon sx={{ height: 18, width: 18, mr: 10 }} />
          </Icon>
          <TextField
            required
            autoComplete='off'
            name="image"
            placeholder='URL de la imagen'
            value={editableCar.image}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            sx={{ width: '100%' }}
          />
        </Box>
      </Grid>

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <NewReleasesIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <TextField
                required
                autoComplete='off'
                name="brand"
                placeholder='Marca'
                value={editableCar.brand}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                sx={{ width: 'auto', display: 'inline' }}
              />
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <FiberNewIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <TextField
                required
                autoComplete='off'
                name="name"
                placeholder='Modelo'
                value={editableCar.name}
                defaultValue={editableCar.name}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                sx={{ width: 'auto', display: 'inline' }}
              />
            </Box>
          </Grid>




          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <FormatColorFillIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <TextField
                required
                autoComplete='off'
                name="color"
                placeholder='Color'
                value={editableCar.color}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <DirectionsCarIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <TextField
                required
                autoComplete='off'
                name="patente"
                placeholder='Patente'
                value={editableCar.patente}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <DirectionsCarIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <TextField
                required
                autoComplete='off'
                name="year"
                placeholder='Año'
                value={editableCar.year}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                type='number'
              />
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <DirectionsCarIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <TextField
                required
                autoComplete='off'
                name="km"
                placeholder='Kilometros'
                value={editableCar.km}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                type='number'
              />
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <BuildIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <FormControl fullWidth variant="standard" margin="dense" required>
                <InputLabel id="transmision-label">Transmisión</InputLabel>
                <Select
                  required
                  onChange={handleInputChange}
                  labelId="transmision-label"
                  id="transmision"
                  name="transmision"
                  value={editableCar.transmision}
                  label="transmision"
                  size='small'
                >
                  <MenuItem value="Automática">Automática</MenuItem>
                  <MenuItem value="Manual">Manual</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <LocalGasStationIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <FormControl fullWidth variant="standard" margin="dense" required>
                <InputLabel id="combustible-label">Combustible</InputLabel>
                <Select
                  labelId="combustible-label"
                  id="combustible"
                  name="combustible"
                  value={editableCar.combustible}
                  required
                  onChange={handleInputChange}
                  label="Combustible"
                  size='small'
                >
                  <MenuItem value="Nafta">Nafta</MenuItem>
                  <MenuItem value="Eléctrico">Eléctrico</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <AcUnitIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <FormControl fullWidth variant="standard" margin="dense" required>
                <InputLabel id="ac-label">Aire Acondicionado</InputLabel>
                <Select
                  labelId="ac-label"
                  id="ac"
                  name="ac"
                  value={editableCar.ac}
                  required
                  onChange={handleInputChange}
                  label="Aire Acondicionado"
                  size='small'
                >
                  <MenuItem value="Sí">Sí</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }}>
                <GroupAddIcon sx={{ height: 18, width: 18, mr: 10 }} />
              </Icon>
              <FormControl fullWidth variant="standard" margin="dense" required>
                <InputLabel id="capacidad-label">Capacidad</InputLabel>
                <Select
                  labelId="capacidad-label"
                  id="capacidad"
                  name="capacidad"
                  value={editableCar.capacidad}
                  required
                  onChange={handleInputChange}
                  label="Capacidad"
                  size='small'
                >
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Typography gutterBottom variant="h6" component="div">
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center", pt: 2 }}>
              <Icon sx={{ display: "flex", alignItems: "center", pr: 4 }}>
                <LocalAtmIcon sx={{ height: 24, width: 24, mr: 10 }} />
              </Icon>
              <TextField
                required
                autoComplete='off'
                name="price"
                placeholder='Precio'
                value={editableCar.price}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                type='number'
              />
              / dia
            </Box>
          </Typography>

        </Grid>
      </CardContent>
    </div>
  );
}


