import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Button, Eventcalendar, formatDate, Popup, setOptions, Toast, localeEs } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { momentTimezone } from '@mobiscroll/react';
import moment from 'moment-timezone';
import { getEventos, actualizarAlquiler, registrarPago, eliminarAlquiler   } from '../services/EventosService';
import { set, update } from 'lodash';
import { enGB } from 'date-fns/locale';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Box, Card, CardMedia, Grid, Stack, Typography, TextField, OutlinedInput,
  InputLabel, InputAdornment, FormControl, Modal, FormControlLabel, Checkbox, Autocomplete,  List, ListItem, ListItemText 
} from "@mui/material";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { red } from '@mui/material/colors';
import { lugaresFijos } from "../components/Filtros.jsx";



export function BotonPago({alquiler, prueba}) {
    
    
    const [isTooltipOpen, setTooltipOpen] = useState(false);
    const [appointmentPago, setAppointmentPago] = useState(false);
    const [montoPago, setMontoPago] = useState(''); 
    const [pagoTotal, setAppointmentPagoTotal] = useState(false);
    const [saldoP, setAppointmentSaldoP] = useState('');
    const [isTotalChecked, setIsTotalChecked] = useState(false);
    const [appointmentHistorialPago, setAppointmentHistorialPago] = useState([]);
    const [isHistorialModalOpen, setHistorialModalOpen] = useState(false);



    
    useEffect(() => {
        if (alquiler) {
            setAppointmentPagoTotal(alquiler.precioFinal);
            setAppointmentSaldoP(alquiler.saldoPendiente);
            setAppointmentHistorialPago(alquiler.pagos);
        }
    }, [alquiler]);
  useEffect(() => {
    const fetchEventos = async () => {
      const eventos = await getEventos();
      const pagos = eventos.map(evento => evento.alquiler.pagos).flat(); // Parametrizar
      setAppointmentHistorialPago(pagos);
      
    };
  
    fetchEventos();
  }, []);



    

    const handleCheckboxChange = (event) => {
        setIsTotalChecked(event.target.checked);
        if (event.target.checked) {
        setMontoPago(saldoP); // Asigno el saldoPendiente
        } else {
        setMontoPago(0); 
        }
    };

    
    const abrirHistorialModal = () => {
        setHistorialModalOpen(true);
      };
    
      const cerrarHistorialModal = () => {
        setHistorialModalOpen(false);
      };
    

    // useEffect(() => {
    //     if (appointmentPago) {
    //     // Resetea el campo de monto cuando el modal se abre
    //     setMontoPago(''); 
    //     // Si es necesario resetear el checkbox también
    //     setIsTotalChecked(false);
    
    //     if (appointment && appointment.alquiler) {
    //         // Cuando el modal de pago se abre, actualiza el saldo pendiente
    //         setAppointmentSaldoP(appointment.alquiler.saldoPendiente);
    //     }
    //     }
    // }, [appointmentPago, appointment]);


    const handlePago = async () => {
        const monto = parseFloat(montoPago);
      
        if (isNaN(monto) || monto <= 0) {
          console.error('El monto debe ser un número positivo.');
          setToastMessage('El monto debe ser un número positivo.');
          setToastOpen(true);
          return;
        }
      
        if (montoPago > saldoP) {
          console.error('El monto a pagar no puede ser mayor que el saldo pendiente.');
          setToastMessage('El monto a pagar no puede ser mayor que el saldo pendiente.');
          setToastOpen(true);
          return;
        }
      
        try {
          const response = await registrarPago(appointment.alquiler.id, monto);
      
          if (response) {
            // Actualizar el estado con el nuevo pago agregado
            setAppointments((appointments) =>
              appointments.map((item) =>
                item.alquiler.id === appointment.alquiler.id
                  ? {
                      ...item,
                      alquiler: {
                        ...item.alquiler,
                        pagos: [...item.alquiler.pagos, response], // Agregar el nuevo pago
                        saldoPendiente: item.alquiler.saldoPendiente - monto, // Actualizar saldo pendiente
                      },
                    }
                  : item
              )
            );
      
            // Actualizar el saldo pendiente localmente y en el appointment
            const nuevoSaldo = saldoP - monto;
            console.log('Saldo pendiente actualizado:', nuevoSaldo); // Verificar el valor
            setAppointmentSaldoP(nuevoSaldo);
            
            // También actualizamos el saldoPendiente del alquiler en el appointment
            setAppointment((prev) => ({
              ...prev,
              alquiler: {
                ...prev.alquiler,
                saldoPendiente: nuevoSaldo,
              },
            }));
      
            // Cerrar el modal de pagos
            setAppointmentPago(false);
      
            // Mostrar un mensaje de éxito
            setToastMessage('Pago registrado correctamente');
          }
        } catch (error) {
          console.error('Error al registrar el pago:', error);
          setToastMessage('Error al registrar el pago');
        } finally {
          setToastOpen(true);
        }
      };


    

    return <>
          {/* <Button
                color="success"
                className="mds-tooltip-button"
                onClick={handlePagoClick}
            >
                Pago
            </Button> */}

             <Modal open={prueba} onClose={() => setAppointmentPago(false)}>
        <Box sx={{
            width: 400,
            height: 325,
            padding: 2,
            backgroundColor: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            borderRadius: 1, }}>
            <Typography variant="h6" marginBottom={2} sx={{ borderBottom: '1px solid #e0e0e0' }}> Pago de Saldo</Typography>
            <div className="payment-popup-item" style={{ padding: '10px' }}>
            <span className="payment-popup-label">Saldo Original:</span>
            <span style={{ paddingLeft: '10px' }}>{pagoTotal}</span>
            </div>
            <div className="payment-popup-item" style={{ padding: '10px', marginBottom: '20px' }}>
            <span className="payment-popup-label">Saldo Pendiente:</span>
            <span style={{ paddingLeft: '10px' }}>{saldoP}</span> 
            </div>

            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, paddingLeft: '10px' }}>
            <TextField
                label="Cantidad a Pagar"
                type="number"
                variant="outlined"
                value={montoPago}
                onChange={(e) => setMontoPago(e.target.value)}
                style={{ marginRight: 16, width: 225 }}
            />
            <FormControlLabel control={
                <Checkbox
                    checked={isTotalChecked}
                    onChange={handleCheckboxChange}
                    color="primary"
                />
                }
                label="Total"
            />
            </Box>


            <Box sx={{ pading: 20, marginTop: 4, paddingLeft: '10px' }}>
            <Button color="primary" onClick={handlePago} style={{ marginRight: 8 }}>
                Realizar Pagos
            </Button>
            <Button color="danger" onClick={() => setAppointmentPago(false)}>
                Cancelar
            </Button>
            <Button color="info" className="mds-tooltip-button mbsc-pull-right" onClick={abrirHistorialModal}>
                Historial
            </Button>
            </Box>
        </Box>
        </Modal>

        <Modal
  open={appointmentPago}
  onClose={() => setAppointmentPago(false)}  
>
  <Box sx={{
    width: 400,
    height: 325,
    padding: 2,
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: 1,
  }}>
    <Typography variant="h6" marginBottom={2} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      Pago de Saldo
    </Typography>
    
   
    <div className="payment-popup-item" style={{ padding: '10px' }}>
    <span className="payment-popup-label">Saldo Original:</span>
    <span style={{ paddingLeft: '10px' }}>{pagoTotal}</span>
  </div>
  

  <div className="payment-popup-item" style={{ padding: '10px', marginBottom: '20px' }}>
    <span className="payment-popup-label">Saldo Pendiente:</span>
    <span style={{ paddingLeft: '10px' }}>{saldoP}</span> 
  </div>


  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, paddingLeft: '10px' }}>
    <TextField
      label="Cantidad a Pagar"
      type="number"
      variant="outlined"
      value={montoPago}
      onChange={(e) => setMontoPago(e.target.value)}
      style={{ marginRight: 16, width: 225 }}
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={isTotalChecked}
          onChange={handleCheckboxChange}
          color="primary"
        />
      }
      label="Total"
    />
  </Box>


  <Box sx={{ pading: 20, marginTop: 4, paddingLeft: '10px' }}>
    <Button color="primary" onClick={handlePago} style={{ marginRight: 8 }}>
      Realizar Pagos
    </Button>
    <Button color="danger" onClick={() => setAppointmentPago(false)}>
      Cancelar
    </Button>
    <Button color="info" className="mds-tooltip-button mbsc-pull-right" onClick={abrirHistorialModal}>
      Historial
    </Button>
  </Box>
</Box>
</Modal>



        


<Modal
  open={isHistorialModalOpen}
  onClose={cerrarHistorialModal}
  aria-labelledby="historial-pagos-modal"
>
  <Box sx={{
    width: 400,
    padding: 2,
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: 1,
  }}>
    <Typography variant="h6" marginBottom={2}>Historial de Pagos</Typography>
    <List>
      {appointmentHistorialPago?.length > 0 ? (
        appointmentHistorialPago.map((pago, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Monto: ${pago.monto}, Fecha: ${new Date(pago.fecha).toLocaleDateString()}`} />
          </ListItem>
        ))
      ) : (
        <Typography>No hay pagos registrados.</Typography>
      )}
    </List>
    <Button color="secondary" onClick={cerrarHistorialModal}>Cerrar</Button>
  </Box>
</Modal>




    </>

}
