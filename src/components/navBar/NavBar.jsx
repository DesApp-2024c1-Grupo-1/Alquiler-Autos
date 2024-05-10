import React, { useState } from 'react';
import NavListDrawer from './NavListDrawer';
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography, Box, Icon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import ConstructionIcon from '@mui/icons-material/Construction';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';


const navLinks = [
    {
        title:"Taller", path:"#", icon: <ConstructionIcon />
    },
    {
        title:"Agenda", path:"#login", icon: <EventNoteIcon />
    },
    {
        title:"Cancelar Alquiler", path:"#cancelarAlquiler", icon: <EventBusyIcon />
    },
    {
        title:"Estadisticas", path:"#estadisticas", icon: <LeaderboardIcon />
    },
    {
        title:"Registrar Pago", path:"#registrarPago", icon: <CurrencyExchangeIcon />
    },
    {
        title:"Home", path:"#home", icon: <HomeIcon />
    },
    {
        title:"Login", path:"#login", icon: <LoginIcon />
    }

]

function NavBar() {

const [open, setOpen] = useState(false)

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                   <IconButton 
                        color="inherit"
                        size="large"
                        onClick={() => setOpen(true)}
                        sx={{display: {xs: "flex", sm:"none"}}}
                        edge="start"
                        >
                        <MenuIcon />
                   </IconButton>
                   <Icon sx={{pr: 4, pb:4.2}}>
                        <DirectionsCarIcon />
                   </Icon>
                   <Typography 
                        variant="h6" 
                        sx={{flexGrow: 1}}
                        >
                        Alquiler de Autos
                    </Typography>
                    <Box sx={{ display:{xs:"none",sm:"block"}  }}>
                        {
                            navLinks.map(item => (
                                <Button 
                                    color="inherit"
                                    variant="body1"
                                    key={item.title}
                                    component= "a"
                                    href={item.path}
                                    >
                                    {/* href={item.path} */}
                                    {item.title}
                                </Button>
                            ))   
                        }
                    </Box>
                    <IconButton 
                        color="inherit"
                        size="large"
                        >
                        <HomeIcon />
                   </IconButton>
                   <IconButton 
                        color="inherit"
                        size="large"
                        >
                        <LoginIcon />
                   </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
                sx={{display: {xs: "flex", sm:"none"}}} //x experiencia de usuario en tablets no se va a ver en simultaneo.
                >
                <NavListDrawer navLinks={navLinks}/>
            </Drawer>
            
        </>
    );
}

export default NavBar;