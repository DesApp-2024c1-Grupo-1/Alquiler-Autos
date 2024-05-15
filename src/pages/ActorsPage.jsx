import React, { useCallback, useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { getAllActors } from "../services/ActorsService";
import { blueGrey } from "@mui/material/colors";

const unknownPersonImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg";


function ActorCard({  }) {
  return <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'column' }} elevation={2}>
    <CardMedia
      component="img"
      image={unknownPersonImage}
      alt="Jonathan Pryce"
      sx={{ width: { xs: 100, sm: 500 }, height: 500 }}
    /> 
    <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
      <Box sx={{ typography: 'h5', mb: 2 }}>Prueba</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>Películas</Box>
    </Stack>      
  </Card>;
}


function ActorCard2({  }) {
  return <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'column' }} elevation={2}>
    <Card
      sx={{ width: { xs: 100, sm: 700 }, height: 500 }}
    /> 
    <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
      <Box sx={{ typography: 'h5', mb: 2 }}>{'prueba'}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>Películas</Box>
    </Stack>    
  </Card>;
}


export function ActorsPage() {
  const [allActors, setAllActors] = useState();

  const fetchAllActors = useCallback(async () => {
    const obtainedActors = await getAllActors();
    setAllActors(obtainedActors);
  }, []);

  useEffect(() => {
    fetchAllActors();
  }, [fetchAllActors]);

  return allActors && <Stack direction='column'>
    <Typography variant='h4' sx={{ mb: 2 }}>Registrar Alquiler</Typography>
    <Grid sx={{display: 'flex', placeContent: "center"}}> 
      <Grid item key={1} xs={12} md={6} sx={{ px: 2, py: 2, mr: 10 }}><ActorCard  /></Grid>
      <Grid item key={2} xs={12} md={6} sx={{ px: 2, py: 2 }}><ActorCard2 /></Grid> 
    </Grid> 
  </Stack>;    
}