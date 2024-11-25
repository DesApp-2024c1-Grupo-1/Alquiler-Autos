import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  } from '@mui/material';
import React from 'react';

function NavListDrawer({navArrayLinks, NavLink, setOpen}) {
    return (
        <Box sx={{width:250}}>
            
            <nav>
                <List>
                    {
                        navArrayLinks.map((item) => (
                            <ListItem 
                                disablePadding 
                                key={item.title}
                                > 
                                <ListItemButton 
                                    component={NavLink}
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText>
                                        {item.title}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </nav>
        </Box>
    );
}

export default NavListDrawer;