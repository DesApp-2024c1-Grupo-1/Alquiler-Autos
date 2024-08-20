import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Icon, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { is } from "date-fns/locale";
import { NavLink } from "react-router-dom";
import BuildIcon from '@mui/icons-material/Build';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

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
          alt="green iguana"
          sx={{ 
             width: '100%', 
             height: '100%', // Asegura que la imagen ocupe todo el espacio disponible
             objectFit: 'cover', // Hace que la imagen cubra todo el espacio disponible
              }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            {car.name}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <FormatColorFillIcon sx={{height:12, width:12, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                {car.color}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center"}}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <BuildIcon sx={{height:12, width:12, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                  {car.transmision}
              </Box>
            </Grid>

              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <BuildIcon sx={{height:12, width:12, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                Combustible: {car.combustible}
              </Box>

              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <BuildIcon sx={{height:12, width:12, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
              AC: {car.ac ? "Si" : "No"}
              </Box>

              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <BuildIcon sx={{height:12, width:12, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                Capacidad: {car.capacidad}
              </Box>

              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <BuildIcon sx={{height:12, width:12, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                Patente: {car.patente}
              </Box>

              <Box sx={{ fontWeight: 600, color: blueGrey[700], display:"flex", alignItems:"center" }}>
                <Icon sx={{display: "flex", alignItems: "center"}} >
                  <BuildIcon sx={{height:12, width:12, mr:10, strokeWidth:1, verticalAlign: "middle"}}/>
                </Icon>
                Precio: ${car.price} / dia
              </Box>
            
          </Grid>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
    </NavLink>
  );
}

// export function CarCard({ car }) {

//   return (
//     <NavLink to={`/reserve/${car.id}`} style={{ textDecoration: 'none'}}>
//       <Card sx={{ 
//         backgroundColor: "#e4e9f0", 
//         display: 'flex', 
//         flexDirection: 'column', 
//         justifyContent: 'space-between', // Asegura que el contenido se distribuya de manera uniforme
//         height: '100%', // Hace que la tarjeta ocupe todo el espacio disponible
//         }} 
//         elevation={2}
//         disabled={true}
//       >
//         <CardMedia
//   component="img"
//   image={car.image}
//   alt="Auto"
//   sx={{ 
//     width: '100%', 
//     height: '100%', // Asegura que la imagen ocupe todo el espacio disponible
//     objectFit: 'cover', // Hace que la imagen cubra todo el espacio disponible
//   }}
// />

//         <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
//           <Box sx={{ typography: 'h5', mb: 2 }}>{car.name}</Box>
//           <Box sx={{ typography: 'h6', mb: 1 }}>{car.color}</Box>
//           <Box sx={{ typography: 'h6', mb: 1 }}>{car.transmision}</Box>
//           <Box sx={{ typography: 'h6', mb: 1 }}>{car.combustible}</Box>
//           <Box sx={{ typography: 'h6', mb: 1 }}>AC: {car.ac ? "Si" : "No"}</Box>
//           <Box sx={{ typography: 'h6', mb: 1 }}>Capacidad: {car.capacidad}</Box>
//           <Box sx={{ typography: 'h6', mb: 1 }}>Patente: {car.patente}</Box>
//           <Box sx={{ typography: 'h6', mb: 1 }}>${car.price} / dia</Box>
//         </Stack>          
//       </Card>
//     </NavLink>
//   );
// }
