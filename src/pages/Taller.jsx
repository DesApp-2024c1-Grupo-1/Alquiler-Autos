import React, { useState, useEffect } from 'react';
import { getAllCarsAvailable } from "../services/CarsService";

function Taller() {
    const [cars, setCars] = useState([]); // Estado para almacenar los autos

    //Icono de la página en la pestaña del navegador.
    useEffect(() => {
        //Cambiar dinámicamente el favicon
        const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = "https://c0.klipartz.com/pngpicture/946/650/gratis-png-taller-de-coches-iconos-de-computadora-taller-de-reparacion-de-automoviles-reparacion.png"; //URL del favicon
        document.head.appendChild(favicon);

        //Limpia el efecto al desmontar el componente, si es necesario
        return () => {
            favicon.href = '/favicon.ico'; //Restaurar el favicon original, si corresponde
        };
    }, []); //Solo se ejecuta al montar la página

    useEffect(() => {
        getAllCarsAvailable().then((carsData) => {
            console.log("Autos filtrados y disponibles: ", carsData);
            setCars(carsData); // Guardar los autos en el estado una vez resuelta la promesa
        }).catch((error) => {
            console.error("Error al obtener los autos:", error);
        });
    }, []); // Ejecutar solo al montar el componente

    return (
        <>
            <h1>Taller</h1>
            <div>
                {cars.map((car, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            margin: "10px 0",
                            borderRadius: "5px",
                        }}
                    >
                        <h2>{car.name}</h2>
                        <p>Marca: {car.brand}</p>
                        <p>Año: {car.year}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Taller;