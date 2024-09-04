import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Icon, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { is } from "date-fns/locale";
import { NavLink } from "react-router-dom";
import BuildIcon from '@mui/icons-material/Build';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonEditCar from "./ButtonEditCar";
import { esNuevo } from "../services/Estadisticas";
import { deleteCarById } from "../services/CarsService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";


//Componente principal con la logica de la Card
export function CarCard({ car, isHomePage, deleteCarFromHome }) {

  const configCard = isHomePage ?
    { justifyContent: 'space-between', height: '100%' } :
    { backgroundColor: "#e4e9f0", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' };


  return (
    <Card sx={configCard}>
      {isHomePage ? (
        <>
          <Box style={{ textDecoration: 'none' }}>
            <CardActionArea sx={{ color: 'blue' }}>
              <NavLink to={`/reserve/${car.id}`} style={{ textDecoration: 'none' }}>
                <CarCardContent car={car} />
              </NavLink>
            </CardActionArea>
          </Box>

          <CarCardBotones car={car} deleteCarFromHome={deleteCarFromHome} />
        </>
      ) : (
        <Box style={{ textDecoration: 'none' }}>
          <CarCardContent car={car} />
        </Box>
      )}
    </Card>
  )
}

//Contenido de la card comun para todas las apariciones de la Card
function CarCardContent({ car }) {
  return (
    <div>
      <CardMedia
        component="img"
        height="140"
        image={car.image}
        alt="car image"
        sx={{
          width: '100%',
          height: '100%', // Asegura que la imagen ocupe todo el espacio disponible
          objectFit: 'cover', // Hace que la imagen cubra todo el espacio disponible
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ color: blueGrey[700] }}>
          {car.brand}{" "}
          {esNuevo(car.fechaLanzamiento) && (
            <span style={{ color: "green" }}>"NEW"</span>
          )}
        </Typography>

        <Typography gutterBottom variant="h6" component="div" sx={{ color: blueGrey[700] }}>
          {car.name}
        </Typography>

        {/* <Typography variant="body2" color="text.secondary" >          
            </Typography> */}

        <Grid container spacing={1}>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }} >
                <FormatColorFillIcon sx={{ height: 18, width: 18, mr: 10, strokeWidth: 1, verticalAlign: "middle" }} />
              </Icon>
              {car.color}
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }} >
                <BuildIcon sx={{ height: 18, width: 18, mr: 10, strokeWidth: 1, verticalAlign: "middle" }} />
              </Icon>
              {car.transmision}
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }} >
                <LocalGasStationIcon sx={{ height: 18, width: 18, mr: 10, strokeWidth: 1, verticalAlign: "middle" }} />
              </Icon>
              {car.combustible}
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }} >
                <AcUnitIcon sx={{ height: 18, width: 18, mr: 10, strokeWidth: 1, verticalAlign: "middle" }} />
              </Icon>
              AC: {car.ac ? "Si" : "No"}
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }} >
                <GroupAddIcon sx={{ height: 18, width: 18, mr: 10, strokeWidth: 1, verticalAlign: "middle" }} />
              </Icon>
              {car.capacidad}
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center" }}>
              <Icon sx={{ display: "flex", alignItems: "center" }} >
                <DirectionsCarIcon sx={{ height: 18, width: 18, mr: 10, strokeWidth: 1, verticalAlign: "middle" }} />
              </Icon>
              {car.patente}
            </Box>
          </Grid>

          <Typography gutterBottom variant="h6" component="div" >
            <Box sx={{ fontWeight: 600, color: blueGrey[700], display: "flex", alignItems: "center", pt: 2 }}>
              <Icon sx={{ display: "flex", alignItems: "center", pr: 4 }} >
                <LocalAtmIcon sx={{ height: 24, width: 24, mr: 10, strokeWidth: 1, verticalAlign: "middle" }} />
              </Icon>
              ${car.price} / dia
            </Box>
          </Typography>

        </Grid>
      </CardContent>
    </div>
  )
}


//Botones Borrar y Eliminar
function CarCardBotones({ car, deleteCarFromHome }) {

  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false)
  }

  const confirmDelete = async (car) => {
      const deletedCar = await deleteCarById(car.id)
      deleteCarFromHome(deletedCar)
      setOpenSnack(true);
  }


  return (
    <>
      <Grid item xs={12} md={12} >
        <Box display="flex" justifyContent="center" alignItems="center" paddingBottom={2}>
          <CardActions>
            <Button variant="outlined" size="small" color="inherit" endIcon={<DeleteIcon />} sx={{ mr: 2, color: blueGrey[700] }} onClick={() => handleClickOpen(car.id)}>
              Borrar
            </Button>
          </CardActions>

          <CardActions>
            <ButtonEditCar carData={car} />
          </CardActions>
        </Box>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Seguro que desea eliminar este vehiculo?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Estas por eliminar {car.brand} {car.name} {car.patente}</p>
            <p> Esta accion no se puede deshacer.</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={
            () => {
              confirmDelete(car);
              handleClose();
            }
          } autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Auto eliminado con exito
        </Alert>
      </Snackbar>

    </>
  )

}

