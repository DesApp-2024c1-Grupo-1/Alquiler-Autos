import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Button, Eventcalendar, formatDate, Popup, setOptions, Toast, localeEs } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { momentTimezone } from '@mobiscroll/react';
import moment from 'moment-timezone';
import { getEventos } from '../services/EventosService';
import { set } from 'lodash';
import { enGB } from 'date-fns/locale';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Box, Card, CardMedia, Grid, Stack, Typography, TextField, OutlinedInput,
  InputLabel, InputAdornment, FormControl, Modal
} from "@mui/material";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { Portal } from '@mui/material';




setOptions({
  locale: localeEs,
  theme: 'ios',
  themeVariant: 'light'
});


momentTimezone.moment = moment;

function AgendaPage() {

  const [appointments, setAppointments] = useState([])

  const fetchAllEvents = useCallback(async () => {
    //Descomentar para usar la Base de Datos
    const obtainedEvents = await getEventos();
    //obtainedEvents = obtainedEvents.map(e =>{  e.end = null})

    //const obtainedEvents = eventosFake;


    console.log('Eventos obtenidos:', obtainedEvents); // Verificar los datos aquí

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


  const handleEditClick = () => {
    setEditPopupOpen(true);
  };

  const handleEditDataChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = () => {
    // Aquí deberías hacer la lógica para guardar los cambios en el servidor o en el estado
    console.log('Guardar cambios', editData);
    setEditPopupOpen(false);
  };

  const handleCloseEditPopup = () => {
    setEditPopupOpen(false);
  };

  const [editData, setEditData] = useState({
    lugarRetiro: '',
    lugarDevolucion: '',
    fechaRetiro: '',
    fechaDevolucion: ''
  });




  const timer = useRef(null);

  const myView = useMemo(() => ({ agenda: { type: 'day' } }), []);


  const openTooltip = useCallback((args) => {
    const event = args.event;
    const time = formatDate(new Date(event.start)) + ' - ' + formatDate(new Date(event.end));
    console.log('Event Data:', event); // Verifica los datos del evento

    if (timer.current) {
      clearTimeout(timer.current);
    }

    setAppointment(event);
    setAppointmentInfo(event.data?.cliente?.nombre);
    setAppointmentLocation(event.data?.lugarDevolucion);
    setAppointmentTime(time);
    setAppointmentReason(event.data?.lugarRetiro);
    setTooltipColor(event.color);
    setTooltipAnchor(args.domEvent.target);
    setTooltipOpen(true);
    setAppointmentTimeR(event.data?.fechaRetiro)
    setAppointmentTimeD(event.data?.fechaDevolucion)


    const fechaRetiro = event.data?.fechaRetiro;
    const fechaDevolucion = event.data?.fechaDevolucion;

    console.log('Fecha Retiro:', fechaRetiro);
    console.log('Fecha Devolucion:', fechaDevolucion);

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
    setCustomerData(appointment.data?.cliente);
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



  const handleMouseEnter = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    timer.current = setTimeout(() => {
      setTooltipOpen(false);
    }, 200);
  }, []);

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  /*Este const sirve para cuando yo hago click sobre el cancelar*/
  const updateAppointmentStatus = useCallback(() => {
    appointment.confirmed = !appointment.confirmed;
    setTooltipOpen(false);
    setToastMessage('Auto ' + (appointment.confirmed ? 'confirmado' : 'cancelado'));
    setToastOpen(true);
  }, [appointment]);

  const formattedAppointmentTimeR = appointmentTimeR ? moment(appointmentTimeR).format('DD MMM YYYY HH:mm') : 'N/A';
  const formattedAppointmentTimeD = appointmentTimeD ? moment(appointmentTimeD).format('DD MMM YYYY HH:mm') : 'N/A';


  const deleteAppointment = useCallback(() => {
    {/*Para delete*/ }
    setAppointments(appointments.filter((item) => item.id !== appointment.id));
    setTooltipOpen(false);
    setToastMessage('Cita eliminada');
    setToastOpen(true);
  }, [appointments, appointment]);


  const editAppointment = useCallback(() => {
    setEditData({
      lugarRetiro: appointment.data?.lugarRetiro || '',
      lugarDevolucion: appointment.data?.lugarDevolucion || '',
      fechaRetiro: appointment.data?.fechaRetiro || '',
      fechaDevolucion: appointment.data?.fechaDevolucion || ''
    });
    setTooltipOpen(false);
    setEditPopupOpen(true);
  }, [appointment]);




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
        closeOnOverlayClick={false}
        contentPadding={false}
        display="anchored"
        isOpen={isTooltipOpen}
        showOverlay={false}
        touchUi={false}
        width={350}
      >
         <div style={{ backgroundColor: 'red', height: '100%', width: '100%' }}>
        <div className="mds-tooltip" onMouseEnter={() => { }} onMouseLeave={() => { }}>
          <div className="mds-tooltip-header" style={{ backgroundColor: tooltipColor }}>
            <span>{appointmentInfo}</span>
            <span className="mbsc-pull-right">{appointmentTime}</span>
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
            <Button color="secondary" className="mds-tooltip-button" onClick={viewAppointmentFile}>
              Datos de Cliente
            </Button>
            <Button color="primary" className="mds-tooltip-button" onClick={editAppointment}>
              Editar
            </Button>

            <Button color="danger" variant="outline" className="mds-tooltip-button mbsc-pull-right" onClick={deleteAppointment}>
              Eliminar
            </Button>

          </div>
        </div>

        </div>
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
          height:400,
          padding: 2,
          backgroundColor: 'white',
          position: 'absolute',
          top: '50%', // Centra verticalmente
          left: '50%', // Centra horizontalmente
          transform: 'translate(-50%, -50%)', // Ajusta para centrar en ambas direcciones
          boxShadow: 24, // Sombra opcional
          borderRadius: 1, // Esquinas redondeadas opcional
        }}
      >
          <Typography variant="h6" >Editar Evento</Typography>
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

            <TextField
              label="Lugar de Retiro"
              name="lugarRetiro"
              value={editData.lugarRetiro}
              onChange={handleEditDataChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Lugar de Devolución"
              name="lugarDevolucion"
              value={editData.lugarDevolucion}
              onChange={handleEditDataChange}
              fullWidth
              margin="normal"
            />
          </Box>
          <Button variant="contained"  sx={{ backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }} onClick={handleSaveChanges}>Guardar Cambios</Button>
          <Button variant="outlined" color="secondary" onClick={handleCloseEditPopup}>Cancelar</Button>
        </Box>
      </Modal>
    </Box>

    </>
  );

}

export default AgendaPage;