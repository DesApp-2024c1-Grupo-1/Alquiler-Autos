// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import {Card, CardContent, Typography} from '@mui/material';
// export function AlquileresPage() {

//     const [allAlquileres, setAllAlquileres] = useState([]);

//     const fetchAllAlquileres = useCallback(async () => {
//         try {
//             const response = await axios.get("http://localhost:3000/alquiler");
//             const alquileres = response.data;
//             console.log("Alquileres obtenidos:", alquileres);
//             setAllAlquileres(alquileres);
//         } catch (error) {
//             console.error("Error fetching alquileres:", error);
//         }
//     }, []);

//     useEffect(() => {
//         fetchAllAlquileres();
//     }, [fetchAllAlquileres]);
    
//         // Ordenar los alquileres por fechaRetiro
//     const alquileresOrdenados = allAlquileres.sort((a, b) => new Date(a.fechaRetiro) - new Date(b.fechaRetiro))   

   

//     function compararFechas(fechaRetiro, fechaDevolucion) {
//         const actual = new Date(); // Definir fechaActual aquí
//         const retiro = new Date(fechaRetiro);
//         const devolucion = new Date(fechaDevolucion);
      
//         if (actual < retiro) {
//           return "Esperando a retirar";
//         } else if (actual > retiro && actual < devolucion) {
//           return "Retirado";
//         } else {
//           return "Devuelto";
//         }
//       }

//     return (
//         <>
//             <Typography variant="h4" gutterBottom>
//                 Alquileres
//             </Typography>
//                 {alquileresOrdenados.map((alquiler) => (
//                     <Card 
//                         key={alquiler.id} 
//                         sx={{
//                             mb: 2,
//                             borderRadius: '16px',
//                             backgroundColor: '#B3D0FB', 
//                             boxShadow: 3
//                         }}
//                     >
//                         <CardContent>
//                             <Typography variant="h6">
//                                 ID de Alquiler: {alquiler.id}
//                             </Typography>
//                             <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
//                                 Auto: {alquiler.car.name}{"\n"}
//                                 Cliente: {alquiler.cliente.nombre} , Telefono: {alquiler.cliente.telefono}{"\n"}
//                                 Fecha de Inicio: {alquiler.fechaRetiro}{"\n"}
//                                 Fecha de Fin: {alquiler.fechaDevolucion}{"\n"}
//                                 Monto total: {alquiler.precioFinal}{"\n"}
//                                 Saldo: {alquiler.saldoPendiente}{"\n"}
//                                 Estado: {compararFechas(alquiler.fechaRetiro, alquiler.fechaDevolucion)}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 ))}
//         </>
//     );
// }

// export default AlquileresPage;


import React, { useMemo, useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Skeleton } from '@mui/material';
import { useAlquileres } from '../services/ListaDeAlquileresService';
import { AlquilerList } from '../components/AlquilerList/AlquilerList';

export function AlquileresPage() {
    const allAlquileres = useAlquileres();
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar el loading

    useEffect(() => {
        if (allAlquileres.length > 0) {
            setIsLoading(false); // Desactivar el loading una vez se carguen los datos
        }
    }, [allAlquileres]);

    // Ordenar los alquileres solo una vez usando useMemo
    const alquileresOrdenados = useMemo(() => {
        return allAlquileres.sort((a, b) => new Date(a.fechaRetiro) - new Date(b.fechaRetiro));
    }, [allAlquileres]);

    function compararFechas(fechaRetiro, fechaDevolucion) {
        const actual = new Date();
        const retiro = new Date(fechaRetiro);
        const devolucion = new Date(fechaDevolucion);

        if (actual < retiro) {
            return "Esperando a retirar";
        } else if (actual >= retiro && actual <= devolucion) {
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

            <div>
                {isLoading ? (
                    // Mostrar Skeleton mientras se cargan los datos
                    Array.from({ length: 5 }).map((_, index) => (
                        <Card
                            key={index}
                            sx={{
                                marginBottom: 2,
                                padding: 2,
                                backgroundColor: '#f5f5f5',
                                boxShadow: 1,
                            }}
                        >
                            <CardContent>
                                <Skeleton variant="text" width="40%" sx={{ marginBottom: 1 }} />
                                <Skeleton variant="text" width="70%" sx={{ marginBottom: 1 }} />
                                <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '8px' }} />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    // Mostrar la lista de alquileres cuando los datos estén cargados
                    <AlquilerList alquileres={alquileresOrdenados} />
                )}
            </div>
        </>
    );
}

export default AlquileresPage;

// import React, { useMemo } from 'react';
// import { Box, Card, CardContent, Typography, Button } from '@mui/material';
// import { useAlquileres } from '../services/ListaDeAlquileresService';
// import dayjs from 'dayjs'; // Para formatear fechas

// export function AlquileresPage() {
//     const allAlquileres = useAlquileres();

//     // Ordenar los alquileres solo una vez usando useMemo
//     const alquileresOrdenados = useMemo(() => {
//         return allAlquileres.sort((a, b) => new Date(a.fechaRetiro) - new Date(b.fechaRetiro));
//     }, [allAlquileres]);

//     function compararFechas(fechaRetiro, fechaDevolucion) {
//         const actual = new Date();
//         const retiro = new Date(fechaRetiro);
//         const devolucion = new Date(fechaDevolucion);

//         if (actual < retiro) {
//             return "Esperando a retirar";
//         } else if (actual >= retiro && actual <= devolucion) {
//             return "Retirado";
//         } else {
//             return "Devuelto";
//         }
//     }

//     return (
//         <>
//             <Typography variant="h4" gutterBottom>
//                 Alquileres
//             </Typography>

//             <div>
//                     {alquileresOrdenados.length > 0 ? (
//                         alquileresOrdenados.map((alquiler) => (
//                             <Card
//                                 key={alquiler.id}
//                                 sx={{
//                                     mb: 2,
//                                     borderRadius: '16px',
//                                     backgroundColor: '#B3D0FB',
//                                     boxShadow: 3,
//                                     display: 'flex',
//                                     flexDirection: { xs: 'column', md: 'row' }, // Apila en columna para pantallas pequeñas
//                                     alignItems: 'center',
//                                     justifyContent: 'space-between',
//                                     padding: 2,
//                                     textAlign: { xs: 'center', md: 'left' }, // Centramos el texto en pantallas pequeñas
//                                 }}
//                             >
//                                 {/* Imagen del auto alineada al extremo izquierdo */}
//                                 <Box 
//                                     sx={{ 
//                                         display: 'flex', 
//                                         justifyContent: { xs: 'center', md: 'flex-start' }, // Centrado en pantallas pequeñas, a la izquierda en pantallas grandes
//                                         flexGrow: 0,
//                                         mb: { xs: 2, md: 0 } // Margin bottom en pantallas pequeñas
//                                     }}
//                                 >
//                                     <img 
//                                         src={alquiler.car.image} // Asegúrate de que la imagen esté disponible en los datos
//                                         alt={alquiler.car.name} 
//                                         style={{ 
//                                             width: '100%', 
//                                             maxWidth: '150px', // Ajuste en pantallas grandes
//                                             height: 'auto', 
//                                             borderRadius: '8px' 
//                                         }} 
//                                     />
//                                 </Box>

//                                 {/* Información del alquiler centrada */}
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
//                                     <CardContent>
//                                         <Typography variant="h6">
//                                             ID de Alquiler: {alquiler.id}
//                                         </Typography>
//                                         <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
//                                             Auto: {alquiler.car.name}{"\n"}
//                                             Cliente: {alquiler.cliente.nombre}, Teléfono: {alquiler.cliente.telefono}{"\n"}
//                                             Fecha de Inicio: {dayjs(alquiler.fechaRetiro).format('DD/MM/YYYY')}{"\n"}
//                                             Fecha de Fin: {dayjs(alquiler.fechaDevolucion).format('DD/MM/YYYY')}{"\n"}
//                                             Importe Total: ${alquiler.precioFinal}{"\n"}
//                                             Importe Pendiente: ${alquiler.saldoPendiente}{"\n"}
//                                             Estado: {compararFechas(alquiler.fechaRetiro, alquiler.fechaDevolucion)}
//                                         </Typography>
//                                     </CardContent>
//                                 </Box>

//                                 {/* Botón al extremo derecho */}
//                                 <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, flexGrow: 0 }}>
//                                     <Button variant="contained" color="primary" sx={{ ml: { xs: 0, md: 2 }, mt: { xs: 2, md: 0 } }}>
//                                         Acción
//                                     </Button>
//                                 </Box>
//                             </Card>
//                         ))
//                     ):(
//                         <h3>Cargando estadísticas...</h3>
//                     )}
//             </div>

            
//         </>
//     );
// }

// export default AlquileresPage;