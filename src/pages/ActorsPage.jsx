import React, { useCallback, useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid, Stack, Typography, TextField, OutlinedInput, 
         InputLabel, InputAdornment, FormControl, Button
       } from "@mui/material";
import { getAllActors } from "../services/ActorsService";
import { blueGrey } from "@mui/material/colors";


function CardAlquiler({  }) {
  return <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'column' }} elevation={2}>
    <CardMedia
      image={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Orange_Enzo_Ferrari_%287191948164%29.jpg/800px-Orange_Enzo_Ferrari_%287191948164%29.jpg"}
      sx={{ width: { xs: 200, sm: 500 }, height: 300 }}
    /> 
    <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
      <Box sx={{ typography: 'h5', mb: 2, textAlign: 'center' }}>Ferrari Enzo F140</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>.2 puertas</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>.2 personas</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>.AC</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>.Motor V12 6.5L</Box>
    </Stack>      
  </Card>;
}


function FormAlquiler() {
  return (
    <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'column' }} elevation={2}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
        <TextField
          required
          id="outlined-required"
          label="Lugar de entrega"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="Lugar de devolución"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="Fecha de entrega"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="Hora de entrega"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="Fecha de devolución"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="Hora de devolución"
          defaultValue=""
        />
      </div>
      <div>
        <FormControl sx={{ m: 1, display: 'flex', justifyContent: 'center' }} variant="outlined">
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, width: '52ch'}}>
          <InputLabel htmlFor="outlined-adornment-amount">Precio final</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Precio final"
          />
        </FormControl>
      </div>
        <div>
          <FormControl sx={{ m: 2, display: 'flex', justifyContent: 'center' }} variant="outlined">
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack direction="row" spacing={5}>
              <Button variant="contained" color="success">
                Reservar
              </Button>
              <Button variant="contained" color="error">
                Cancelar
              </Button>
            </Stack>
          </Box>
        </div>
      </Box>
    </Card>
  );
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
      <Grid item key={1} xs={12} md={6} sx={{ px: 2, py: 2, mr: 10 }}><CardAlquiler  /></Grid>
      <Grid item key={2} xs={12} md={6} sx={{ px: 2, py: 2 }}><FormAlquiler /></Grid> 
    </Grid> 
  </Stack>;    
}