import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos
import { useAlquileres } from '../services/ListaDeAlquileresService'; 

export function Estadisticas() {
    const allAlquileres = useAlquileres(); //Usa la funcion para obtener los alquileres
    const [datosEstadisticas, setDatosEstadisticas] = useState([]);

    useEffect(() => {
        async function fetchDatos() {
            if (allAlquileres.length > 0) { //Solo procesar si hay datos
                const datos = await procesarDatosEstadisticas(allAlquileres);
                console.log("Datos procesados:", datos);
                setDatosEstadisticas(datos);
            }
        }

        fetchDatos();
    }, [allAlquileres]); //Ejecutar efecto cuando se actualicen los alquileres

    
    const obtenerAutoMasAlquilado = (alquileres) => {
        const autosAlquilados = {};
        alquileres.forEach(alquiler => {
            const carId = alquiler.car?.id;
            if (carId) {
                autosAlquilados[carId] = (autosAlquilados[carId] || 0) + 1;
            }
        });

        let autoMasAlquiladoId = null;
        let maxVecesAlquilado = 0;
        Object.keys(autosAlquilados).forEach((carId) => {
            if (autosAlquilados[carId] > maxVecesAlquilado) {
                maxVecesAlquilado = autosAlquilados[carId];
                autoMasAlquiladoId = carId;
            }
        });

        return autoMasAlquiladoId;
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

        const autoMasAlquiladoTotalId = obtenerAutoMasAlquilado(alquileres);
        const autoMasAlquiladoMesId = obtenerAutoMasAlquilado(alquileresMesActual);
        const autoMasAlquiladoAnioId = obtenerAutoMasAlquilado(alquileresAnioActual);

        // Obtener detalles de los autos más alquilados
        const getAutoDetails = async (carId) => {
            if (!carId) return { name: "No disponible", image: null };
            const response = await axios.get(`http://localhost:3000/car/${carId}`); // Cambia la URL según tu API
            return { name: response.data.name, image: response.data.image };
        };

        const [autoTotal, autoMes, autoAnio] = await Promise.all([
            getAutoDetails(autoMasAlquiladoTotalId),
            getAutoDetails(autoMasAlquiladoMesId),
            getAutoDetails(autoMasAlquiladoAnioId)
        ]);

        const datos = [
            {
                image: autoTotal.image || 'https://via.placeholder.com/400/FF5733/FFFFFF?text=Total+Alquileres',
                title: 'Alquileres Totales',
                description: `Cantidad: ${alquileres.length}, Días: ${alquileres.reduce((total, alquiler) => total + alquiler.cantidadDias, 0)}, Ganancia: ${alquileres.reduce((total, alquiler) => total + alquiler.precioFinal, 0)}`,
            },
            {
                image: autoAnio.image || 'https://via.placeholder.com/400/33FF57/FFFFFF?text=Alquileres+del+Año',
                title: 'Alquileres del Año',
                description: `Cantidad: ${alquileresAnioActual.length}, Días: ${alquileresAnioActual.reduce((total, alquiler) => total + alquiler.cantidadDias, 0)}, Ganancia: ${alquileresAnioActual.reduce((total, alquiler) => total + alquiler.precioFinal, 0)}`,
            },
            {
                image: autoMes.image || 'https://via.placeholder.com/400/3357FF/FFFFFF?text=Alquileres+del+Mes',
                title: 'Alquileres del Mes',
                description: `Cantidad: ${alquileresMesActual.length}, Días: ${alquileresMesActual.reduce((total, alquiler) => total + alquiler.cantidadDias, 0)}, Ganancia: ${alquileresMesActual.reduce((total, alquiler) => total + alquiler.precioFinal, 0)}`,
            },
        ];

        setDatosEstadisticas(datos);
        return datos;
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            {datosEstadisticas.length > 0 ? (
                <Carousel showThumbs={false} showArrows={true} infiniteLoop={true} useKeyboardArrows>
                    {datosEstadisticas.map((data, index) => (
                        <div key={index} style={{ padding: '20px', textAlign: 'center' }}>
                            {data.image ? (
                                <img src={data.image} alt={data.title} style={{ width: '100%', borderRadius: '8px' }} />
                            ) : (
                                <div style={{ height: '200px', backgroundColor: '#ccc', borderRadius: '8px' }}>
                                    <p>No image available</p>
                                </div>
                            )}
                            <h3>{data.title}</h3>
                            <p>{data.description}</p>
                        </div>
                    ))}
                </Carousel>
            ) : (
                <h3>Cargando estadísticas...</h3> 
            )}
        </div>
    );
}

export default Estadisticas;