import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CarCard } from '../components/CarCard.jsx';
import { getAllCars } from "../services/CarsService";
import { Buscador } from '../components/Buscador.jsx';
import  Filtros  from '../components/Filtros.jsx';

export function HomePage() {
  const [allCars, setAllCars] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchAllCars = useCallback(async () => {
    const obtainedCars = await getAllCars();
    if (obtainedCars.length === 0) {
      setHasMore(false);
    } else {
      setAllCars(prevCars => [...prevCars, ...obtainedCars]);
    }
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

            <InfiniteScroll
              dataLength={allCars.length}
              next={fetchAllCars}
              hasMore={hasMore}
              loader={<h4>Cargando...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Ya no hay mas autos</b>
                </p>
              }
            >
              <Grid container spacing={2} sx={{ mt: '1rem'}}>
                {allCars.map((carData) => (
                  <Grid key={carData.id} item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ px: 2, py: 0 }}>
                    <CarCard car={carData} />
                  </Grid>
                ))}
              </Grid>
            </InfiniteScroll>

          </Grid>

        </Grid>
      </Box>
    </Container>
  )
}
