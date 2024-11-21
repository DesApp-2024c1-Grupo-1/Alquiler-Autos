import React, { useState, useEffect } from 'react';
import { 
    Button, Typography, Box, Grid, Dialog, DialogTitle, DialogContent, 
    DialogActions, TextField 
} from '@mui/material';
import { getAllCarsAvailable } from "../services/CarsService";
import {registrarReparacion} from "../services/tallerService";
import faviconTaller from '../assets/faviconTaller.png';

function Taller() {
    const [cars, setCars] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [entryDate, setEntryDate] = useState('');
    const [exitDate, setExitDate] = useState('');

    //Icono de la página en la pestaña del navegador.
    useEffect(() => {
        //Cambiar dinámicamente el favicon
        const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = faviconTaller;
        document.head.appendChild(favicon);

        //Limpia el efecto al desmontar el componente, si es necesario
        return () => {
            favicon.href = '/favicon.ico'; //Restaurar el favicon original, si corresponde
        };
    }, []); //Solo se ejecuta al montar la página

    useEffect(() => {
        getAllCarsAvailable()
            .then((carsData) => {
                console.log("Autos filtrados y disponibles: ", carsData);
                setCars(carsData);
            })
            .catch((error) => {
                console.error("Error al obtener los autos:", error);
            });
    }, []);

    const openPopup = (car, index) => {
        setSelectedCar(car);
        setEntryDate('');
        setExitDate('');
        setOpenDialog(true);
    };

    const closePopup = () => {
        setOpenDialog(false);
        setSelectedCar(null);
        setEntryDate('');
        setExitDate('');
    };

    const calcularCantidadDias = (fechaRetiro, fechaDevolucion) => {
        const retiro = new Date(fechaRetiro);
        const devolucion = new Date(fechaDevolucion);
        
        
        const diffTime = Math.abs(devolucion - retiro);
        
       
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
      };

    const confirmIngreso = () => {
        if (selectedCar !== null) {
          // Crear una nueva reparación
            const reparacion = {
                fechaInicio: entryDate, // Fecha actual en formato ISO
                fechaFin: exitDate, // La reparación aún no finaliza
                razon: 'se sentia mal',
                cantidadDias: calcularCantidadDias(entryDate, exitDate), // Se calculará al finalizar
                car: selectedCar, // selectedCar debe contener el objeto del auto
            };
            registrarReparacion(reparacion);
            console.log('reparacion', reparacion)
            } else {
                console.error("No se seleccionó ningún auto.");
            }
            closePopup();
    };



          /*  setCars((prevCars) =>
                prevCars.map((car, i) =>
                    i === selectedCar
                        ? { ...car, enReparacion: true, entryDate, exitDate }
                        : car
                )
            );

            console.log(`Auto: ${cars[selectedCar].name}`); 
            console.log(`Fecha de Entrada: ${entryDate}`);
            console.log(`Fecha de Salida: ${exitDate}`);
            
        }
        closePopup();
    };
*/
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Taller
            </Typography>
            <Grid container spacing={2}>
                {cars.map((car, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: 'center',
                                border: '1px solid #ccc',
                                padding: 2,
                                borderRadius: 1,
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {/* Imagen del auto */}
                            <img
                                src={car.image}
                                alt={`${car.name} image`}
                                style={{
                                    width: '100%',
                                    maxWidth: '150px',
                                    height: 'auto',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                }}
                            />
                            {/* Información del auto */}
                            <Box sx={{ flex: 1, marginLeft: { md: 2 } }}>
                                <Typography variant="h6">{car.name}</Typography>
                                <Typography>Patente: {car.patente}</Typography>
                                <Typography>Año: {car.year}</Typography>
                                <Typography>
                                    Reparación Pendiente: {car.enReparacion ? 'Sí' : 'No'}
                                </Typography>
                            </Box>
                            {/* Botón */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    marginTop: { xs: 2, md: 0 },
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => openPopup(car, index)}
                                >
                                    Taller
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Popup para ingresar fechas */}
            <Dialog open={openDialog} onClose={closePopup} maxWidth="sm" fullWidth>
                <DialogTitle sx={{mt: 1}}>Mantenimiento Programado</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Fecha de Entrada"
                        type="date"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        sx={{ mb: 2, mt: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        label="Fecha de Salida"
                        type="date"
                        value={exitDate}
                        onChange={(e) => setExitDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePopup} color="error">
                        Cancelar
                    </Button>
                    <Button
                        onClick={confirmIngreso}
                        variant="contained"
                        color="primary"
                        disabled={!entryDate || !exitDate}
                    >
                        Confirmar Ingreso
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Taller;