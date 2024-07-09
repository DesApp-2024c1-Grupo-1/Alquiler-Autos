import React, { useCallback, useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import axios, { all } from "axios";
import { registrarAlquiler } from "../services/AlquilerService"; // Asumiendo que aquí está definida la función registrarAlquiler
import { getCarById} from "../services/CarsService";

export function Estadisticas() {
    const [allAlquileres, setAllAlquileres] = useState([]);
    const [nombreAutoMasAlquilado, setNombreAutoMasAlquilado] = useState("No disponible");
    const [imagenAutoMasAlquilado, setImagenAutoMasAlquilado] = useState(null);
    const [nombreAutoMasAlquiladoMes, setNombreAutoMasAlquiladoMes] = useState("No disponible");
    const [imagenAutoMasAlquiladoMes, setImagenAutoMasAlquiladoMes] = useState(null);
    const [nombreAutoMasAlquiladoAnio, setNombreAutoMasAlquiladoAnio] = useState("No disponible");
    const [imagenAutoMasAlquiladoAnio, setImagenAutoMasAlquiladoAnio] = useState(null);

    const fetchAllAlquileres = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3000/alquiler");
            const alquileres = response.data;
            console.log("Alquileres obtenidos:", alquileres); // Depuración
            setAllAlquileres(alquileres);
            await obtenerAutoMasAlquilado(alquileres); // Asegurarse de que la llamada se espera
            await obtenerAutoMasAlquiladoEnMes(alquileres); // Llamar a la función para obtener el auto más alquilado del mes
            await obtenerAutoMasAlquiladoEnAnio(alquileres); // Llamar a la función para obtener el auto más alquilado del año
        } catch (error) {
            console.error("Error fetching alquileres:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllAlquileres();
    }, [fetchAllAlquileres]);

    // Funcion para obtener el auto más alquilado en el total de alquileres.
    const obtenerAutoMasAlquilado = async (alquileres) => {
        console.log("Alquileres para procesamiento:", alquileres); // Depuración
        // Almacena la cantidad de veces que se alquiló cada auto.
        // Las claves son los IDs de los autos y los valores son las veces que se alquilaron.
        const autosAlquilados = alquileres.reduce((acc, alquiler) => {
            const carId = alquiler.car?.id; 
            console.log("Procesando alquiler:", alquiler); // Depuración
            console.log("carId:", carId); // Depuración
            if (carId) { // Verificar que carId existe
                if (acc[carId]) {
                    acc[carId]++;
                } else {
                    acc[carId] = 1;
                }
            }
            return acc;
        }, {});

        console.log("Autos alquilados:", autosAlquilados); // Depuración

        let autoMasAlquiladoId = null;
        let maxVecesAlquilado = 0;
        Object.keys(autosAlquilados).forEach((carId) => {
            if (autosAlquilados[carId] > maxVecesAlquilado) {
                maxVecesAlquilado = autosAlquilados[carId];
                autoMasAlquiladoId = carId;
            }
        });

        console.log("Auto más alquilado ID:", autoMasAlquiladoId); // Depuración

        if (autoMasAlquiladoId) {
            try {
                const autoDetails = await getCarById(autoMasAlquiladoId);
                console.log("Detalles del auto más alquilado:", autoDetails); // Depuración
                setNombreAutoMasAlquilado(autoDetails.name);
                setImagenAutoMasAlquilado(autoDetails.image); 
            } catch (error) {
                console.error("Error al obtener los detalles del auto:", error);
            }
        } else {
            console.warn("No se encontró un auto más alquilado");
        }
    };

    // Funcion para obtener el auto más alquilado en el mes actual.
    const obtenerAutoMasAlquiladoEnMes = async (alquileres) => {
        const mesActual = new Date().getMonth() + 1;
        const anioActual = new Date().getFullYear();

        const alquileresMesActual = alquileres.filter((alquiler) => {
            const fechaAlquiler = new Date(alquiler.fechaRetiro);
            return (
                fechaAlquiler.getMonth() + 1 === mesActual &&
                fechaAlquiler.getFullYear() === anioActual
            );
        });

        // Almacena la cantidad de veces que se alquiló cada auto en el mes actual.
        // Las claves son los IDs de los autos y los valores son las veces que se alquilaron.
        const autosAlquiladosMes = alquileresMesActual.reduce((acc, alquiler) => {
            const carId = alquiler.car?.id;
            if (carId) {
                if (acc[carId]) {
                    acc[carId]++;
                } else {
                    acc[carId] = 1;
                }
            }
            return acc;
        }, {});

        let autoMasAlquiladoMesId = null;
        let maxVecesAlquiladoMes = 0;
        Object.keys(autosAlquiladosMes).forEach((carId) => {
            if (autosAlquiladosMes[carId] > maxVecesAlquiladoMes) {
                maxVecesAlquiladoMes = autosAlquiladosMes[carId];
                autoMasAlquiladoMesId = carId;
            }
        });

        if (autoMasAlquiladoMesId) {
            try {
                const autoDetails = await getCarById(autoMasAlquiladoMesId);
                setNombreAutoMasAlquiladoMes(autoDetails.name);
                setImagenAutoMasAlquiladoMes(autoDetails.image);
            } catch (error) {
                console.error("Error al obtener los detalles del auto:", error);
            }
        } else {
            console.warn("No se encontró un auto más alquilado en el mes actual");
        }
    };

    // Funcion para obtener el auto más alquilado en el año actual.
    const obtenerAutoMasAlquiladoEnAnio = async (alquileres) => {
        const anioActual = new Date().getFullYear();

        const alquileresAnioActual = alquileres.filter((alquiler) => {
            const fechaAlquiler = new Date(alquiler.fechaRetiro);
            return fechaAlquiler.getFullYear() === anioActual;
        });

    
         // Almacena la cantidad de veces que se alquiló cada auto en el año actual.
         // Las claves son los IDs de los autos y los valores son las veces que se alquilaron.
        const autosAlquiladosAnio = alquileresAnioActual.reduce((acc, alquiler) => {
            const carId = alquiler.car?.id;
            if (carId) {
                if (acc[carId]) {
                    acc[carId]++;
                } else {
                    acc[carId] = 1;
                }
            }
            return acc;
        }, {});

        let autoMasAlquiladoAnioId = null;
        let maxVecesAlquiladoAnio = 0;
        Object.keys(autosAlquiladosAnio).forEach((carId) => {
            if (autosAlquiladosAnio[carId] > maxVecesAlquiladoAnio) {
                maxVecesAlquiladoAnio = autosAlquiladosAnio[carId];
                autoMasAlquiladoAnioId = carId;
            }
        });

        if (autoMasAlquiladoAnioId) {
            try {
                const autoDetails = await getCarById(autoMasAlquiladoAnioId);
                setNombreAutoMasAlquiladoAnio(autoDetails.name);
                setImagenAutoMasAlquiladoAnio(autoDetails.image);
            } catch (error) {
                console.error("Error al obtener los detalles del auto:", error);
            }
        } else {
            console.warn("No se encontró un auto más alquilado en el año actual");
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
                        {imagenAutoMasAlquilado && <img src={imagenAutoMasAlquilado} alt="Auto más alquilado" style={{ width: "100%" }} />}
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
                        <p>Auto más alquilado en el año: {nombreAutoMasAlquiladoAnio}</p>
                        {imagenAutoMasAlquiladoAnio && <img src={imagenAutoMasAlquiladoAnio} alt="Auto más alquilado en el año" style={{ width: "100%" }} />}
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
                        <p>Auto más alquilado en el mes: {nombreAutoMasAlquiladoMes}</p>
                        {imagenAutoMasAlquiladoMes && <img src={imagenAutoMasAlquiladoMes} alt="Auto más alquilado en el mes" style={{ width: "100%" }} />}
                    </div>
                </Grid>  
            </Grid>
        </Container>
    );
}

export default Estadisticas;





