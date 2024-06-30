import React, { useCallback, useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import { registrarAlquiler } from "../services/AlquilerService"; // Asumiendo que aquí está definida la función registrarAlquiler

export function Estadisticas() {
    const [allAlquileres, setAllAlquileres] = useState([]);

    const fetchAllAlquileres = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3000/alquiler");
            setAllAlquileres(response.data);
        } catch (error) {
            console.error("Error fetching alquileres:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllAlquileres();
    }, [fetchAllAlquileres]);

    const estilo = {
        backgroundColor: "#e4e9f0",
        borderRadius: "5px",
        border: "solid",
        padding: 2,
    };

    const mesActual = new Date().getMonth() + 1; // Mes actual (1-12)
    const anioActual = new Date().getFullYear();

        // Filtrar alquileres del mes actual
        const alquileresMesActual = allAlquileres.filter((alquiler) => {
            const fechaAlquiler = new Date(alquiler.fechaRetiro);
            return (
                fechaAlquiler.getMonth() + 1 === mesActual &&
                fechaAlquiler.getFullYear() === anioActual
            );
        });



    // Función para obtener el auto más alquilado en el mes actual
    const obtenerAutoMasAlquiladoEnMes = () => {

        // Contar la cantidad de veces que se alquiló cada auto en el mes actual
        const autosAlquilados = alquileresMesActual.reduce((acc, alquiler) => {
            const carId = alquiler.carId;
            if (acc[carId]) {
                acc[carId]++;
            } else {
                acc[carId] = 1;
            }
            return acc;
        }, {});

        // Encontrar el auto más alquilado
        let autoMasAlquilado = null;
        let maxVecesAlquilado = 0;
        Object.keys(autosAlquilados).forEach((carId) => {
            if (autosAlquilados[carId] > maxVecesAlquilado) {
                maxVecesAlquilado = autosAlquilados[carId];
                autoMasAlquilado = carId; // Suponiendo que carId es el identificador único del auto
            }
        });

        return autoMasAlquilado;
    };

    // Calcular el auto más alquilado en el mes actual
    const autoMasAlquiladoEnMes = obtenerAutoMasAlquiladoEnMes();

    return (
        <Container maxWidth="100%">
            <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Alquileres Del Mes</h2>
                    <hr style={{ border: "1px solid" }} />
                    <div>
                        <p>Cantidad de Alquileres: {alquileresMesActual.length}</p>
                        {/* Calcular días totales de alquiler */}
                        <p>Días totales de alquiler: Pendiente implementación</p>
                        {/* Calcular ganancia total */}
                        <p>Ganancia total: Pendiente implementación</p>
                        {/* Mostrar auto más alquilado */}
                        <p>Auto más alquilado en el mes: {autoMasAlquiladoEnMes}</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Alquileres del año</h2>
                    <hr style={{ border: "1px solid" }} />
                    <div>
                        <p>Cantidad de Alquileres: {allAlquileres.length}</p>
                        {/* Calcular días totales de alquiler */}
                        <p>Días totales de alquiler: Pendiente implementación</p>
                        {/* Calcular ganancia total */}
                        <p>Ganancia total: Pendiente implementación</p>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Estadisticas;





