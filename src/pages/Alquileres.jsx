import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {Card, CardContent, Typography} from '@mui/material';
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
    
        // Ordenar los alquileres por fechaRetiro
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
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
        </>
    );
}

export default AlquileresPage;

/*
auto 
cliente

estado
retirado a retirar o devuelto

*/
