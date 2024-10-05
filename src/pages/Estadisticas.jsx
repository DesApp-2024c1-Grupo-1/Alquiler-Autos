import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos

export function Estadisticas() {
    const [allAlquileres, setAllAlquileres] = useState([]);
    const [datosEstadisticas, setDatosEstadisticas] = useState([]);

    const fetchAllAlquileres = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3000/alquiler");
            const alquileres = response.data;
            console.log("Alquileres obtenidos:", alquileres);
            setAllAlquileres(alquileres);
            procesarDatosEstadisticas(alquileres);
        } catch (error) {
            console.error("Error fetching alquileres:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllAlquileres();
    }, [fetchAllAlquileres]);

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
                cantidad: `Cantidad: ${alquileres.length}`,
                mas: `Auto más alquilado en total: ${autoTotal.name}`,
                dias: `Días totales de alquiler: ${alquileres.reduce((total, alquiler) => total + alquiler.cantidadDias, 0)}`,
                ganancia: `Ganancia total ($): ${alquileres.reduce((total, alquiler) => total + alquiler.precioFinal, 0)}`,
            },
            {
                image: autoAnio.image || 'https://via.placeholder.com/400/33FF57/FFFFFF?text=Alquileres+del+Año',
                title: 'Alquileres del Año',
                cantidad: `Cantidad de alquileres: ${alquileresAnioActual.length}`,
                mas: `Auto más alquilado en el año: ${autoAnio.name}`,
                dias: `Días totales de alquiler: ${alquileresAnioActual.reduce((total, alquiler) => total + alquiler.cantidadDias, 0)}`,
                ganancia: `Ganancia total ($): ${alquileresAnioActual.reduce((total, alquiler) => total + alquiler.precioFinal, 0)}`,
            },
            {
                image: autoMes.image || 'https://via.placeholder.com/400/3357FF/FFFFFF?text=Alquileres+del+Mes',
                title: 'Alquileres del Mes',
                cantidad: `cantidad de alquileres: ${alquileresMesActual.length}`,
                mas: `Auto más alquilado en el mes: ${autoMes.name}`,
                dias: `Días totales de alquiler: ${alquileresMesActual.reduce((total, alquiler) => total + alquiler.cantidadDias, 0)}`,
                ganancia: `Ganancia total ($): ${alquileresMesActual.reduce((total, alquiler) => total + alquiler.precioFinal, 0)}`
            },
        ];

        setDatosEstadisticas(datos);
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <Carousel showArrows={true} infiniteLoop={true} useKeyboardArrows>
                {datosEstadisticas.map((data, index) => (
                    <div key={index} style={{ padding: '20px', textAlign: 'center' }}>
                        <img src={data.image} alt={data.title} style={{ width: '100%', borderRadius: '8px' }} />
                        <h1>{data.title}</h1>
                        <p>{data.cantidad}</p>
                        <p>{data.dias}</p>
                        <p>{data.ganancia}</p>
                        <p>{data.mas}</p>
                        <p>{data.description}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default Estadisticas;