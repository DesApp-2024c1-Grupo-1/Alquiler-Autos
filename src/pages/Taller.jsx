import React, { useState, useEffect } from 'react'; 
import { 
    Button, Typography, Box, Grid, Dialog, DialogTitle, DialogContent, 
    DialogActions, TextField, Skeleton 
} from '@mui/material';
import { getAllCarsAvailable } from "../services/CarsService";
import { registrarReparacion } from "../services/tallerService";
import faviconTaller from '../assets/faviconTaller.png';

function Taller() {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar el skeleton de carga
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [entryDate, setEntryDate] = useState('');
    const [exitDate, setExitDate] = useState('');
    const [razon, setRazon] = useState('');

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const todayDate = getTodayDate();

    useEffect(() => {
        const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = faviconTaller;
        document.head.appendChild(favicon);

        return () => {
            favicon.href = '/favicon.ico';
        };
    }, []);

    useEffect(() => {
        getAllCarsAvailable()
            .then((carsData) => {
                console.log("Autos filtrados y disponibles: ", carsData);
                setCars(carsData);

                // Retrasar la visualización de los datos por 3 segundos
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
            })
            .catch((error) => {
                console.error("Error al obtener los autos:", error);

                // Manejar error y ocultar skeleton tras 3 segundos
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
            });
    }, []);

    const openPopup = (car) => {
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
            const reparacion = {
                fechaInicio: entryDate,
                fechaFin: exitDate,
                razon: razon,
                cantidadDias: calcularCantidadDias(entryDate, exitDate),
                car: selectedCar,
            };
            registrarReparacion(reparacion);
            console.log('Reparación', reparacion);
        } else {
            console.error("No se seleccionó ningún auto.");
        }
        closePopup();
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Taller
            </Typography>
            <Grid container spacing={2}>
                {isLoading ? (
                    // Mostrar Skeleton mientras se cargan los autos
                    Array.from({ length: 6 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                sx={{
                                    border: '1px solid #ccc',
                                    padding: 2,
                                    borderRadius: 1,
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 1 }} />
                                <Skeleton variant="text" sx={{ mt: 2 }} width="80%" />
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="rounded" sx={{ mt: 2 }} width="50%" height={30} />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    cars.map((car, index) => (
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
                                <Box sx={{ flex: 1, marginLeft: { md: 2 } }}>
                                    <Typography variant="h6">{car.name}</Typography>
                                    <Typography>Patente: {car.patente}</Typography>
                                    <Typography>Año: {car.year}</Typography>
                                </Box>
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
                                        onClick={() => openPopup(car)}
                                    >
                                        Taller
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))
                )}
            </Grid>

            <Dialog open={openDialog} onClose={closePopup} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ mt: 1 }}>Mantenimiento Programado</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Fecha de Entrada"
                        type="date"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        sx={{ mb: 2, mt: 2 }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: todayDate }}
                    />
                    <TextField
                        fullWidth
                        label="Fecha de Salida"
                        type="date"
                        value={exitDate}
                        onChange={(e) => setExitDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: entryDate || todayDate }}
                    />
                    <TextField
                        fullWidth
                        label="Razón del Mantenimiento"
                        value={razon}
                        onChange={(e) => setRazon(e.target.value)}
                        multiline
                        rows={3}
                        placeholder="Escribe la razón del mantenimiento..."
                        sx={{ mb: 2, mt: 2 }}
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