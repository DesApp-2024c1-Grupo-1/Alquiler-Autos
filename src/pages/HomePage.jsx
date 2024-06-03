import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { CarCard } from '../components/CarCard.jsx';
import { getAllCars } from "../services/CarsService";
import { Buscador } from '../components/Buscador.jsx';
import  Filtros  from '../components/Filtros.jsx';

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
    <Container maxWidth="100%">
      <Box sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap' }}>
        <Grid container spacing={2} sx={{ flexGrow: 1, height: ''}}>

          <Grid item xs={12} md={5} lg={4} xl={4}>
            <Filtros/>
          </Grid>

          <Grid item xs={12} md={7} lg={8} xl={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: '', backgroundColor: "whitesmoke" }}>

            <Buscador sx={{ mx: 20, my: 20 }} />

            <Grid container spacing={2} sx={{ mt: '1rem' }}>
              {allCars && allCars.map((carData) => (
                <Grid key={carData.id} item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ px: 2, py: 0 }}>
                  {/* TODO: A mejorar diseño de la card */}
                  <CarCard car={carData} />
                </Grid>
              ))}
            </Grid>

            <Grid sx={{display: 'flex', flexDirection: 'column', alignItems:'center', color: "darkblue"}}>
              
                <Pagination sx={{pt:2,mb:2}}count={10} color="primary" />
              
              {/* <h1>{'< 1 2 3 >'}</h1> */}
            </Grid>

          </Grid>

        </Grid>
      </Box>
    </Container>
  )
}


