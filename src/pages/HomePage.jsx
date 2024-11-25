import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid, Fab, Tooltip } from "@mui/material";
import { KeyboardArrowUp } from '@mui/icons-material';
import { CarCard } from '../components/CarCard.jsx';
import { getAllCarsAvailable } from "../services/CarsService";
import Filtros from '../components/Filtros.jsx';
import ButtonAddCar from "../components/ButtonAddCar.jsx";
import faviconHome from '../assets/faviconHome.jpg';
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";



export function HomePage() {
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formAlquiler = useSelector(state => state.alquiler);

  const fetchAllCars = useCallback(async (filtros) => {
    setIsLoading(true);
    if(!filtros){
      filtros = {
        ac: null,
        capacidad: null,
        fechaRetiro: formAlquiler.fechaRetiro,
        fechaDevolucion: formAlquiler.fechaDevolucion,
        transmision: null,
      }
    }
    try {
      const obtainedCars = await getAllCarsAvailable(filtros);
      setTimeout(() => {
        setAllCars(obtainedCars);
        setIsLoading(false);
      },1000);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      setTimeout(() => {
        setAllCars([]);
        setIsLoading(false);
      }, 1000);
    } 
  }, []);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
      const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = faviconHome;
      document.head.appendChild(favicon);

      return () => {
          favicon.href = '/favicon.ico';
      };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFiltros = (filtros) => {
    console.log("Filtros en handleFiltros: ", filtros)
    fetchAllCars(filtros)
  }

  const deleteCarFromCard = (deletedCar) => {
    setAllCars(allCars.filter(car => car.id != deletedCar.id));
  }

  const editCarFromCard = (editCar) => {
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
              borderRadius: 5,
              pb: 3
            }}>

            <ButtonAddCar setAllCars={setAllCars} allCars={allCars} />
            
            {showScrollButton && (
                  <Tooltip 
                    title={<span style={{ fontSize: '1.2rem' }}>Volver arriba</span>} //Tamaño de la leyenda
                    placement="left" 
                    arrow
                  >
                    <Fab
                      color="primary"
                      onClick={scrollToTop}
                      sx={{
                        width: 80,
                        height: 80,
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        zIndex: 1000,
                      }}
                    >
                      <KeyboardArrowUp sx={{ fontSize: '2rem' }} />
                    </Fab>
                  </Tooltip>
            )}

            <Grid container spacing={2} sx={{ mt: '1rem' }}>
              {isLoading ? (
                Array.from(new Array(6)).map((_, index) => (
                  <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ px: 2, py: 0 }}>
                    <Skeleton
                      variant="rectangular"
                      height={200}
                      animation="wave"
                      sx={{ borderRadius: 2 }}
                    />
                    <Skeleton width="80%" sx={{ mt: 1 }} />
                    <Skeleton width="60%" />
                  </Grid>
                ))
              ) : allCars && allCars.length > 0 ? (
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
