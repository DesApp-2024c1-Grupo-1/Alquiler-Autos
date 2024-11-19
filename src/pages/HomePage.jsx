import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { CarCard } from '../components/CarCard.jsx';
import { getAllCarsAvailable } from "../services/CarsService";
import Filtros from '../components/Filtros.jsx';
import ButtonAddCar from "../components/ButtonAddCar.jsx";
import { NavLink } from "react-router-dom";
import { set } from "lodash";
import { Skeleton } from "@mui/material";



export function HomePage() {
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllCars = useCallback(async (filtros) => {
    setIsLoading(true);
    try {
      //Descomentar para usar la Base de Datos
      const obtainedCars = await getAllCarsAvailable(filtros);
      setTimeout(() => {
        setAllCars(obtainedCars);
        setIsLoading(false); // Espera 5 segundos antes de ocultar el loader
      },1000);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      setTimeout(() => {
        setAllCars([]);
        setIsLoading(false);
      }, 1000);
    } 
  }, []);


  const handleFiltros = (filtros) => {
    console.log("Filtros en handleFiltros: ", filtros)
    fetchAllCars(filtros)
  }

  const deleteCarFromCard = (deletedCar) => {
    setAllCars(allCars.filter(car => car.id != deletedCar.id));
  }

  const editCarFromCard = (editCar) => {
    //setAllCars([...allCars, editCar])
    setAllCars(allCars.map(car => car.id === editCar.id ? editCar : car));
  }

  useEffect(() => {
    fetchAllCars();
  }, [fetchAllCars]);


  return (
    <Container maxWidth="100%" >
      <Box sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap' }} >
        <Grid container spacing={2} sx={{ flexGrow: 1, height: '', }}>

          <Grid item xs={12} md={5} lg={4} xl={4} sx={{ mb: 3 }}>
            <Filtros handleFiltros={handleFiltros} />
          </Grid>

          <Grid item xs={12} md={7} lg={8} xl={8}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: '',
              //  backgroundColor: "whitesmoke", 
              borderRadius: 5,
              pb: 3
            }}>

            {/* <Buscador sx={{ mx: 20, my: 20 }} /> */}
            <ButtonAddCar setAllCars={setAllCars} allCars={allCars} />

            <Grid container spacing={2} sx={{ mt: '1rem' }}>
              {isLoading ? (
                // Muestra Skeletons mientras se cargan los datos
                Array.from(new Array(6)).map((_, index) => (
                  <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ px: 2, py: 0 }}>
                    <Skeleton
                      variant="rectangular"
                      height={200} // Altura del Skeleton
                      animation="wave" // Animación (wave, pulse o false)
                      sx={{ borderRadius: 2 }}
                    />
                    <Skeleton width="80%" sx={{ mt: 1 }} />
                    <Skeleton width="60%" />
                  </Grid>
                ))
              ) : allCars && allCars.length > 0 ? (
                // Renderiza las tarjetas cuando los datos están disponibles
                allCars.map((carData, index) => (
                  <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ px: 2, py: 0 }}>
                    <CarCard
                      car={carData}
                      isHomePage={true}
                      deleteCarFromHome={deleteCarFromCard}
                      editCarFromHome={editCarFromCard}
                    />
                  </Grid>
                ))
              ) : (
                // Mensaje de fallback si no hay autos
                <Grid container justifyContent="center" sx={{ height: '100vh', textAlign: 'center' }}>
                  <Box sx={{ p: 2, borderRadius: 1, color: 'grey' }}>
                    <h2>No hay autos disponibles con esos criterios</h2>
                  </Box>
                </Grid>
              )}
            </Grid>

          </Grid>

        </Grid>
      </Box>
    </Container>
  )
}
