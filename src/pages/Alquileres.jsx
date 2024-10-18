import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, List } from '@mui/material';
import { useAlquileres } from '../services/ListaDeAlquileresService';

export function AlquileresPage() {

    const allAlquileres = useAlquileres(); //Usa la funcion para obtener los alquileres

        // Ordenar los alquileres por fechaRetiro (de más antigua a más reciente)
    const alquileresOrdenados = allAlquileres.sort((a, b) => new Date(a.fechaRetiro) - new Date(b.fechaRetiro))       

   

    function compararFechas(fechaRetiro, fechaDevolucion) {
        const actual = new Date(); // Definir fechaActual aquí
        const retiro = new Date(fechaRetiro);
        const devolucion = new Date(fechaDevolucion);
      
        if (actual < retiro) {
          return "Esperando a retirar";
        } else if (actual > retiro && actual < devolucion) {
          return "Retirado";
        } else {
          return "Devuelto";
        }
      }

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
                            backgroundColor: '#B3D0FB', 
                            boxShadow: 3
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">
                                ID de Alquiler: {alquiler.id}
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                                Auto: {alquiler.car.name}{"\n"}
                                Cliente: {alquiler.cliente.nombre} , Telefono: {alquiler.cliente.telefono}{"\n"}
                                Fecha de Inicio: {alquiler.fechaRetiro}{"\n"}
                                Fecha de Fin: {alquiler.fechaDevolucion}{"\n"}
                                Monto total: {alquiler.precioFinal}{"\n"}
                                Saldo: {alquiler.saldoPendiente}{"\n"}
                                Estado: {compararFechas(alquiler.fechaRetiro, alquiler.fechaDevolucion)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
        </>
    );
}

export default AlquileresPage;