import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid, Fab, Tooltip } from "@mui/material";
import { KeyboardArrowUp } from '@mui/icons-material'; //Icono para el boton
import { CarCard } from '../components/CarCard.jsx';
import { getAllCarsAvailable } from "../services/CarsService";
import Filtros from '../components/Filtros.jsx';
import ButtonAddCar from "../components/ButtonAddCar.jsx";
import { NavLink } from "react-router-dom";
import { set } from "lodash";



export function HomePage() {
  const [allCars, setAllCars] = useState([]);

  const fetchAllCars = useCallback(async (filtros) => {
    //Descomentar para usar la Base de Datos
    const obtainedCars = await getAllCarsAvailable(filtros); 
    //const obtainedCars = await getAllCarsFake();
    setAllCars(obtainedCars);
  }, []);

  const [showScrollButton, setShowScrollButton] = useState(false); //Estado para controlar la visibilidad del botón

  //Effect para controlar la visibilidad del botón de scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Función para hacer scroll hacia arriba
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
            
            {/* Botón para hacer scroll hacia arriba con Tooltip */}
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
                        width: 80, //Ancho del botón
                        height: 80, //Alto del botón
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        zIndex: 1000,
                      }}
                    >
                      <KeyboardArrowUp sx={{ fontSize: '2rem' }} /> {/* Tamaño del ícono */}
                    </Fab>
                  </Tooltip>
            )}

            <Grid container spacing={2} sx={{ mt: '1rem' }}>
              {allCars && allCars.length > 0 ? (
                allCars.map((carData,index) => (
                  <Grid key={index} item xs={12} sm={12} md={12} lg={6} xl={4} sx={{ px: 2, py: 0 }}>
                      <CarCard car={carData} isHomePage={true} deleteCarFromHome={deleteCarFromCard} editCarFromHome={editCarFromCard}/>
                  </Grid>
                ))
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  sx={{ height: '100vh', textAlign: 'center' }}
                >
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
