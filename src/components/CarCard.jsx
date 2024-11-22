import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Icon, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import BuildIcon from '@mui/icons-material/Build';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ButtonEditCar from "./ButtonEditCar";
import { esNuevo } from "../services/Estadisticas";
import DeleteCarDialog from "./DeleteCarDialog";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


//Componente principal con la logica de la Card
export function CarCard({ car, isHomePage, deleteCarFromHome, editCarFromHome }) {
  const configCard = isHomePage
    ? { justifyContent: 'space-between', height: '100%' }
    : {
        backgroundColor: "#e4e9f0",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      };

  const cardOverlayStyle = car.reservado || car.enReparacion ? { opacity: 0.5, color: "black" } : {};

  return (
    <Card sx={configCard}>
      {isHomePage && !car.reservado && !car.enReparacion ? (
        <>
          <Box style={{ textDecoration: 'none' }}>
            <CardActionArea sx={{ color: 'blue' }}>
              <NavLink to={`/reserve/${car.id}`} style={{ textDecoration: 'none' }}>
                <CarCardContent car={car} />
              </NavLink>
            </CardActionArea>
          </Box>

          <CarCardBotones car={car} deleteCarFromHome={deleteCarFromHome} editCarFromHome={editCarFromHome} />
        </>
      ) : (
        <Box style={cardOverlayStyle}>
          <CarCardContent car={car} />
          {car.reservado && <h2 style={{ margin: 0, textAlign: "center" }}>RESERVADO</h2>}
          {car.enReparacion && (
            <h2 style={{ margin: 0, textAlign: "center", color: "darkred" }}>EN TALLER</h2>
          )}
        </Box>
      )}
    </Card>
  );
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
          //minHeight: '300px', // Altura mínima de la imagen
          objectFit: 'cover'
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" 
                    component="div" sx={{ 
                    color: blueGrey[700], 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
  }}>
          {car.brand}{" "}
          {esNuevo(car.fechaLanzamiento) && (
            <span style={{ color: "#ffd803" }}>
              <Icon sx={{pr: 4, pb:4.2}}>
                <AutoAwesomeIcon fontSize="large"/>
              </Icon>
            </span>
            
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
function CarCardBotones({ car, deleteCarFromHome, editCarFromHome }) {

  return (
    <>
      <Grid item xs={12} md={12} >
        <Box display="flex" justifyContent="center" alignItems="center" paddingBottom={2}>
          <CardActions>
            <DeleteCarDialog car={car} deleteCarFromHome={deleteCarFromHome} />
          </CardActions>

          <CardActions>
            <ButtonEditCar carData={car} editCarFromCard={editCarFromHome}/>
          </CardActions>
        </Box>
      </Grid>

    </>
  )

}

