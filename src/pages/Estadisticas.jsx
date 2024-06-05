import React, { useCallback, useEffect, useState } from "react";
import { Container, Grid} from "@mui/material";
import { getAllVentas } from "../services/Estadisticas";

export function Estadisticas() {

    const [allVentas, setAllVentas] = useState([]);

    const fetchAllVentas = useCallback(async () => {
    const obtainedVentas = await getAllVentas();
    setAllVentas(obtainedVentas);
    }, []);

    useEffect(() => {
    fetchAllVentas();
    }, [fetchAllVentas]);

    // Filtrar el alquiler mas caro
    const ventaMasCara = allVentas.reduce((prev, current) => {
        return (prev.precio > current.precio) ? prev : current;
    }, {});

    // Filtrar el alquiler de mas días
    const alquilerMasLargo = allVentas.reduce((prev, current) => {
        return (prev.dias > current.dias) ? prev : current;
    }, {});

    // Filtrar el auto que mas veces alquilaron
    const autoMasAlquilado = allVentas.reduce((prev, current) => {
        return (prev.vecesAlquilado > current.vecesAlquilado) ? prev : current;
    }, {});

    // Filtrar el auto que menos veces alquilaron
    const autoMenosAlquilado = allVentas.reduce((prev, current) => {
        return (prev.vecesAlquilado < current.vecesAlquilado) ? prev : current;
    }, {});

    // Filtrar el auto que menos veces alquilaron
    const alquilerMasCaro = allVentas.reduce((prev, current) => {
        return (prev.precio * prev.dias > current.precio * current.dias) ? prev : current;
    }, {});

    return (
        <Container maxWidth="100%">
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Auto más caro</h2>
                    {ventaMasCara && (
                        <div>
                        <p>ID: {ventaMasCara.id}</p>
                        <p>Auto: {ventaMasCara.auto}</p>
                        <p>Precio: ${ventaMasCara.precio}</p>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Alquiler de más días</h2>
                    {alquilerMasLargo && (
                        <div>
                        <p>ID: {alquilerMasLargo.id}</p>
                        <p>Auto: {alquilerMasLargo.auto}</p>
                        <p>Días: {alquilerMasLargo.dias}</p>
                        <p>Precio: ${alquilerMasLargo.precio}</p>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Auto más alquilado</h2>
                    {autoMasAlquilado && (
                        <div>
                        <p>ID: {autoMasAlquilado.id}</p>
                        <p>Auto: {autoMasAlquilado.auto}</p>
                        <p>Veces Alquilado: {autoMasAlquilado.vecesAlquilado}</p>
                        <p>Precio: ${autoMasAlquilado.precio}</p>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Auto menos alquilado</h2>
                    {autoMenosAlquilado && (
                        <div>
                        <p>ID: {autoMenosAlquilado.id}</p>
                        <p>Auto: {autoMenosAlquilado.auto}</p>
                        <p>Veces Alquilado: {autoMenosAlquilado.vecesAlquilado}</p>
                        <p>Precio: ${autoMenosAlquilado.precio}</p>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <h2>Alquiler más caro</h2>
                    {alquilerMasCaro && (
                        <div>
                        <p>ID: {alquilerMasCaro.id}</p>
                        <p>Auto: {alquilerMasCaro.auto}</p>
                        <p>Dias alquilado: {alquilerMasCaro.dias}</p>
                        <p>Precio: ${alquilerMasCaro.precio}</p>
                        <p>Total: ${alquilerMasCaro.precio * alquilerMasCaro.dias}</p>
                        </div>
                    )}
                </Grid>
            </Grid>
        
        </Container>
    );
}

export default Estadisticas;





