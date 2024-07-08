import React, { useCallback, useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import axios, { all } from "axios";
import { registrarAlquiler } from "../services/AlquilerService"; // Asumiendo que aquí está definida la función registrarAlquiler
import { getCarById} from "../services/CarsService";

export function Estadisticas() {
    const [allAlquileres, setAllAlquileres] = useState([]);
    const [nombreAutoMasAlquilado, setNombreAutoMasAlquilado] = useState("No disponible");

    const fetchAllAlquileres = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3000/alquiler");
            const alquileres = response.data;
            
            setAllAlquileres(alquileres);
            await obtenerAutoMasAlquilado(alquileres); // Asegurarse de que la llamada se espera
        } catch (error) {
            console.error("Error fetching alquileres:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllAlquileres();
    }, [fetchAllAlquileres]);

    const obtenerAutoMasAlquilado = async (alquileres) => {
        
        const autosAlquilados = alquileres.reduce((acc, alquiler) => {
            const carId = alquiler.car?.id; 
            
            if (carId) { // Verificar que carId existe
                if (acc[carId]) {
                    acc[carId]++;
                } else {
                    acc[carId] = 1;
                }
            }
            return acc;
        }, {});

        

        let autoMasAlquiladoId = null;
        let maxVecesAlquilado = 0;
        Object.keys(autosAlquilados).forEach((carId) => {
            if (autosAlquilados[carId] > maxVecesAlquilado) {
                maxVecesAlquilado = autosAlquilados[carId];
                autoMasAlquiladoId = carId;
            }
        });

        

        if (autoMasAlquiladoId) {
            try {
                const autoDetails = await getCarById(autoMasAlquiladoId);
                
                setNombreAutoMasAlquilado(autoDetails.name); 
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        } else {
            console.warn("No se encontró un auto más alquilado");
        }
    };


    const estilo = {
        backgroundColor: "#e4e9f0",
        borderRadius: "5px",
        border: "solid",
        padding: 2,
    };

    const mesActual = new Date().getMonth() + 1; // Mes actual (1-12)
    const anioActual = new Date().getFullYear();

        //filtro de alquileres por mes y por año

        // Filtrar alquileres del mes actual
        const alquileresMesActual = allAlquileres.filter((alquiler) => {
            const fechaAlquiler = new Date(alquiler.fechaRetiro);
            return (
                fechaAlquiler.getMonth() + 1 === mesActual &&
                fechaAlquiler.getFullYear() === anioActual
            );
        });

        // Filtrar alquileres del año actual
        const alquileresAnioActual = allAlquileres.filter((alquiler) => {
            const fechaAlquiler = new Date(alquiler.fechaRetiro);
            return (
                fechaAlquiler.getFullYear() === anioActual
            );
        });


        // dias de alquiler


        // Calcular los días totales de alquiler en el mes actual
        const diasTotalesMesActual = alquileresMesActual.reduce((total, alquiler) => {
            return total + alquiler.cantidadDias;
        }, 0);

        // Calcular los días totales de alquiler en el año
        const diasTotalesAnio = alquileresAnioActual.reduce((total, alquiler) => {
            return total + alquiler.cantidadDias;
        }, 0);

        // Calcular los días totales de alquiler 
        const diasTotales = allAlquileres.reduce((total, alquiler) => {
            return total + alquiler.cantidadDias;
        }, 0);


        //ganancias

        // Calcular el precio total de alquileres en el mes actual
        const gananciaMesActual = alquileresMesActual.reduce((total, alquiler) => {
            return total + alquiler.precioFinal;
        }, 0);

        // Calcular el precio total de alquileres
        const ganancia = allAlquileres.reduce((total, alquiler) => {
            return total + alquiler.precioFinal;
        }, 0);

        // Calcular el precio total de alquileres en el año
        const gananciaAnioActual = alquileresAnioActual.reduce((total, alquiler) => {
            return total + alquiler.precioFinal;
        }, 0);


    return (
        <Container maxWidth="100%">
            <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>      
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Alquileres Totales</h2>
                    <hr style={{ border: "1px solid" }} />
                    <div>
                        <p>Cantidad de Alquileres: {allAlquileres.length}</p>
                        {/* Calcular días totales de alquiler */}
                        <p>Días totales de alquiler: {diasTotales}</p>
                        {/* Calcular ganancia total */}
                        <p>Ganancia total: {ganancia}</p>
                        {/* Mostrar auto más alquilado */}
                        <p>Auto más alquilado: {nombreAutoMasAlquilado}</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Alquileres del año</h2>
                    <hr style={{ border: "1px solid" }} />
                    <div>
                        <p>Cantidad de Alquileres: {alquileresAnioActual.length}</p>
                        {/* Calcular días totales de alquiler */}
                        <p>Días totales de alquiler: {diasTotalesAnio}</p>
                        {/* Calcular ganancia total */}
                        <p>Ganancia total: {gananciaAnioActual}</p>
                        {/* Mostrar auto más alquilado */}
                        <p>Auto más alquilado en el año: autoMasAlquilado2</p>
                    </div>
                </Grid> 
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Alquileres Del Mes</h2>
                    <hr style={{ border: "1px solid" }} />
                    <div>
                        <p>Cantidad de Alquileres: {alquileresMesActual.length}</p>
                        {/* Calcular días totales de alquiler */}
                        <p>Días totales de alquiler: {diasTotalesMesActual} </p>
                        {/* Calcular ganancia total */}
                        <p>Ganancia total: {gananciaMesActual}</p>
                        {/* Mostrar auto más alquilado */}
                        <p>Auto más alquilado en el mes: autoMasAlquilado3</p>
                    </div>
                </Grid>  
            </Grid>
        </Container>
    );
}

export default Estadisticas;





