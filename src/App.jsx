import React from 'react';
import NavBar from "./components/navBar/NavBar"
import { Stack, Grid, Box } from '@mui/material';
import { AppRouter } from './AppRouter';
import ConstructionIcon from '@mui/icons-material/Construction';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HomeIcon from '@mui/icons-material/Home';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const navArrayLinks = [
  
  {
      title:"Taller", path:"/taller", icon: <ConstructionIcon />
  },
  
  {
      title:"Agenda", path:"/agenda", icon: <EventNoteIcon />
  },
  {
       title:"Alquileres", path:"/Alquileres", icon: <EventBusyIcon />
   },
  {
      title:"Estadisticas", path:"/estadisticas", icon: <LeaderboardIcon />
  },
  {
      title:"Home", path:"/", icon: <HomeIcon />
  },

]


function App() {
  return (
    <>
        <Stack direction='column'>
          <Grid container direction='row'>
            <Grid item xs={12}>
            <NavBar navArrayLinks={navArrayLinks}/>
            </Grid>
          </Grid>
          <Box sx={{mx: { xs: 0, md: 4 }, my: 4}}>
            <AppRouter />
          </Box>
        </Stack>
    </>
  )
}

export default App;