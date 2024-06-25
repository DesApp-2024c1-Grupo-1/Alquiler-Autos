import React, { useCallback, useEffect, useState } from "react";
import { Container, Grid} from "@mui/material";
import { getAllAlquileres } from "../services/Estadisticas";

export function Estadisticas() {

    const [allAlquileres, setAllAlquileres] = useState([]);

    const fetchAllAlquileres = useCallback(async () => {
    const obtainedAlquileres = await getAllAlquileres();
    setAllAlquileres(obtainedAlquileres);
    }, []);

    useEffect(() => {
    fetchAllAlquileres();
    }, [fetchAllAlquileres]);

    // Filtrar el auto mas caro
    const autoMasCaro = allAlquileres.reduce((prev, current) => {
        return (prev.precio > current.precio) ? prev : current;
    }, {});
    
    // Filtrar el auto mas barato
    const autoMasBarato = allAlquileres.reduce((prev, current) => {
        return (prev.precio < current.precio) ? prev : current;
    }, {});


    // Filtrar el alquiler de mas días
    const alquilerMasLargo = allAlquileres.reduce((prev, current) => {
        return (prev.dias > current.dias) ? prev : current;
    }, {});

    // Filtrar el auto que mas veces alquilaron
    const autoMasAlquilado = allAlquileres.reduce((prev, current) => {
        return (prev.vecesAlquilado > current.vecesAlquilado) ? prev : current;
    }, {});

    // Filtrar el auto que menos veces alquilaron
    const autoMenosAlquilado = allAlquileres.reduce((prev, current) => {
        return (prev.vecesAlquilado < current.vecesAlquilado) ? prev : current;
    }, {});

    // Filtrar el alquiler mas caro
    const alquilerMasCaro = allAlquileres.reduce((prev, current) => {
        return (prev.precio * prev.dias > current.precio * current.dias) ? prev : current;
    }, {});

    const estilo = {backgroundColor: "#e4e9f0", borderRadius: '5px', border: "solid", padding: 2}

    return (
        <Container maxWidth="100%">
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap'}}>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Auto más caro</h2>
                    <hr style={{ border: '1px solid'}} />
                    {autoMasCaro && (
                        <div>
                        <p>ID: {autoMasCaro.id}</p>
                        <p>Auto: {autoMasCaro.car}</p>
                        <p>Precio: ${autoMasCaro.precio}</p>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Auto más barato</h2>
                    <hr style={{ border: '1px solid'}} />
                    {autoMasBarato && (
                        <div>
                        <p>ID: {autoMasBarato.id}</p>
                        <p>Auto: {autoMasBarato.car}</p>
                        <p>Precio: ${autoMasBarato.precio}</p>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Alquiler de más días</h2>
                    <hr style={{ border: '1px solid'}} />
                    {alquilerMasLargo && (
                        <div>
                        <p>ID: {alquilerMasLargo.id}</p>
                        <p>Auto: {alquilerMasLargo.car}</p>
                        <p>Precio: ${alquilerMasLargo.precio}</p>
                        <p>Días: {alquilerMasLargo.dias}</p>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Auto más alquilado</h2>
                    <hr style={{ border: '1px solid'}} />
                    {autoMasAlquilado && (
                        <div>
                        <p>ID: {autoMasAlquilado.id}</p>
                        <p>Auto: {autoMasAlquilado.car}</p>
                        <p>Precio: ${autoMasAlquilado.precio}</p>
                        <p>Veces Alquilado: {autoMasAlquilado.vecesAlquilado}</p>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Auto menos alquilado</h2>
                    <hr style={{ border: '1px solid'}} />
                    {autoMenosAlquilado && (
                        <div>
                        <p>ID: {autoMenosAlquilado.id}</p>
                        <p>Auto: {autoMenosAlquilado.car}</p>
                        <p>Precio: ${autoMenosAlquilado.precio}</p>
                        <p>Veces Alquilado: {autoMenosAlquilado.vecesAlquilado}</p>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Alquiler más caro</h2>
                    <hr style={{ border: '1px solid'}} />
                    {alquilerMasCaro && (
                        <div>
                        <p>ID: {alquilerMasCaro.id}</p>
                        <p>Auto: {alquilerMasCaro.car}</p>
                        <p>Precio: ${alquilerMasCaro.precio}</p>
                        <p>Dias alquilado: {alquilerMasCaro.dias}</p>
                        <p>Total: ${alquilerMasCaro.precio * alquilerMasCaro.dias}</p>
                        </div>
                    )}
                </Grid>
            </Grid>
        
        </Container>
    );
}

export default Estadisticas;





