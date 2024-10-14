import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, List } from '@mui/material';
import { getAllAlquileres } from './Estadisticas'; //Importamos la función desde 'Estadisticas.js'.

export function AlquileresPage() {

    const [allAlquileres, setAllAlquileres] = useState([]);

    //Llama a la función importada en lugar de definirla aca.
    const fetchAllAlquileres = useCallback(async () => {
        try {
            const alquileres = await getAllAlquileres(); //Llama a la función importada.
            console.log("Alquileres obtenidos:", alquileres);
            setAllAlquileres(alquileres);
        } catch (error) {
            console.error("Error fetching alquileres:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllAlquileres();
    }, [fetchAllAlquileres]);
    
        // Ordenar los alquileres por fechaRetiro (de más antigua a más reciente)
    const alquileresOrdenados = allAlquileres.sort((a, b) => new Date(a.fechaRetiro) - new Date(b.fechaRetiro))       

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Alquileres
            </Typography>
                {alquileresOrdenados.map((alquiler) => (
                    <Card 
                        key={alquiler.id} 
                        sx={{
                            mb: 2,
                            borderRadius: '16px',
                            backgroundColor: '#B3D0FB', // Fondo celeste claro
                            boxShadow: 3
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">
                                ID de Alquiler: {alquiler.id}
                            </Typography>
                            <Typography variant="body1">
                                Fecha de Inicio: {alquiler.fechaRetiro}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
        </>
    );
}

export default AlquileresPage;

