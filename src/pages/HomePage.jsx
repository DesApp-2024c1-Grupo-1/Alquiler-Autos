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

  return (
    <Container maxWidth="100%">
      <Box sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap' }}>
        <Grid container spacing={2} sx={{ flexGrow: 1, height: '', backgroundColor: pink[200] }}>

          <Grid xs={12} md={4} lg={3} xl={3}>

            {/*TODO: Acá va el componente de filtros */}
            <Item sx={{ backgroundColor: "#B3D0FB", height: '100%' }}>Filtros</Item>
          </Grid>

          <Grid item xs={12} md={8} lg={9} xl={9} sx={{ display: 'flex', flexDirection: 'column', alignItems: '', backgroundColor: "whitesmoke" }}>

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
              {/*TODO: Aca va el componente de pagina / Cargar más */}
              <h1>{'< 1 2 3 >'}</h1>
            </Grid>

          </Grid>

        </Grid>
      </Box>
    </Container>
  )
}


