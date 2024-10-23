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

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useAlquileres } from '../services/ListaDeAlquileresService'; 

const Estadisticas = () => {
  const allAlquileres = useAlquileres(); // Obtener los alquileres
  const [estadisticas, setEstadisticas] = useState({
    total: [],
    anio: [],
    mes: []
  });

  useEffect(() => {
    async function fetchDatos() {
      if (allAlquileres.length > 0) {
        const datos = await procesarDatosEstadisticas(allAlquileres);
        setEstadisticas(datos);
      }
    }

    fetchDatos();
  }, [allAlquileres]);

  const obtenerTopTresAutos = (alquileres) => {
    const autosAlquilados = {};
    alquileres.forEach(alquiler => {
      const carId = alquiler.car?.id;
      if (carId) {
        autosAlquilados[carId] = (autosAlquilados[carId] || 0) + 1;
      }
    });

    const autosOrdenados = Object.entries(autosAlquilados).sort((a, b) => b[1] - a[1]);
    const topTres = autosOrdenados.slice(0, 3).map(([carId]) => carId);
    
    return topTres;
  };

  const procesarDatosEstadisticas = async (alquileres) => {
    const mesActual = new Date().getMonth() + 1;
    const anioActual = new Date().getFullYear();

    const alquileresMesActual = alquileres.filter(alquiler => {
      const fechaAlquiler = new Date(alquiler.fechaRetiro);
      return (fechaAlquiler.getMonth() + 1 === mesActual && fechaAlquiler.getFullYear() === anioActual);
    });

    const alquileresAnioActual = alquileres.filter(alquiler => {
      const fechaAlquiler = new Date(alquiler.fechaRetiro);
      return (fechaAlquiler.getFullYear() === anioActual);
    });

    const topTresAutosTotalIds = obtenerTopTresAutos(alquileres);
    const topTresAutosMesIds = obtenerTopTresAutos(alquileresMesActual);
    const topTresAutosAnioIds = obtenerTopTresAutos(alquileresAnioActual);

    const getAutoDetails = async (carId) => {
      if (!carId) return { name: "No disponible", image: null };
      const response = await axios.get(`http://localhost:3000/car/${carId}`);
      return { name: response.data.name, image: response.data.image };
    };

    const [autoTotal1, autoTotal2, autoTotal3, autoAnio1, autoAnio2, autoAnio3, autoMes1, autoMes2, autoMes3] = await Promise.all([
      getAutoDetails(topTresAutosTotalIds[0]),
      getAutoDetails(topTresAutosTotalIds[1]),
      getAutoDetails(topTresAutosTotalIds[2]),
      getAutoDetails(topTresAutosAnioIds[0]),
      getAutoDetails(topTresAutosAnioIds[1]),
      getAutoDetails(topTresAutosAnioIds[2]),
      getAutoDetails(topTresAutosMesIds[0]),
      getAutoDetails(topTresAutosMesIds[1]),
      getAutoDetails(topTresAutosMesIds[2])
    ]);

    return {
      total: [autoTotal1, autoTotal2, autoTotal3],
      anio: [autoAnio1, autoAnio2, autoAnio3],
      mes: [autoMes1, autoMes2, autoMes3]
    };
  };

  const renderPodio = (titulo, autos) => (
    <>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        {titulo}
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-end" sx={{ marginBottom: 6 }}>
        {autos.map((auto, index) => (
          <Grid item xs={12} sm={4} key={index} order={{ xs: index + 1, sm: index === 0 ? 2 : index === 1 ? 1 : 3 }}>
            <Card
              sx={{
                height: 'auto',
                backgroundColor: index === 0 ? '#f2b925' : index === 1 ? '#8b8b8b' : '#CD7F32',
                textAlign: 'center',
                boxShadow: index === 0 ? 5 : 3,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <CardContent>
                <img
                  src={auto.image || 'https://via.placeholder.com/150'}
                  alt={auto.name}
                  style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '100%' }}
                />
                <Typography variant={index === 0 ? 'h4' : 'h5'}>{index + 1}º Puesto</Typography>
                <Typography variant="body2">{auto.name}</Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Información relevante y estadísticas.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {renderPodio("Alquileres Totales", estadisticas.total)}
      {renderPodio("Alquileres del Año", estadisticas.anio)}
      {renderPodio("Alquileres del Mes", estadisticas.mes)}
    </Box>
  );
};

export default Estadisticas;