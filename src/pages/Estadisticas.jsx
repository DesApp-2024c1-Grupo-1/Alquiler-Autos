import React, { useCallback, useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import axios, { all } from "axios";
import { registrarAlquiler } from "../services/AlquilerService"; // Asumiendo que aquí está definida la función registrarAlquiler
import { getCarById } from "../services/CarsService";

export function Estadisticas() {
    const [allAlquileres, setAllAlquileres] = useState([]);
    const [nombreAutoMasAlquilado, setNombreAutoMasAlquilado] = useState("No disponible"); // Define un estado para almacenar el nombre del auto más alquilado en toda la historia.
    const [imagenAutoMasAlquilado, setImagenAutoMasAlquilado] = useState(null); // Define un estado para almacenar la URL de la imagen del auto más alquilado en toda la historia.
    const [lanzamientoAutoMasAlquilado, setLanzamientoAutoMasAlquilado] = useState(null);
    const [nombreAutoMasAlquiladoMes, setNombreAutoMasAlquiladoMes] = useState("No disponible"); // Define un estado para almacenar el nombre del auto más alquilado en el mes actual.
    const [imagenAutoMasAlquiladoMes, setImagenAutoMasAlquiladoMes] = useState(null); // Define un estado para almacenar la URL de la imagen del auto más alquilado en el mes actual.
    const [lanzamientoAutoMasAlquiladoMes, setLanzamientoAutoMasAlquiladoMes] = useState(null);
    const [nombreAutoMasAlquiladoAnio, setNombreAutoMasAlquiladoAnio] = useState("No disponible"); // Define un estado para almacenar el nombre del auto más alquilado en el año actual.
    const [imagenAutoMasAlquiladoAnio, setImagenAutoMasAlquiladoAnio] = useState(null); // Define un estado para almacenar la URL de la imagen del auto más alquilado en el año actual.
    const [lanzamientoAutoMasAlquiladoAnio, setLanzamientoAutoMasAlquiladoAnio] = useState(null);

    const fetchAllAlquileres = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:3000/alquiler");
            const alquileres = response.data;
            console.log("Alquileres obtenidos:", alquileres); // Depuración
            setAllAlquileres(alquileres);
            await obtenerAutoMasAlquilado(alquileres, setNombreAutoMasAlquilado, setImagenAutoMasAlquilado, setLanzamientoAutoMasAlquilado); // Para toda la historia
            await obtenerAutoMasAlquilado(alquileres, setNombreAutoMasAlquiladoMes, setImagenAutoMasAlquiladoMes, setLanzamientoAutoMasAlquiladoMes, 'month'); // Para el mes actual
            await obtenerAutoMasAlquilado(alquileres, setNombreAutoMasAlquiladoAnio, setImagenAutoMasAlquiladoAnio, setLanzamientoAutoMasAlquiladoAnio, 'year'); // Para el año actual

        } catch (error) {
            console.error("Error fetching alquileres:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllAlquileres();
    }, [fetchAllAlquileres]);

    // Función para obtener el auto más alquilado en el periodo especificado.
    // "alquileres" lista de todos los alquileres.
    const obtenerAutoMasAlquilado = async (alquileres, setNombre, setImagen, setLanzamiento = null, periodo) => {
        const filteredAlquileres = alquileres.filter((alquiler) => { // Función que filtra los alquileres por 'periodo': mes actual ('month'), año actual ('year') o toda la historia (undefined).
            const fechaAlquiler = new Date(alquiler.fechaRetiro); // Convierte la fecha de retiro del alquiler en un objeto 'Date', para facilitar la comparación.
            if (periodo === 'month') {
                const mesActual = new Date().getMonth() + 1;
                const anioActual = new Date().getFullYear();
                return (
                    fechaAlquiler.getMonth() + 1 === mesActual &&
                    fechaAlquiler.getFullYear() === anioActual
                );
            } else if (periodo === 'year') {
                const anioActual = new Date().getFullYear();
                return fechaAlquiler.getFullYear() === anioActual;
            } else {
                return true; // No filtrar, obtener datos de toda la historia
            }
        });

        // Almacena la cantidad de veces que se alquiló cada auto en un periodo especificado.
        // Las claves son los IDs de los autos y los valores son las veces que se alquilaron.
        const autosAlquilados = filteredAlquileres.reduce((acc, alquiler) => {
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
                setNombre(autoDetails.name); // Función para establecer el nombre del auto más alquilado.
                setImagen(autoDetails.image); // Función para establecer la imagen del auto más alquilado.
                if (setLanzamiento) setLanzamiento(autoDetails.fechaLanzamiento);// Función para establecer la fecha de lanzamiento del auto más alquilado.
            } catch (error) {
                console.error("Error al obtener los detalles del auto:", error);
            }
        } else {
            console.warn("No se encontró un auto más alquilado");
        }
    };

    //auxiliares de fecha
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



//función que espera una fecha para calcular hace cuantos días fue
//comparando fechaActual con fecha de lanzamiento de el auto

function diferenciaEnDias(car) {
    const fechaActual = new Date();
    const fechaLanzamiento = new Date(car); // Convertir a Date

    const diferenciaEnMilisegundos = fechaActual.getTime() - fechaLanzamiento.getTime();

    // Convertir la diferencia a días
    const dias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

    return dias;
}

//función que espera una fecha y si la misma tiene una diferencia mayor a 30 días con la actual devuelve false

function esNuevo(car) {
    console.log(car)
    return diferenciaEnDias(car) <= 30;

}

// Estilo base

const estilo = {
    backgroundColor: "#e4e9f0",
    borderRadius: "5px",
    border: "solid",
    padding: 2,
};


// Estilo publicitario basado en el auto mas alquilado
const estiloPublicitario1 = {
    ...estilo,
    border: esNuevo(lanzamientoAutoMasAlquilado) ? "solid red" : estilo.border,
};

// Estilo publicitario basado en el auto mas alquilado en el año
const estiloPublicitario2 = {
    ...estilo,
    border: esNuevo(lanzamientoAutoMasAlquiladoAnio) ? "solid red" : estilo.border,
};

// Estilo publicitario basado en el auto mas alquilado en el mes
const estiloPublicitario3 = {
    ...estilo,
    border: esNuevo(lanzamientoAutoMasAlquiladoMes) ? "solid red" : estilo.border,
};


    return (
        <Container maxWidth="100%">
            <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>      
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estiloPublicitario1}>
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
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estiloPublicitario2}>
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
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estiloPublicitario3}>
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





