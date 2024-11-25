import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Drawer, Icon, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoApp from '../../assets/LogoApp.png';
import NavListDrawer from './NavListDrawer';



function NavBar({navArrayLinks}) {

const [open, setOpen] = useState(false)
const navArrayLinks2Elements = navArrayLinks.slice(-1);
const navArrayLinksShort = navArrayLinks.slice(0, -1); //corto los 2 ultimos elementos Home y Login para que no los muestre.

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
                   <Icon sx={{ width: 190, height: 95 }}>
                        <img 
                            src={LogoApp}
                            alt="Car Icon"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                              }}
                        />
                   </Icon>
                   <Typography 
                        variant="h6" 
                        sx={{flexGrow: 1}}
                        >
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
                                            color: 'lightblue'
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
                sx={{display: {xs: "flex", sm:"none"}}}
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