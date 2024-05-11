// import React, { useEffect, useState } from "react";
// import { Box, Grid, Stack } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { TopMenu } from "./components/TopMenu";
// import { AppRouter } from "./AppRouter";
// import { getCurrentWeather } from "./services/WeatherService";
// import { WeatherIndicator } from "./components/WeatherIndicator";

// export function App() {
//   const [weatherData, setWeatherData] = useState();

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const obtainedData = await getCurrentWeather('Buenos Aires');
//       setWeatherData(obtainedData);
//     }
//     fetchWeatherData();
//   }, []);

//   return (
//     <BrowserRouter>
//       <Stack direction='column'>
//         <Grid container direction='row'>
//           <Grid item xs={12} md={8}>
//             <TopMenu />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <WeatherIndicator weatherData={weatherData} />
//           </Grid>
//         </Grid>
//         <Box sx={{mx: { xs: 1, md: 4 }, my: 4}}>
//           <AppRouter />
//         </Box>
//       </Stack>
//     </BrowserRouter>
//   )
// }

import React from 'react';
import { Container } from '@mui/material';
import NavBar from "./components/navBar/NavBar"
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Taller from './pages/Taller';
import Agenda from './pages/Agenda';
import CancelarAlquiler from './pages/CancelarAlquiler';
import Estadisticas from './pages/Estadisticas';
import RegistrarPago from './pages/RegistrarPago';
import Login from './pages/Login';

import ConstructionIcon from '@mui/icons-material/Construction';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';


const navArrayLinks = [
  {
      title:"Taller", path:"/taller", icon: <ConstructionIcon />
  },
  {
      title:"Agenda", path:"/agenda", icon: <EventNoteIcon />
  },
  {
      title:"Cancelar Alquiler", path:"/cancelarAlquiler", icon: <EventBusyIcon />
  },
  {
      title:"Estadisticas", path:"/estadisticas", icon: <LeaderboardIcon />
  },
  {
      title:"Registrar Pago", path:"/registrarPago", icon: <CurrencyExchangeIcon />
  },
  {
      title:"Home", path:"/", icon: <HomeIcon />
  },
  {
      title:"Login", path:"/login", icon: <LoginIcon />
  }

]


function App() {
  return (
    <>
      <NavBar navArrayLinks={navArrayLinks}/>
      <Container sx={{ mt:5 }}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/taller" element={<Taller />}/>
          <Route path="/agenda" element={<Agenda />}/>
          <Route path="/cancelarAlquiler" element={<CancelarAlquiler />}/>
          <Route path="/estadisticas" element={<Estadisticas />}/>
          <Route path="/registrarPago" element={<RegistrarPago />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;