import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, List } from '@mui/material';
import { useAlquileres } from '../services/ListaDeAlquileresService';

export function AlquileresPage() {

    const allAlquileres = useAlquileres(); //Usa la funcion para obtener los alquileres

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

