
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

import EditIcon from '@mui/icons-material/Edit';
import { blueGrey } from "@mui/material/colors";


export default function ButtonEditCar(car) {

    const {carData} = car
    const [open, setOpen] = React.useState(false);
    const [combustible, setCombustible] = React.useState('');
    const [transmision, setTransmision] = React.useState('');
    const [ac, setAc] = React.useState('');
    const [capacidad, setCapacidad] = React.useState('');
    const [formValues, setFormValues] = React.useState({
      name: '',
      brand: '',
      year: '',
      km: '',
      color: '',
      price: '',
      image: '',
      patente: ''
    })

    React.useEffect(() => {
      if (carData) {
          // Si hay auto, se establece sus como valores iniciales
          setFormValues({
              name: carData.name || '',
              brand: carData.brand || '',
              year: carData.year || '',
              km: carData.km || '',
              color: carData.color || '',
              price: carData.price || '',
              image: carData.image || '',
              patente: carData.patente || ''
          });
          setCombustible(carData.combustible || '');
          setTransmision(carData.transmision || '');
          setAc(carData.ac ? 'Sí' : 'No');
          setCapacidad(carData.capacidad || '');
      }
  }, [carData]); // Se ejecuta cada vez que carData cambie
    


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
        formJson.ac = ac === 'Sí' ? 1 : 0;
        formJson.capacidad = capacidad;
    
        console.log(formJson);
        handleClose();
      };

  return (
    <React.Fragment>
          <Button variant="outlined" size="small" color="inherit" endIcon={<EditIcon />} sx={{color:blueGrey[700]}} onClick={handleClickOpen}>
           {/* variant="contained" onClick={handleClickOpen} endIcon={<EditIcon />}> */}
            Editar
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Editar Auto seleccionado</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Modifique los campos a continuación para editar el auto.
                </DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Marca"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={formValues.name}
                  onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                />
                <TextField
                  autoFocus
                  required  
                  margin="dense"
                  id="brand"
                  name="brand"
                  label="Modelo"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={formValues.brand}
                  onChange={(e) => setFormValues({ ...formValues, brand: e.target.value })}
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
                  value={formValues.year}
                  onChange={(e) => setFormValues({ ...formValues, year: e.target.value })}
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
                  value={formValues.km}
                  onChange={(e) => setFormValues({...formValues, km: e.target.value })}
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
                  value={formValues.color}
                  onChange={(e) => setFormValues({...formValues, color: e.target.value })}
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
                  value={formValues.price}
                  onChange={(e) => setFormValues({...formValues, price: e.target.value })}
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
                  value={formValues.image}
                  onChange={(e) => setFormValues({...formValues, image: e.target.value })}
                />
                <FormControl fullWidth variant="standard" margin="dense" requered>
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

                <FormControl fullWidth variant="standard" margin="dense" requered>
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

                <FormControl fullWidth variant="standard" margin="dense" requered>
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

                <FormControl fullWidth variant="standard" margin="dense" requered>
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
                  value={formValues.patente}
                  onChange={(e) => setFormValues({...formValues, patente: e.target.value })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">Agregar Auto</Button>
              </DialogActions>
            </form>
          </Dialog>
        </React.Fragment>
  )
}