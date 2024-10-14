import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, List } from '@mui/material';
export function AlquileresPage() {

    const [allAlquileres, setAllAlquileres] = useState([]);

    const fetchAllAlquileres = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3000/alquiler");
            const alquileres = response.data;
            console.log("Alquileres obtenidos:", alquileres);
             // Ordenar los alquileres por fechaRetiro (de más antigua a más reciente)
            alquileres = alquileres.sort((a, b) => new Date(a.fechaRetiro) - new Date(b.fechaRetiro));
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
            <Typography variant="h4" gutterBottom>
                Alquileres
            </Typography>
                {allAlquileres.map((alquiler) => (
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

