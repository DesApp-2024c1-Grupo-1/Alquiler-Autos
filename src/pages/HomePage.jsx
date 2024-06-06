import React, { useCallback, useEffect, useState } from "react";
import { Box, Card, CardMedia, Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import { blueGrey, red, cyan, teal, blue, pink } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import { CarCard } from '../components/CarCard.jsx';
import { getAllCars } from "../services/CarsService";
import { Buscador } from '../components/Buscador.jsx';
import  Filtros  from '../components/Filtros.jsx';


// const Item = styled(Card)({
//   textAlign: 'center',
//   border: '1px solid red',
// });

export function HomePage() {
  const [allCars, setAllCars] = useState();

  const fetchAllCars = useCallback(async () => {
    const obtainedCars = await getAllCars();
    setAllCars(obtainedCars);
  }, []);

  useEffect(() => {
    fetchAllCars();
  }, [fetchAllCars]);

  return (
    <Container maxWidth="100%" >
      <Box sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap'}} >
        <Grid container spacing={2} sx={{ flexGrow: 1, height: '', }}>

          <Grid item xs={12} md={5} lg={4} xl={4} sx={{mb:3}}>
            <Filtros/>
          </Grid>

          <Grid item xs={12} md={7} lg={8} xl={8} 
                sx={{ display: 'flex',
                flexDirection: 'column', 
                alignItems: '',
                 backgroundColor: "whitesmoke", 
                 borderRadius:5,
                 pb:3}}>

            <Buscador sx={{ mx: 20, my: 20 }} />

            <Grid container spacing={2} sx={{ mt: '1rem'}}>
              {allCars && allCars.map((carData) => (
                <Grid key={carData.id} item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ px: 2, py: 0 }}>
                  {/* TODO: A mejorar diseño de la card */}
                  <CarCard car={carData} />
                </Grid>
              ))}
            </Grid>

          </Grid>

        </Grid>
      </Box>
    </Container>
  )
}


