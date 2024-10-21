// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos
// import { useAlquileres } from '../services/ListaDeAlquileresService'; 

// export function Estadisticas() {
//     const allAlquileres = useAlquileres(); //Usa la funcion para obtener los alquileres
//     const [datosEstadisticas, setDatosEstadisticas] = useState([]);

//     useEffect(() => {
//         async function fetchDatos() {
//             if (allAlquileres.length > 0) { //Solo procesar si hay datos
//                 const datos = await procesarDatosEstadisticas(allAlquileres);
//                 console.log("Datos procesados:", datos);
//                 setDatosEstadisticas(datos);
//             }
//         }

//         fetchDatos();
//     }, [allAlquileres]); //Ejecutar efecto cuando se actualicen los alquileres

    
//     const obtenerAutoMasAlquilado = (alquileres) => {
//         const autosAlquilados = {};
//         alquileres.forEach(alquiler => {
//             const carId = alquiler.car?.id;
//             if (carId) {
//                 autosAlquilados[carId] = (autosAlquilados[carId] || 0) + 1;
//             }
//         });

//         let autoMasAlquiladoId = null;
//         let maxVecesAlquilado = 0;
//         Object.keys(autosAlquilados).forEach((carId) => {
//             if (autosAlquilados[carId] > maxVecesAlquilado) {
//                 maxVecesAlquilado = autosAlquilados[carId];
//                 autoMasAlquiladoId = carId;
//             }
//         });

//         return autoMasAlquiladoId;
//     };

//     const procesarDatosEstadisticas = async (alquileres) => {
//         const mesActual = new Date().getMonth() + 1;
//         const anioActual = new Date().getFullYear();

//         const alquileresMesActual = alquileres.filter(alquiler => {
//             const fechaAlquiler = new Date(alquiler.fechaRetiro);
//             return (fechaAlquiler.getMonth() + 1 === mesActual && fechaAlquiler.getFullYear() === anioActual);
//         });

//         const alquileresAnioActual = alquileres.filter(alquiler => {
//             const fechaAlquiler = new Date(alquiler.fechaRetiro);
//             return (fechaAlquiler.getFullYear() === anioActual);
//         });

//         const autoMasAlquiladoTotalId = obtenerAutoMasAlquilado(alquileres);
//         const autoMasAlquiladoMesId = obtenerAutoMasAlquilado(alquileresMesActual);
//         const autoMasAlquiladoAnioId = obtenerAutoMasAlquilado(alquileresAnioActual);

//         // Obtener detalles de los autos más alquilados
//         const getAutoDetails = async (carId) => {
//             if (!carId) return { name: "No disponible", image: null };
//             const response = await axios.get(`http://localhost:3000/car/${carId}`); // Cambia la URL según tu API
//             return { name: response.data.name, image: response.data.image };
//         };

//         const [autoTotal, autoMes, autoAnio] = await Promise.all([
//             getAutoDetails(autoMasAlquiladoTotalId),
//             getAutoDetails(autoMasAlquiladoMesId),
//             getAutoDetails(autoMasAlquiladoAnioId)
//         ]);



//         const datos = [
//             {
//                 image: autoTotal.image || 'https://via.placeholder.com/400/FF5733/FFFFFF?text=Total+Alquileres',
//                 title: 'Alquileres Totales',
//                 cantidad: `Cantidad de alquileres: ${alquileres.length}`,
//                 mas: `${autoTotal.name}`,
//                 dias: `Días totales de alquiler: ${alquileres.reduce((total, alquiler) => total + alquiler.cantidadDias, 0)}`,
//                 ganancia: `Ganancia total ($): ${alquileres.reduce((total, alquiler) => total + alquiler.precioFinal, 0)}`,
//             },
//             {
//                 image: autoAnio.image || 'https://via.placeholder.com/400/33FF57/FFFFFF?text=Alquileres+del+Año',
//                 title: 'Alquileres del Año',
//                 cantidad: `Cantidad de alquileres: ${alquileresAnioActual.length}`,
//                 mas: `${autoAnio.name}`,
//                 dias: `Días totales de alquiler: ${alquileresAnioActual.reduce((total, alquiler) => total + alquiler.cantidadDias, 0)}`,
//                 ganancia: `Ganancia total ($): ${alquileresAnioActual.reduce((total, alquiler) => total + alquiler.precioFinal, 0)}`,
//             },
//             {
//                 image: autoMes.image || 'https://via.placeholder.com/400/3357FF/FFFFFF?text=Alquileres+del+Mes',
//                 title: 'Alquileres del Mes',
//                 cantidad: `cantidad de alquileres: ${alquileresMesActual.length}`,
//                 mas: `${autoMes.name}`,
//                 dias: `Días totales de alquiler: ${alquileresMesActual.reduce((total, alquiler) => total + alquiler.cantidadDias, 0)}`,
//                 ganancia: `Ganancia total ($): ${alquileresMesActual.reduce((total, alquiler) => total + alquiler.precioFinal, 0)}`
//             },
//         ];

//         setDatosEstadisticas(datos);
//         return datos;
//     };

//     return (
//         <div style={{ maxWidth: '600px', margin: 'auto' }}>
//             {datosEstadisticas.length > 0 ? (
//                 <Carousel showThumbs={false} showArrows={true} infiniteLoop={true} useKeyboardArrows>
//                     {datosEstadisticas.map((data, index) => (
//                         <div key={index} style={{ padding: '20px', textAlign: 'center' }}>
//                             {data.image ? (
//                                 <img src={data.image} alt={data.title} style={{ width: '100%', borderRadius: '8px' }} />
//                             ) : (
//                                 <div style={{ height: '200px', backgroundColor: '#ccc', borderRadius: '8px' }}>
//                                     <p>No image available</p>
//                                 </div>
//                             )}
//                             <h1>{data.mas}</h1>
//                             <h2>{data.title}</h2>
//                             <p>{data.cantidad}</p>
//                             <p>{data.dias}</p>
//                             <p>{data.ganancia}</p>
                            
//                         </div>
//                     ))}
//                 </Carousel>
//             ) : (
//                 <h3>Cargando estadísticas...</h3> 
//             )}
//         </div>
//     );
// }

// export default Estadisticas;
import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const Estadisticas = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* Título de Alquileres Totales */}
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        Alquileres Totales
      </Typography>

      {/* Grid del podio con las 3 tarjetas para Alquileres Totales */}
      <Grid container spacing={2} justifyContent="center" alignItems="flex-end" sx={{ marginBottom: 4 }}>
        {/* 1er Puesto */}
        <Grid item xs={12} sm={4} order={{ xs: 1, sm: 2 }}>
          <Card 
            sx={{ 
              height: 'auto', // Cambiar a auto para que se ajuste
              backgroundColor: '#FFD700', // Oro para el primer lugar
              textAlign: 'center', 
              boxShadow: 5 
            }}
          >
            <CardContent>
              <img src="https://via.placeholder.com/150" alt="Participante A" style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }} />
              <Typography variant="h4">1º Puesto</Typography>
              <Typography variant="body2">Participante A</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Descripción breve sobre el participante A. Información relevante y estadísticas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 2do Puesto */}
        <Grid item xs={12} sm={4} order={{ xs: 2, sm: 1 }}>
          <Card 
            sx={{ 
              height: 'auto', // Cambiar a auto para que se ajuste
              backgroundColor: '#B3D0FB', 
              textAlign: 'center', 
              boxShadow: 3 
            }}
          >
            <CardContent>
              <img src="https://via.placeholder.com/150" alt="Participante B" style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }} />
              <Typography variant="h5">2º Puesto</Typography>
              <Typography variant="body2">Participante B</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Descripción breve sobre el participante B. Información relevante y estadísticas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 3er Puesto */}
        <Grid item xs={12} sm={4} order={{ xs: 3, sm: 3 }}>
          <Card 
            sx={{ 
              height: 'auto', // Cambiar a auto para que se ajuste
              backgroundColor: '#CD7F32', // Bronce para el tercer lugar
              textAlign: 'center', 
              boxShadow: 3 
            }}
          >
            <CardContent>
              <img src="https://via.placeholder.com/150" alt="Participante C" style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }} />
              <Typography variant="h5">3º Puesto</Typography>
              <Typography variant="body2">Participante C</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Descripción breve sobre el participante C. Información relevante y estadísticas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Título de Alquileres del Año */}
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        Alquileres del Año
      </Typography>

      {/* Grid del podio con las 3 tarjetas para Alquileres del Año */}
      <Grid container spacing={2} justifyContent="center" alignItems="flex-end" sx={{ marginBottom: 4 }}>
        {/* 1er Puesto */}
        <Grid item xs={12} sm={4} order={{ xs: 1, sm: 2 }}>
          <Card 
            sx={{ 
              height: 'auto', 
              backgroundColor: '#FFD700', // Oro para el primer lugar
              textAlign: 'center', 
              boxShadow: 5 
            }}
          >
            <CardContent>
              <img src="https://via.placeholder.com/150" alt="Participante D" style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }} />
              <Typography variant="h4">1º Puesto</Typography>
              <Typography variant="body2">Participante D</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Descripción breve sobre el participante D. Información relevante y estadísticas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 2do Puesto */}
        <Grid item xs={12} sm={4} order={{ xs: 2, sm: 1 }}>
          <Card 
            sx={{ 
              height: 'auto', 
              backgroundColor: '#B3D0FB', 
              textAlign: 'center', 
              boxShadow: 3 
            }}
          >
            <CardContent>
              <img src="https://via.placeholder.com/150" alt="Participante E" style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }} />
              <Typography variant="h5">2º Puesto</Typography>
              <Typography variant="body2">Participante E</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Descripción breve sobre el participante E. Información relevante y estadísticas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 3er Puesto */}
        <Grid item xs={12} sm={4} order={{ xs: 3, sm: 3 }}>
          <Card 
            sx={{ 
              height: 'auto', 
              backgroundColor: '#CD7F32', // Bronce para el tercer lugar
              textAlign: 'center', 
              boxShadow: 3 
            }}
          >
            <CardContent>
              <img src="https://via.placeholder.com/150" alt="Participante F" style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }} />
              <Typography variant="h5">3º Puesto</Typography>
              <Typography variant="body2">Participante F</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Descripción breve sobre el participante F. Información relevante y estadísticas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Título de Alquileres del Mes */}
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        Alquileres del Mes
      </Typography>

      {/* Grid del podio con las 3 tarjetas para Alquileres del Mes */}
      <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
        {/* 1er Puesto */}
        <Grid item xs={12} sm={4} order={{ xs: 1, sm: 2 }}>
          <Card 
            sx={{ 
              height: 'auto', 
              backgroundColor: '#FFD700', // Oro para el primer lugar
              textAlign: 'center', 
              boxShadow: 5 
            }}
          >
            <CardContent>
              <img src="https://via.placeholder.com/150" alt="Participante G" style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }} />
              <Typography variant="h4">1º Puesto</Typography>
              <Typography variant="body2">Participante G</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Descripción breve sobre el participante G. Información relevante y estadísticas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 2do Puesto */}
        <Grid item xs={12} sm={4} order={{ xs: 2, sm: 1 }}>
          <Card 
            sx={{ 
              height: 'auto', 
              backgroundColor: '#B3D0FB', 
              textAlign: 'center', 
              boxShadow: 3 
            }}
          >
            <CardContent>
              <img src="https://via.placeholder.com/150" alt="Participante H" style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }} />
              <Typography variant="h5">2º Puesto</Typography>
              <Typography variant="body2">Participante H</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Descripción breve sobre el participante H. Información relevante y estadísticas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 3er Puesto */}
        <Grid item xs={12} sm={4} order={{ xs: 3, sm: 3 }}>
          <Card 
            sx={{ 
              height: 'auto', 
              backgroundColor: '#CD7F32', // Bronce para el tercer lugar
              textAlign: 'center', 
              boxShadow: 3 
            }}
          >
            <CardContent>
              <img src="https://via.placeholder.com/150" alt="Participante I" style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }} />
              <Typography variant="h5">3º Puesto</Typography>
              <Typography variant="body2">Participante I</Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Descripción breve sobre el participante I. Información relevante y estadísticas.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Estadisticas;