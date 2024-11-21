import React, { useState } from 'react';
import NavListDrawer from './NavListDrawer';
import { AppBar, Button, Drawer, IconButton, Toolbar, Typography, Box, Icon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {NavLink} from 'react-router-dom'
import LogoApp from '../../assets/LogoApp.png';



function NavBar({navArrayLinks}) {

const [open, setOpen] = useState(false)
const navArrayLinks2Elements = navArrayLinks.slice(-2);
const navArrayLinksShort = navArrayLinks.slice(0, -2); //corto los 2 ultimos elementos Home y Login para que no los muestre.

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
                   {/* <Icon sx={{ pr: 4, pb: 4.2 }}> */}
                   <Icon sx={{ width: 190, height: 95 }}>
                        {/* <DirectionsCarIcon /> */}
                        <img 
                            //src=""  //URL de la imagen
                            src={LogoApp}
                            alt="Car Icon"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain', // Asegura que la imagen se vea completa
                              }}
                        />
                   </Icon>
                   <Typography 
                        variant="h6" 
                        sx={{flexGrow: 1}}
                        >
                        {/* Alquiler de Autos */}
                    </Typography>
                    <Box sx={{ display:{xs:"none",sm:"block"}  }}>
                        {
                            navArrayLinksShort.map(item => (
                                <Button 
                                    color="inherit"
                                    variant="body1"
                                    key={item.title}
                                    component= {NavLink}
                                    to={item.path}
                                    sx={{color: 'white',
                                        '&:hover': {
                                            color: 'lightblue' // Color del texto al hacer hover
                                            }
                                    }}
                                    >
                                    {item.title}
                                </Button>
                            ))   
                        }
                    </Box>
                        {
                            navArrayLinks2Elements.map(item =>(
                                <IconButton
                                    color="inherit"
                                    variant="body1"
                                    key={item.title}
                                    component= {NavLink}
                                    to={item.path}
                                    >
                                    {item.icon}
                                </IconButton>
                                
                            ))
                        }
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
                sx={{display: {xs: "flex", sm:"none"}}} //x experiencia de usuario en tablets no se va a ver en simultaneo.
                >
                <NavListDrawer 
                    navArrayLinks={navArrayLinks} 
                    NavLink={NavLink}
                    setOpen={setOpen}
                    />
                    
            </Drawer>
            
        </>
    );
}

export default NavBar;