import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  } from '@mui/material';
import React from 'react';
// import ConstructionIcon from '@mui/icons-material/Construction';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import EventBusyIcon from '@mui/icons-material/EventBusy';
// import LeaderboardIcon from '@mui/icons-material/Leaderboard';
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

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