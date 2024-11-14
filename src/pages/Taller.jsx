import React, { useState, useEffect } from 'react';
import { getAllCarsAvailable } from "../services/CarsService";

function Taller() {
    const [cars, setCars] = useState([]); // Estado para almacenar los autos

    useEffect(() => {
        getAllCarsAvailable().then((carsData) => {
            console.log("Autos filtrados y disponibles: ", carsData);
            setCars(carsData); // Guardar los autos en el estado una vez resuelta la promesa
        }).catch((error) => {
            console.error("Error al obtener los autos:", error);
        });
    }, []); // Ejecutar solo al montar el componente

    const toggleReparacion = (index) => {
        setCars((prevCars) =>
            prevCars.map((car, i) =>
                i === index
                    ? { ...car, enReparacion: car.enReparacion === null || car.enReparacion === false ? true : false }
                    : car
            )
        );
    };

    return (
        <>
            <h1>Taller</h1>
            <div>
            {cars.map((car, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex", // Flex para organizar en filas
                        alignItems: "center", // Centrar verticalmente los elementos
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px 0",
                        borderRadius: "5px",
                    }}
                >
                    <img 
                        src={car.image} 
                        alt={`${car.name} image`} 
                        style={{ width: "150px", height: "auto", borderRadius: "5px", marginRight: "10px" }} 
                    />
                    <div>
                        <h2>{car.name}</h2>
                        <p>Marca: {car.brand}</p>
                        <p>Año: {car.year}</p>
                        <p>Reparación Pendiente: {car.enReparacion ? 'si': 'no'}</p>
                    </div>
                    <button onClick={() => toggleReparacion(index)}>
                            Cambiar Estado
                    </button>
                    <button>
                            Asignar evento reparacion, no anda
                    </button>
                </div>
                ))}
                </div>
        </>
    );
}

export default Taller;