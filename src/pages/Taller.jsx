import React, { useState, useEffect } from 'react'; 
import {
    Button, Typography, Box, Grid, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Skeleton
} from '@mui/material';
import { getAllCarsAvailable, getCarAvailabilityById } from "../services/CarsService";
import { registrarReparacion } from "../services/tallerService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { es } from "date-fns/locale";
import Swal from 'sweetalert2';
import { formatearDateTime } from '../services/DateHelper';
import faviconTaller from '../assets/faviconTaller.png';

function Taller() {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [entryDate, setEntryDate] = useState('');
    const [exitDate, setExitDate] = useState('');
    const [razon, setRazon] = useState('');
    const [vehicleUnavailableDialogOpen, setVehicleUnavailableDialogOpen] = useState(false);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errorEntryDate, setErrorEntryDate] = React.useState(null);
    const [errorExitDate, setErrorExitDate] = React.useState(null);
    
    const errorMessages = {
      minDate1: "Debe ser mayor a la fecha de hoy",
      invalidDate1: "La fecha de entrada es inválida",
      disablePast1: "Debe ser mayor a la fecha de hoy",
      minDate2: "Debe ser mayor a la fecha de entrada",
      invalidDate2: "La fecha de salida es inválida",
      disablePast2: "Debe ser mayor a la fecha de entrada",
    };
    
    const getErrorMessage = (errorKey,picker) => {
       return errorMessages[errorKey+picker] || ""
    }

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
                setCars(carsData);
                setTimeout(() => setIsLoading(false), 1500);
            })
            .catch((error) => {
                console.error("Error al obtener los autos:", error);
                setTimeout(() => setIsLoading(false), 1500);
            });
    }, []);

    useEffect(() => {
        if(!entryDate || !exitDate || entryDate === '' || exitDate === '' || entryDate > exitDate || entryDate < new Date()) {
            setButtonDisabled(true);
        }else{
            setButtonDisabled(false);
        }
    }, [entryDate, exitDate]);

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

    const confirmIngreso = async () => {
        if (selectedCar !== null) {
            const filtros = {
                fechaRetiro: entryDate,
                fechaDevolucion: exitDate,
            };
    
            try {
                const availability = await getCarAvailabilityById(selectedCar.id, filtros);
    
                if (availability.available) {
                    const reparacion = {
                        fechaInicio: entryDate,
                        fechaFin: exitDate,
                        razon: razon,
                        cantidadDias: calcularCantidadDias(entryDate, exitDate),
                        car: selectedCar,
                    };
    
                    await registrarReparacion(reparacion);
                    console.log('Reparación registrada:', reparacion);
                    Swal.fire({
                        title: "Reparación registrada",
                        text: "El vehículo ha sido ingresado al taller correctamente",
                        icon: "success"
                      });
                    closePopup();
                } else {
                    const fechasConflictivas = availability.events
                    .map(e => formatearDateTime(e.start) + " - " + e.momento)
                    .join("<br>");
                
                Swal.fire({
                    icon: "error",
                    title: "Vehículo no disponible",
                    html: `El vehículo seleccionado no está disponible para las fechas indicadas. <br><strong><br>Fechas conflictivas:</strong><br>${fechasConflictivas}`,
                });
                }
            } catch (error) {
                closePopup();
                console.error("Error al verificar la disponibilidad:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un error al verificar la disponibilidad. Inténtalo de nuevo.",
                });
            }
        } else {
            console.error("No se seleccionó ningún auto.");
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Taller
            </Typography>
            <Grid container spacing={2}>
                {isLoading ? (
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

            <Dialog open={openDialog} onClose={closePopup} maxWidth="sm" fullWidth style={{ zIndex: 1000 }}>
                <DialogTitle sx={{ mt: 1 }}>Mantenimiento Programado</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                        <MobileDateTimePicker
                            label="Fecha de Entrada"
                            value={entryDate}
                            onChange={(newEntryDate) => setEntryDate(newEntryDate)}
                            sx={{
                                width: "50%",
                                marginBottom: "20px",
                                marginTop: "10px",
                                paddingRight: "10px",
                            }}
                            disablePast
                            minDate={new Date()}
                            minutesStep={30}
                            onError={(error) => {setErrorEntryDate(error)}}
                            slotProps={{
                                textField: {
                                  helperText: getErrorMessage(errorEntryDate, 1),
                                },
                              }}
                        />
                        <MobileDateTimePicker
                            label="Fecha de Salida"
                            value={exitDate}
                            onChange={(newExitDate) => setExitDate(newExitDate)}
                            sx={{
                                width: "50%",
                                marginBottom: "20px",
                                marginTop: "10px",
                                paddingRight: "10px",
                            }}
                            disablePast
                            minDate={entryDate}
                            minutesStep={30}
                            onError={(error) => {setErrorExitDate(error)}}
                            slotProps={{
                                textField: {
                                    helperText: getErrorMessage(errorExitDate, 2),
                                },
                              }}
                        />
                    </LocalizationProvider>
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
                        disabled={buttonDisabled}
                    >
                        Confirmar Ingreso
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={vehicleUnavailableDialogOpen} onClose={() => setVehicleUnavailableDialogOpen(false)} maxWidth="xs">
                <DialogTitle>Vehículo no disponible</DialogTitle>
                <DialogContent>
                    <Typography>
                        El vehículo seleccionado no está disponible para las fechas indicadas. 
                        Las fechas conflictivas son:
                    </Typography>
                    <ul>
                        {unavailableDates.map((date, index) => (
                            <li key={index}>{date}</li>
                        ))}
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVehicleUnavailableDialogOpen(false)} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Taller;