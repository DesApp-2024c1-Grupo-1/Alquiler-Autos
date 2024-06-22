import React, { useCallback, useEffect, useState } from "react";
import { Box, CardActionArea, Container, Grid, Pagination } from "@mui/material";
import { CarCard } from '../components/CarCard.jsx';
import { getAllCars } from "../services/CarsService";
import { Buscador } from '../components/Buscador.jsx';
import  Filtros  from '../components/Filtros.jsx';
import axios from 'axios'

export function HomePage() {
  const [allCars, setAllCars] = useState();

  const fetchAllCars = useCallback(async () => {
    const obtainedCars = await getAllCarsAxios(); //getAllCars();
    setAllCars(obtainedCars);
  }, []);

  useEffect(() => {
    fetchAllCars();
  }, [fetchAllCars]);

  // ============================================================================
  const url = 'http://localhost:3000/car';
//==================================   GET   ==========================================
  // Realizar la petición GET usando Axios
  const getAllCarsAxios = async() =>{
    try {
      const url2 = url
      const response = await axios.get(url2);
      console.log(response.data);
      console.log(allCars)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  //====================================   GET BY ID   ======================================
  // const [selectedCar, setSelectedCar] = useState(null);//null para que no haya ningun auto inicialmente

  // const getCarById = async (id) => {
  //   try {
  //     const response = await axios.get(`${url}/${id}`); // Reemplaza con tu ruta de API correcta para obtener un auto por id
  //     setSelectedCar(response.data); // Asume que response.data es un objeto de auto
  //   } catch (error) {
  //     console.error(`Error fetching car with id ${id}:`, error);
  //     // Maneja el error según tus necesidades (por ejemplo, mostrar mensaje de error)
  //   }
  // };
  //====================================   POST   =====================================================
  
  // const registrarAlquiler = async () => {
  //   try {
  //     const url3 = await axios.get("url/post")
  //     const data =
  //    {
  
  //    }
  //     const response = await axios.post(url3, data)    
  //     console.log(response)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  //===================================================================================================

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


