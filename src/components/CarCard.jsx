import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Icon, Stack, Typography } from "@mui/material";
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

export function CarCard({car}) {
  return (
    <NavLink to={`/reserve/${car.id}`} style={{ textDecoration: 'none'}}>
    <Card sx={{ 
      //maxWidth: 345 
      //backgroundColor: "#e4e9f0", 
      //display: 'flex', 
      //flexDirection: 'column', 
      justifyContent: 'space-between', // Asegura que el contenido se distribuya de manera uniforme
      height: '100%', // Hace que la tarjeta ocupe todo el espacio disponible
    }}>
      <CardActionArea>
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
          <Typography gutterBottom variant="h5" component="div" >
            {car.brand}
          </Typography>

          <Typography gutterBottom variant="h5" component="div" >
            {car.name}
          </Typography>
          
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <FormatColorFillIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                {car.color}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center"}}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <BuildIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                  {car.transmision}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <LocalGasStationIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                {car.combustible}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <AcUnitIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
              AC: {car.ac ? "Si" : "No"}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <GroupAddIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                {car.capacidad}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <DirectionsCarIcon sx={{height:18, width:18, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                {car.patente}
              </Box>
            </Grid>
            <Typography gutterBottom variant="h6" component="div" >
              <Box sx={{ fontWeight: 600, color: blueGrey[840], display:"flex", alignItems:"center", pt:2 }}>
                <Icon sx={{display: "flex", alignItems: "center",pr:4}} >
                  <LocalAtmIcon sx={{height:24, width:24, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                 ${car.price} / dia
             </Box>
          </Typography>           
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
    </NavLink>
  );
}
