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
  InputLabel, InputAdornment, FormControl, Modal, FormControlLabel, Checkbox, Autocomplete
} from "@mui/material";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { red } from '@mui/material/colors';
import { lugaresFijos } from "../components/Filtros.jsx";


setOptions({
  locale: localeEs,
  theme: 'ios',
  themeVariant: 'light'
});


momentTimezone.moment = moment;

function AgendaPage() {

  const [appointments, setAppointments] = useState([])

  const fetchAllEvents = useCallback(async () => {
    
    const obtainedEvents = await getEventos();


    console.log('Eventos obtenidos:', obtainedEvents); 

    setAppointments(obtainedEvents);
  }, []);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };


  useEffect(() => {
    fetchAllEvents()
  }, [fetchAllEvents]);

  const [appointment, setAppointment] = useState();
  const [appointmentInfo, setAppointmentInfo] = useState('');
  const [appointmentLocation, setAppointmentLocation] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentTimeR, setAppointmentTimeR] = useState('');
  const [appointmentTimeD, setAppointmentTimeD] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonType, setButtonType] = useState('');
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [tooltipAnchor, setTooltipAnchor] = useState(null);
  const [tooltipColor, setTooltipColor] = useState('');
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  

  const [formAlquiler, setFormAlquiler] = useState({ lugarRetiro: '', lugarDevolucion: '' });
  const [lugarDevolucionValido, setLugarDevolucionValido] = useState(true);

  
  const [appointmentPatente, setAppointmentPatente] = useState('null');
  const [isEditDatosCOpen, setEditDatosCOpen] = useState(false);

  const [isEditCustomerModalOpen, setEditCustomerModalOpen] = useState(false);

 

  const [pagoTotal, setAppointmentPagoTotal] = useState(false);
  const [saldoP, setAppointmentSaldoP] = useState('');



  
  
  const [alquiler, setAlquiler] = useState(null); // Estado para manejar los datos del alquiler
 



const handleCheckboxChange = (event) => {
  setIsTotalChecked(event.target.checked);
  if (event.target.checked) {
    setMontoPago(saldoP); // Asigno el saldoPendiente
  } else {
    setMontoPago(0); 
  }
};


  const [appointmentPago, setAppointmentPago] = useState(false);


  

  const [isTotalChecked, setIsTotalChecked] = useState(false);

  const [montoPago, setMontoPago] = useState(''); 

  const handlePago = async () => {

    const monto = parseFloat(montoPago);
  
   
    if (isNaN(monto) || monto <= 0) {
      console.error('El monto debe ser un número positivo.');
      setToastMessage('El monto debe ser un número positivo.');
      setToastOpen(true);
      return;
    }
  
    console.log('Realizando pago para el alquiler ID:', appointment.alquiler.id);
    console.log('Monto del pago:', monto);

      
  if (montoPago > saldoP) {
    console.error('El monto a pagar no puede ser mayor que el saldo pendiente.');
    setToastMessage('El monto a pagar no puede ser mayor que el saldo pendiente.');
    setToastOpen(true);
    return;
  }
  
    try {
      
      const response = await registrarPago(appointment.alquiler.id, monto);
      
     
      if (response) {
       
        setAppointments((appointments) => 
          appointments.map((item) => 
            item.alquiler.id === appointment.alquiler.id
              ? { ...item, alquiler: { ...item.alquiler, pagos: [...item.alquiler.pagos, response] } }
              : item
          )
        );
  
        
        setAppointmentPago(false);
  
        
        setToastMessage('Pago registrado correctamente');
      }
    } catch (error) {
      
      console.error('Error al registrar el pago:', error);
      setToastMessage('Error al registrar el pago');
    } finally {
     
      setToastOpen(true);
    }
  };
  
  
  
  














{/*

const handleSavePayment = async () => {
  console.log('Evento completo', appointment);
  console.log('Monto a pagar:', montoPago);
  console.log('Funcionamiento Pagos', appointment.alquiler.pagos)

  const nuevoPago = {
    fecha: new Date(), 
    monto: parseFloat(montoPago)
  };
  
  
  // Modificar el alquiler con el nuevo pago
  const alquilerModificado = {
    ...appointment.alquiler,
    cantidadDias: appointment.alquiler.cantidadDias,
    pagos: [...appointment.alquiler.pagos, nuevoPago] 
};

console.log('Pagos antes de guardar:', alquilerModificado.pagos); // Verifica que tenga el nuevo pago

try {
  const updateAlquiler = await actualizarAlquiler(appointment.alquiler.id, alquilerModificado);

  // Verifica si la actualización fue exitosa
  if (!updateAlquiler) {
    alert("No se pudo actualizar el alquiler.");
    return;
  }

  // Actualiza el estado de las citas
  setAppointments((appointments) =>
    appointments.map((item) =>
      item.alquiler.id === updateAlquiler.id ? { ...item, alquiler: updateAlquiler } : item
    )
  );

  alert("Pago realizado con éxito.");
} catch (error) {
  console.error("Error al actualizar el saldo pendiente:", error);
  alert("Error al realizar el pago.");
}
};
*/}





const handleLugarDevolucionChange = (event, newInputValue) => {
  setFormAlquiler((prev) => ({ ...prev, lugarDevolucion: newInputValue }));
  
  // Validación: comprueba si el lugar está en la lista
  if (newInputValue.trim() === '') {
    setLugarDevolucionValido(false); // El campo está vacío, no es válido
  } else {
    setLugarDevolucionValido(true); // Hay valor, es válido
  }
};




  const handleEditDatosCChange = (e) => {
    const { name, value } = e.target;
    setEditDatosC((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleSaveCustomerChanges = async () => {
    console.log('Evento completo', appointment);
    console.log('Guardar cambios del cliente', editDatosC);
    console.log('ID de Alquiler.cliente.id: ', appointment.alquiler.cliente.id);
  
    const alquilerModificado = {
      ...appointment.alquiler, // Trae todos los datos del alquiler actual
      cliente: {
        ...appointment.alquiler.cliente, // Mantiene los datos del cliente actual
        ...editDatosC, // Sobrescribe con los nuevos datos del cliente
      },
    };
  
    try {
      const updateAlquiler = await actualizarAlquiler(appointment.alquiler.id, alquilerModificado);
      setAppointments((appointments) =>
        appointments.map((item) =>
          item.alquiler.id === updateAlquiler.id ? { ...item, alquiler: updateAlquiler } : item
        )
      );
  
      
      setEditCustomerModalOpen(false);
      setToastMessage('Datos del cliente actualizados correctamente');
      setToastOpen(true);
    } catch (error) {
      
      console.error('Hubo un error al actualizar los datos del cliente:', error);
      setToastMessage('Error al actualizar los datos del cliente');
      setToastOpen(true);
    }
  };
  
  

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteConfirmOpen(false); 
    setTooltipOpen(false);
    try {
      await eliminarAlquiler(appointment.alquiler.id); 
      setToastMessage('Alquiler eliminado con éxito');
      setToastOpen(true);

      setAppointments((appointments) => 
        appointments.filter((item) => item.alquiler.id !== appointment.alquiler.id)
      );
    } catch (error) {
      console.error('Error al eliminar el alquiler:', error);
      setToastMessage('Error al eliminar el alquiler');
      setToastOpen(true);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
  };




  const calcularCantidadDias = (fechaRetiro, fechaDevolucion) => {
    const retiro = new Date(fechaRetiro);
    const devolucion = new Date(fechaDevolucion);
    
    
    const diffTime = Math.abs(devolucion - retiro);
    
   
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };



  const handleSaveChanges = async () => {

    const cantidadDias = calcularCantidadDias(editData.fechaRetiro, editData.fechaDevolucion);
    const alquilerModificado = {
      ...editData,
      cantidadDias
    };
  
    console.log('Guardar cambios', alquilerModificado);
    
    try {
      const updateAlquiler = await actualizarAlquiler(appointment.alquiler.id, alquilerModificado);  
    
      setAppointments((appointments) =>
        appointments.map((item) => 
          item.id === updateAlquiler.id ? updateAlquiler : item	
        )
      );
      setEditPopupOpen(false);
    } catch (error) {
      console.error('Hubo un error al actualizar el alquiler:', error);
    }
  };


  
  
  const handleCloseEditPopup = () => {
    setEditPopupOpen(false);
  };

  
  const [editData, setEditData] = useState({
    
    lugarRetiro: '',
    lugarDevolucion: '',
    fechaRetiro: '',
    fechaDevolucion: '',
    cantidadDias: 0 // Inicialmente en 0, pero se actualizará antes de enviar los datos.
  });

  
  const [editDatosC, setEditDatosC] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    email: ''
  });









  const timer = useRef(null);

  const myView = useMemo(() => ({ agenda: { type: 'day' } }), []);

  

  const openTooltip = useCallback((args) => {
    const event = args.event;
    const time = formatDate(new Date(event.start)) + ' - ' + formatDate(new Date(event.end));
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setAppointment(event);
    setAppointmentInfo(event.alquiler.cliente.nombre);
    setAppointmentLocation(event.alquiler.lugarDevolucion);
    setAppointmentTime(time);
    setAppointmentReason(event.alquiler.lugarRetiro);
    setTooltipColor(event.color);
    setTooltipAnchor(args.domEvent.target);
    setTooltipOpen(true);
    setAppointmentTimeR(event.alquiler.fechaRetiro);
    setAppointmentTimeD(event.alquiler.fechaDevolucion);
    setAppointmentPagoTotal(event.alquiler.precioFinal);
    setAppointmentSaldoP(event.alquiler.saldoPendiente);

    {/*setAppointmentPatente(event.data?.car?.patente)*/}


    const patenteEs = event.alquiler.car.patente


    const fechaRetiro = event.alquiler.fechaRetiro;
    const fechaDevolucion = event.alquiler.fechaDevolucion;
    const saldoOriginal = event.alquiler.precioFinal;
  
    console.log('Evento completo', event)
    console.log('Fecha Retiro:', fechaRetiro);
    console.log('Fecha Devolucion:', fechaDevolucion);
    console.log('La patente es: ', patenteEs)
    console.log('La persona es:', event.alquiler.cliente)
    
  

    setAppointmentTimeR(fechaRetiro ? moment(fechaRetiro).format('DD MMM YYYY HH:mm') : 'N/A');
    setAppointmentTimeD(fechaDevolucion ? moment(fechaDevolucion).format('DD MMM YYYY HH:mm') : 'N/A');
  }, []);

  const handleEventClick = useCallback(
    (args) => {
      openTooltip(args);
    },
    [openTooltip],
  );

  const viewAppointmentFile = useCallback(() => {
    setTooltipOpen(false);
    setCustomerData(appointment.alquiler.cliente);
    setCustomerPopupOpen(true);
  }, [appointment]);


  const handleEventHoverIn = useCallback(
    (args) => {
      openTooltip(args);
    },
    [openTooltip],
  );

  const handleEventHoverOut = useCallback(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        setTooltipOpen(false);
      }, 200);
    }
  }, []);



  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);



  const formattedAppointmentTimeR = appointmentTimeR ? moment(appointmentTimeR).format('DD MMM YYYY HH:mm') : 'N/A';
  const formattedAppointmentTimeD = appointmentTimeD ? moment(appointmentTimeD).format('DD MMM YYYY HH:mm') : 'N/A';


  const deleteAppointment = useCallback(() => {
    setAppointments((appointments) =>
        appointments.filter((item) => item.data?.car?.patente !== appointmentPatente)
    );
    setTooltipOpen(false);
    setToastMessage('Auto eliminado');
    setToastOpen(true);
}, [appointments, appointmentPatente]);


  const editAppointment = useCallback(() => {
    {/*ACA TENGO QUE PONER TODOS LOS ATRIBUTOS*/}
    setEditData({
      lugarRetiro: appointment.alquiler.lugarRetiro || '',
      lugarDevolucion: appointment.alquiler.lugarDevolucion || '',
      fechaRetiro: appointment.alquiler.fechaRetiro || '',
      fechaDevolucion: appointment.alquiler.fechaDevolucion || '',
      precioFinal: appointment.alquiler.precioFinal || '',
      id: appointment.alquiler.id,
      cantidadDias: appointment.alquiler.cantidadDias,
      cliente: appointment.alquiler.cliente,
      car: appointment.alquiler.car
    });
    setTooltipOpen(false);
    setEditPopupOpen(true);
  }, [appointment]);


  const editDatosCliente = useCallback(() => {
    console.log('Ejecutando editDatosCliente');
    console.log('Datos del cliente antes de set:', appointment.alquiler.cliente.nombre);
    setEditDatosC({
      nombre: appointment.alquiler.cliente.nombre || '',
      documento: appointment.alquiler.cliente.documento || '',
      telefono: appointment.alquiler.cliente.telefono || '',
      email: appointment.alquiler.cliente.email || '',
      cantidadDias: appointment.alquiler.cantidadDias,
      car: appointment.alquiler.car,
      lugarRetiro: appointment.alquiler.lugarRetiro || '',
      lugarDevolucion: appointment.alquiler.lugarDevolucion || '',
      fechaRetiro: appointment.alquiler.fechaRetiro || '',
      fechaDevolucion: appointment.alquiler.fechaDevolucion || '',
      precioFinal: appointment.alquiler.precioFinal || ''
    });
    setCustomerPopupOpen(false);  
    setEditCustomerModalOpen(true);  
  },[appointment]); 




  return (
    <>
      <Box>
      <Eventcalendar
        data={appointments}
        showEventTooltip={false}
        view={myView}
        onEventHoverIn={handleEventHoverIn}
        onEventHoverOut={handleEventHoverOut}
        onEventClick={handleEventClick}
        timezonePlugin={momentTimezone}
        dataTimezone='utc'
        displayTimezone='America/Buenos_Aires'

      />

      <Popup
        anchor={tooltipAnchor}
        onClose={() => setTooltipOpen(false)}
        closeOnOverlayClick={true}
        contentPadding={false}
        display="anchored"
        isOpen={isTooltipOpen}
        showOverlay={false}
        touchUi={false}
        width={350}
      >
         <div style={{ height: '100%', width: '100%' }}>
        <div className="mds-tooltip" onMouseEnter={() => { }} onMouseLeave={() => { }}>
          <div className="mds-tooltip-header" style={{ backgroundColor: tooltipColor, padding:2 }}>
            <span style={{marginLeft:'8px'}}>{appointmentInfo}</span>
            {/*<span className="mbsc-pull-right">{appointmentTime}</span> No tiene utilidad*/}
          </div>

          <div className="mbsc-padding">
            <div className="mds-tooltip-label mbsc-margin">
              Fecha retiro: <span className="mbsc-light">{formattedAppointmentTimeR}</span>
            </div>
            <div className="mds-tooltip-label mbsc-margin">
              Fecha Devolucion: <span className="mbsc-light">{formattedAppointmentTimeD}</span>
            </div>
            <div className="mds-tooltip-label mbsc-margin">
              Lugar Retiro: <span className="mbsc-light">{appointmentReason}</span>
            </div>
            <div className="mds-tooltip-label mbsc-margin">
              Lugar Devolucion: <span className="mbsc-light">{appointmentLocation}</span>
            </div>
            
            <div className='mds-tooltip-label mbsc-margin'>
              Saldo pendiente: <span className='mbsc-light'> {saldoP}  </span>
            </div>
            <Button color="secondary" className="mds-tooltip-button" onClick={viewAppointmentFile}>
              Cliente
            </Button>
            <Button
                color="success"
                className="mds-tooltip-button"
                onClick={() => {
                  setTooltipOpen(false);  
                  setAppointmentPago(true);  
                  
                }}
              >
              Pago
            </Button>

            <Button color="primary" className="mds-tooltip-button" onClick={editAppointment}>
              Editar
            </Button>

              <Button color="danger" variant="outline" className="mds-tooltip-button mbsc-pull-right" onClick={handleDeleteClick}>
                Eliminar
              </Button>

          </div>
        </div>

        </div>
      </Popup>




      <Popup
        isOpen={isDeleteConfirmOpen}
        onClose={handleCancelDelete}
        display="center"
        contentPadding={false}
        closeOnOverlayClick={true}
      >
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Confirmación de Eliminación
          </Typography>
          <Typography>
            ¿Estás seguro de que deseas eliminar este elemento?
          </Typography>
          <Box mt={2}>
            <Button color="danger" onClick={handleConfirmDelete}>
              Confirmar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancelDelete} style={{ marginLeft: 8 }}>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Popup>





      <Popup
        isOpen={isCustomerPopupOpen}
        onClose={() => setCustomerPopupOpen(false)}
        display="center"
        contentPadding={false}
        closeOnOverlayClick={true}
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="customer-popup">
          <div
            className="customer-popup-header"
            style={{
              backgroundColor: '#f7f7f7',
              padding: '16px',
              borderBottom: '1px solid #e0e0e0',
              width:350
            }}
          >
            <h2
              style={{
                margin: '0',
                fontSize: '1.25rem',
                color: '#333',
              }}
            >
              Datos del Cliente
            </h2>
          </div>
          <div
            className="customer-popup-body"
            style={{
              padding: '16px',
            }}
          >
            <div
              className="customer-popup-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span
                className="customer-popup-label"
                style={{
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                Nombre:
              </span>
              <span
                className="customer-popup-value"
                style={{
                  color: '#777',
                }}
              >
                {customerData.nombre}
              </span>
            </div>
            <div
              className="customer-popup-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span
                className="customer-popup-label"
                style={{
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                Documento:
              </span>
              <span
                className="customer-popup-value"
                style={{
                  color: '#777',
                }}
              >
                {customerData.documento}
              </span>
            </div>
            <div
              className="customer-popup-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span
                className="customer-popup-label"
                style={{
                  fontWeight: 'bold',
                  color: '#555',}}>Teléfono:</span>
              <span
                className="customer-popup-value"
                style={{
                color: '#777',}}>{customerData.telefono}</span></div>
            <div
              className="customer-popup-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span
                className="customer-popup-label"
                style={{
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                Email:
              </span>
              <span
                className="customer-popup-value"
                style={{
                  color: '#777', 
                }}
              >
                {customerData.email}
              </span>
            </div>
          </div>
          <div
            className="customer-popup-footer"
            style={{
              padding: '16px',
              borderTop: '1px solid #e0e0e0',
              textAlign: 'right',
            }}
          >
            <Button color="primary" className="mds-tooltip-button" onClick={editDatosCliente}>
              Editar datos cliente
            </Button>
            <Button color="secondary" onClick={() => setCustomerPopupOpen(false)}>
              Cerrar
            </Button>
          </div>
        </div>
      </Popup>
      <Toast
        message={toastMessage}
        isOpen={isToastOpen}
        onClose={handleToastClose}
        duration={5000}
      />




      <Modal
        open={isEditPopupOpen}
        onClose={handleCloseEditPopup}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
         <Box
        sx={{
          width: 500,
          height:350,
          padding: 2,
          backgroundColor: 'white',
          position: 'absolute',
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          boxShadow: 24, 
          borderRadius: 1, 
        }}
      >
          <Typography variant="h6" marginBottom={1}>Editar Evento</Typography>
          <Box
          >  
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
              <Box sx={{display: 'flex', gap: 2, mb:2 }}>         
              <Box sx={{display: 'flex'}}>
              <DesktopDateTimePicker
                label="Fecha de Retiro"
                value={editData.fechaRetiro ? new Date(editData.fechaRetiro) : null}
                onChange={(newValue) => setEditData((prevData) => ({ ...prevData, fechaRetiro: newValue }))}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
              </Box>
              <Box sx={{display: 'flex'}}>
              <DesktopDateTimePicker
                label="Fecha de Devolución"
                value={editData.fechaDevolucion ? new Date(editData.fechaDevolucion) : null}
                onChange={(newValue) => setEditData((prevData) => ({ ...prevData, fechaDevolucion: newValue }))}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
              </Box>
              </Box>
            </LocalizationProvider>

            <Autocomplete
        options={lugaresFijos}
        getOptionLabel={(option) => option}
        value={editData.lugarRetiro}
        onChange={(event, newValue) => setEditData((prevData) => ({ ...prevData, lugarRetiro: newValue }))}
        renderInput={(params) => (
          <TextField {...params} label="Lugar de Retiro" margin="normal" fullWidth />
        )}
      />

      {/* Autocomplete para Lugar de Devolución */}
      <Autocomplete
        options={lugaresFijos}
        getOptionLabel={(option) => option}
        value={editData.lugarDevolucion}
        onChange={(event, newValue) => setEditData((prevData) => ({ ...prevData, lugarDevolucion: newValue }))}
        renderInput={(params) => (
          <TextField {...params} label="Lugar de Devolución" margin="normal" fullWidth />
        )}
      />


          </Box>
          <Button  color="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
          <Button  color="secondary" onClick={handleCloseEditPopup}>Cancelar</Button>
        </Box>
      </Modal>


      <Modal
        open={isEditCustomerModalOpen}
        onClose={() => setEditCustomerModalOpen(false)}
      >
  <Box sx={{
          width: 500,
          height:475,
          padding: 2,
          backgroundColor: 'white',
          position: 'absolute',
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          boxShadow: 24, 
          borderRadius: 1, 
        }}>
    <Typography variant="h6" marginBottom={2}>Editar Datos del Cliente</Typography>
    <TextField
      label="Nombre"
      name="nombre"
      value={editDatosC.nombre}
      onChange={handleEditDatosCChange}
      fullWidth
      sx={{padding:2}}
    />
    <TextField
      label="Documento"
      name="documento"
      value={editDatosC.documento}
      onChange={handleEditDatosCChange}
      fullWidth
      sx={{padding:2}}
    />
    <TextField
      label="Teléfono"
      name="telefono"
      value={editDatosC.telefono}
      onChange={handleEditDatosCChange}
      fullWidth
      sx={{padding:2}}
    />
    <TextField
      label="Email"
      name="email"
      value={editDatosC.email}
      onChange={handleEditDatosCChange}
      fullWidth
      sx={{padding:2}}
    />
    <Button color="primary" onClick={handleSaveCustomerChanges}>Guardar</Button>
    <Button color="secondary" onClick={() => setEditCustomerModalOpen(false)}>Cancelar</Button>
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
    <Typography variant="h6" marginBottom={2}  sx={{ borderBottom: '1px solid #e0e0e0' }} >Pago de Saldo</Typography>
    
    <div className="payment-popup-item"
        style={{
          padding: '10px',
        
          
        }}
    >
      <span className="payment-popup-label">Saldo Original:</span>
      <span style={{paddingLeft:'10px'}}>{pagoTotal}</span>
    </div>
    
    <div className="payment-popup-item"
     style={{
      padding: '10px',
      marginBottom:'20px',
     
      
    }}
      >
      <span className="payment-popup-label">Saldo Pendiente:</span>
      <span style={{paddingLeft:'10px'}}>{saldoP}</span>
    </div>


    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, paddingLeft: '10px'}}>
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



    <Box sx={{pading: 20, marginTop:4, paddingLeft: '10px'}}>
      <Button color="primary" onClick={() => handlePago()} style={{ marginRight: 8 }}>
        Realizar Pagos
      </Button>
      <Button color="danger" onClick={() => setAppointmentPago(false)}>
        Cancelar
      </Button>
      <Button color='info' className="mds-tooltip-button mbsc-pull-right" onClick={()=> setAppointmentPago(false)}>
          Historial
      </Button>
    </Box>
   
            
    
    
  </Box>
</Modal>



      
    </Box>




    </>
  );

}

export default AgendaPage;