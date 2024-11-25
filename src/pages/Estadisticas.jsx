import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Fab, Tooltip, Skeleton } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import axios from 'axios';
import { useAlquileres } from '../services/ListaDeAlquileresService'; 
import faviconEstadisticas from '../assets/faviconEstadisticas.png';

const Estadisticas = () => {
  const allAlquileres = useAlquileres();
  const [estadisticas, setEstadisticas] = useState({
    total: [],
    anio: [],
    mes: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
      const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = faviconEstadisticas;
      document.head.appendChild(favicon);

      return () => {
          favicon.href = '/favicon.ico';
      };
  }, []);

  useEffect(() => {
    async function fetchDatos() {
      if (allAlquileres.length > 0) {
        setIsLoading(true);
        const datos = await procesarDatosEstadisticas(allAlquileres);
        setEstadisticas(datos);
        setIsLoading(false);
      }
    }

    fetchDatos();
  }, [allAlquileres]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const obtenerTopTresAutos = (alquileres) => {
    const autosAlquilados = {};
    alquileres.forEach(alquiler => {
      const carId = alquiler.car?.id;
      if (carId) {
        if (!autosAlquilados[carId]) {
          autosAlquilados[carId] = {
            cantidad: 0,
            dias: 0,
            ganancia: 0
          };
        }
        autosAlquilados[carId].cantidad += 1;
        autosAlquilados[carId].dias += alquiler.cantidadDias;
        autosAlquilados[carId].ganancia += alquiler.precioFinal;
      }
    });

 const autosOrdenados = Object.entries(autosAlquilados).sort(
  (a, b) => b[1].ganancia - a[1].ganancia
);

const topTres = autosOrdenados.slice(0, 3).map(([carId, datos]) => ({
  carId,
  ...datos,
}));

return topTres;
};

  const procesarDatosEstadisticas = async (alquileres) => {
    const apiUrl = import.meta.env.VITE_API_URL;

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

    const topTresAutosTotal = obtenerTopTresAutos(alquileres);
    const topTresAutosMes = obtenerTopTresAutos(alquileresMesActual);
    const topTresAutosAnio = obtenerTopTresAutos(alquileresAnioActual);

    const getAutoDetails = async (carId) => {
      if (!carId) return { name: "No disponible", brand: "No disponible", image: null };

      const response = await axios.get( apiUrl + `/withdeleted/car/${carId}`);

      return { name: response.data.name, brand: response.data.brand, image: response.data.image };
    };

    const [autoTotal1, autoTotal2, autoTotal3, autoAnio1, autoAnio2, autoAnio3, autoMes1, autoMes2, autoMes3] = await Promise.all([
      getAutoDetails(topTresAutosTotal[0]?.carId),
      getAutoDetails(topTresAutosTotal[1]?.carId),
      getAutoDetails(topTresAutosTotal[2]?.carId),
      getAutoDetails(topTresAutosAnio[0]?.carId),
      getAutoDetails(topTresAutosAnio[1]?.carId),
      getAutoDetails(topTresAutosAnio[2]?.carId),
      getAutoDetails(topTresAutosMes[0]?.carId),
      getAutoDetails(topTresAutosMes[1]?.carId),
      getAutoDetails(topTresAutosMes[2]?.carId)
    ]);

    return {
      total: [
        { ...autoTotal1, ...topTresAutosTotal[0] },
        { ...autoTotal2, ...topTresAutosTotal[1] },
        { ...autoTotal3, ...topTresAutosTotal[2] },
      ],
      anio: [
        { ...autoAnio1, ...topTresAutosAnio[0] },
        { ...autoAnio2, ...topTresAutosAnio[1] },
        { ...autoAnio3, ...topTresAutosAnio[2] },
      ],
      mes: [
        { ...autoMes1, ...topTresAutosMes[0] },
        { ...autoMes2, ...topTresAutosMes[1] },
        { ...autoMes3, ...topTresAutosMes[2] },
      ]
    };
  };

  const renderPodio = (titulo, autos) => (
    <>
      <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ marginBottom: 8 }}>
        {titulo}
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-end" sx={{ marginBottom: 6 }}>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    height: 'auto',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  <CardContent>
                    <Skeleton variant="rectangular" height={150} sx={{ borderRadius: '8px', marginBottom: 2 }} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="70%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : autos.map((auto, index) => (
            <Grid
            item
            xs={12}
            sm={4}
            key={index}
            order={{ xs: index + 1, sm: index === 0 ? 2 : index === 1 ? 1 : 3 }}
          >
            <Card
              sx={{
                height: 'auto',
                backgroundColor: index === 0 ? '#f2b925' : index === 1 ? '#8b8b8b' : '#CD7F32',
                textAlign: 'center',
                boxShadow: index === 0 ? 5 : 3,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <CardContent>
                <img
                  src={auto.image || 'https://via.placeholder.com/150'}
                  alt={auto.name}
                  style={{
                    borderRadius: '8px',
                    marginBottom: '10px',
                    maxWidth: index === 0 ? '100%' : index === 1 ? '80%' : '60%',
                    height: index === 0 ? 'auto' : index === 1 ? 'auto' : 'auto',
                    objectFit: 'contain',
                  }}
                />
                <Typography variant={index === 0 ? 'h4' : 'h5'}>{index + 1}º Puesto </Typography>
                <Typography variant="h4">{auto.brand} {auto.name}</Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Cantidad de alquileres: {auto.cantidad}
                </Typography>
                <Typography variant="body1">
                  Días totales de alquiler: {auto.dias}
                </Typography>
                <Typography variant="body1">
                  Ganancia total ($): {auto.ganancia}
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

      {showScrollButton && (
        <Tooltip 
          title={<span style={{ fontSize: '1.2rem' }}>Volver arriba</span>}
          placement="left" 
          arrow
        >
          <Fab
            color="primary"
            onClick={scrollToTop}
            sx={{
              width: 80,
              height: 80,
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <KeyboardArrowUp sx={{ fontSize: '2rem' }} />
          </Fab>
        </Tooltip>
      )}

    </Box>
  );
};

export default Estadisticas;