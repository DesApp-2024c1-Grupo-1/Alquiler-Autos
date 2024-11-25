import { useState, useEffect, useCallback } from 'react';
import { getAllAlquileres } from '../services/Estadisticas';

export function useAlquileres() {
    const [allAlquileres, setAllAlquileres] = useState([]);

    const fetchAllAlquileres = useCallback(async () => {
        try {
            const alquileres = await getAllAlquileres();
            console.log("Alquileres obtenidos:", alquileres);
            setAllAlquileres(alquileres);
        } catch (error) {
            console.error("Error fetching alquileres:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllAlquileres();
    }, [fetchAllAlquileres]);

    return allAlquileres;
}