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

    const estilo = {backgroundColor: "#e4e9f0", borderRadius: '5px', border: "solid", padding: 2}
    
    return (
        <Container maxWidth="100%">
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap'}}>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Alquileres Del Mes</h2>
                    <hr style={{ border: '1px solid'}} />
                    (
                        <div>
                        <p>Cantidad de Alquileres: </p>
                        <p>Días totales de alquiler: </p>
                        <p>Ganancia total:</p>
                        </div>
                    )
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={estilo}>
                    <h2>Alquileres del año</h2>
                    <hr style={{ border: '1px solid'}} />
                    (
                        <div>
                        <p>Cantidad de Alquileres: </p>
                        <p>Días totales de alquiler: </p>
                        <p>Ganancia total:</p>
                        </div>
                    )
                </Grid>
                
            </Grid>
        
        </Container>
    );
}

export default Estadisticas;





