import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  } from '@mui/material';

export function AlquileresPage() {

    const [allAlquileres, setAllAlquileres] = useState([]);

    const fetchAllAlquileres = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3000/alquiler");
            const alquileres = response.data;
            console.log("Alquileres obtenidos:", alquileres);
            setAllAlquileres(alquileres);
        } catch (error) {
            console.error("Error fetching alquileres:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllAlquileres();
    }, [fetchAllAlquileres]);


    return (
        <>
            <h1>Alquileres</h1>
            <nav>
                <List>
                    {
                        allAlquileres.map((alquiler) => (
                            <h1>id de alquiler: {alquiler.id}, fecha de inicio alquiler: {alquiler.fechaRetiro} </h1>
                        ))
                    }
                </List>
            </nav>
        </>
            );
        }

export default AlquileresPage;

