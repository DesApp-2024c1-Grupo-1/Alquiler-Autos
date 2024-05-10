import React, { useCallback, useEffect, useState } from "react";
import { Box, Card, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import { blueGrey, red, cyan, teal, blue, pink } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import { CarCard } from '../components/CarCard.jsx';
import { getAllCars } from "../services/CarsService";
import { Buscador } from '../components/Buscador.jsx';


const Item = styled(Card)({
  textAlign: 'center',
  border: '1px solid red',
});

export function HomePage() {
  const [allCars, setAllCars] = useState();

  const fetchAllCars = useCallback(async () => {
    const obtainedCars = await getAllCars();
    setAllCars(obtainedCars);
  }, []);

  useEffect(() => {
    fetchAllCars();
  }, [fetchAllCars]);

  return <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ flexGrow: 1, height: '50rem', width: '110rem', backgroundColor: pink[100] }}>

        <Grid xs={6} md={5} lg={3}>
          {/* Acá va el componente de filtros */}
          <Item sx={{ backgroundColor: red[100], height: '100%' }}>Filtros</Item>
        </Grid>

        <Grid xs={6} md={7} lg={9}>

          <Buscador sx={{ height: '10rem' }}></Buscador>

          <Grid sx={{ height: '45rem', backgroundColor: blue[100]}}>
            {allCars && allCars.map(carData => (
              <Grid key={carData.id} xs={12} md={6} lg={4} sx={{ px: 2, py: 2 }}>
                <CarCard car={carData}/>
              </Grid>
            ))}
          </Grid>

        </Grid>

      </Grid>
    </Box>
  </>
}


