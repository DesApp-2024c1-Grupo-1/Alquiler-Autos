import { Button, Eventcalendar, formatDate, localeEs, momentTimezone, Popup, setOptions, Toast } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  List, ListItem, ListItemText,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { es } from 'date-fns/locale';
import moment from 'moment-timezone';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import faviconAgenda from '../assets/faviconAgenda.png';
import { BotonPago } from '../components/BotonPago.jsx';
import { lugaresFijos } from "../components/Filtros.jsx";
import { actualizarAlquiler, eliminarAlquiler, getEventos, registrarPago } from '../services/EventosService';
import { getCarAvailabilityByIdExcludingEvents } from "../services/CarsService";
import Swal from 'sweetalert2';
import { formatearDateTime } from '../services/DateHelper';


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
      const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = faviconAgenda;
      document.head.appendChild(favicon);

      return () => {
          favicon.href = '/favicon.ico';
      };
  }, []);

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
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [isTooltipReparacionOpen, setTooltipReparacionOpen] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [tooltipAnchor, setTooltipAnchor] = useState(null);
  const [tooltipColor, setTooltipColor] = useState('');
  const [isCustomerPopupOpen, setCustomerPopupOpen] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(false);
  const scrollableRef = useRef(null);
  const [pagosCargados, setPagosCargados] = useState([]);
  const [appointmentHistorialPago, setAppointmentHistorialPago] = useState([]);
  const [isHistorialModalOpen, setHistorialModalOpen] = useState(false);

  useEffect(() => {
    const fetchEventos = async () => {
      const eventos = await getEventos();
      //Verifica si el evento es de tipo alquiler y si tiene pagos
      const pagos = eventos.reduce((acc, evento) => {
        if (evento.alquiler && evento.alquiler.pagos) {
          return acc.concat(evento.alquiler.pagos);
        }
        return acc;
      }, []);

      setAppointmentHistorialPago(pagos);
    };

    fetchEventos();
  }, []);

  const abrirHistorialModal = () => {
    setHistorialModalOpen(true);
  };

  const cerrarHistorialModal = () => {
    setHistorialModalOpen(false);
  };


  const [appointmentPatente, setAppointmentPatente] = useState('null');
  const [isEditDatosCOpen, setEditDatosCOpen] = useState(false);
  const [isEditCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
  const [pagoTotal, setAppointmentPagoTotal] = useState(false);
  const [saldoP, setAppointmentSaldoP] = useState('');
  const [alquiler, setAlquiler] = useState(null);
  
  const handleCheckboxChange = (event) => {
    setIsTotalChecked(event.target.checked);
    if (event.target.checked) {
      setMontoPago(saldoP);
    } else {
      setMontoPago(0);
    }
  };

  const [appointmentPago, setAppointmentPago] = useState(false);
  const [isTotalChecked, setIsTotalChecked] = useState(false);
  const [montoPago, setMontoPago] = useState('');

  useEffect(() => {
    if (appointmentPago) {
      setMontoPago('');
      setIsTotalChecked(false);

      if (appointment && appointment.alquiler) {
        setAppointmentSaldoP(appointment.alquiler.saldoPendiente);
      }
    }
  }, [appointmentPago, appointment]);

  const handlePago = async () => {
    console.log(appointment);
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
        setAppointments((appointments) =>
          appointments.map((item) =>
            item.alquiler && item.alquiler.id === appointment.alquiler.id
              ? {
                ...item,
                alquiler: {
                  ...item.alquiler,
                  pagos: [...item.alquiler.pagos, response], 
                  saldoPendiente: item.alquiler.saldoPendiente - monto,
                },
              }
              : item
          )
        );
        const nuevoSaldo = saldoP - monto;
        console.log('Saldo pendiente actualizado:', nuevoSaldo); 

        setAppointmentSaldoP(nuevoSaldo);
        setAppointment((prev) => ({
          ...prev,
          alquiler: {
            ...prev.alquiler,
            saldoPendiente: nuevoSaldo,
          },
        }));

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
  
  const cargarPagos = async (pagina) => {
    setCargando(true);
    const itemsPorPagina = 10;
    const inicio = (pagina - 1) * itemsPorPagina;
    const nuevosPagos = appointmentHistorialPago.slice(
      inicio,
      inicio + itemsPorPagina
    );

    setPagosCargados((prev) => [...prev, ...nuevosPagos]);
    setCargando(false);
  };

  useEffect(() => {
    if (isHistorialModalOpen) {
      setPagosCargados([]);
      setPaginaActual(1);
      cargarPagos(1);
    }
  }, [isHistorialModalOpen]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollHeight - scrollTop === clientHeight && !cargando) {
      setPaginaActual((prevPagina) => prevPagina + 1);
    }
  };

  useEffect(() => {
    if (paginaActual > 1) {
      cargarPagos(paginaActual);
    }
  }, [paginaActual]);


 


  const handleEditDatosCChange = (e) => {
    const { name, value } = e.target;
    setEditDatosC((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleSaveCustomerChanges = async () => {
    console.log('Evento completo', appointment);
    console.log('Guardar cambios del cliente', editDatosC);
    console.log('ID de Alquiler.cliente.id: ', appointment.alquiler.cliente.id);

    const alquilerModificado = {
      ...appointment.alquiler,
      cliente: {
        ...appointment.alquiler.cliente,
        ...editDatosC,
      },
    };

    try {
      const updateAlquiler = await actualizarAlquiler(appointment.alquiler.id, alquilerModificado);
      setAppointments((appointments) =>
        appointments.map((item) =>
          item.alquiler && item.alquiler.id === updateAlquiler.id ? { ...item, alquiler: updateAlquiler } : item
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
        appointments.filter((item) => item.alquiler && item.alquiler.id !== appointment.alquiler.id || item.alquiler === null)
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

  const calcularPrecioFinal = (cantidadDias, precio) => {
    const nuevoPrecio = cantidadDias * precio;
    
    return nuevoPrecio
  }



  const handleSaveChanges = async () => {

    if (appointment?.alquiler?.car !== null) {
      const carId = appointment.alquiler.car.id;
      const filtros = {
        fechaRetiro: new Date(editData.fechaRetiro),
        fechaDevolucion: new Date(editData.fechaDevolucion),
      };

      try {
        const availability = await getCarAvailabilityByIdExcludingEvents(carId, filtros,appointment?.alquiler?.id);

        if (availability.available) {
          const isLugarRetiroValid = editData.lugarRetiro.trim().length > 0;
          const isLugarDevolucionValid = editData.lugarDevolucion.trim().length > 0;

          if (!isLugarRetiroValid || !isLugarDevolucionValid) {
            setEditData((prevData) => ({
              ...prevData,
              lugarRetiro: prevData.lugarRetiro.trim(),
              lugarDevolucion: prevData.lugarDevolucion.trim(),
            }));
            return;
          }

          const cantidadDias = calcularCantidadDias(editData.fechaRetiro, editData.fechaDevolucion);
          const precioFinal = calcularPrecioFinal(cantidadDias, editData.car.price);

          const alquilerModificado = {
            ...editData,
            cantidadDias,
            precioFinal,
          };

          console.log('Guardar cambios', alquilerModificado);

          try {
            const updateAlquiler = await actualizarAlquiler(appointment.alquiler.id, alquilerModificado);
            setAppointments((prevAppointments) => {
              return prevAppointments.map((item) =>
                item.id === updateAlquiler.id ? { ...item, alquiler: updateAlquiler } : item
              );
            });
            fetchAllEvents();
            setEditPopupOpen(false);
            Swal.fire({
              title: "Alquiler actualizado",
              text: "El alquiler fue modificado correctamente",
              icon: "success"
            });
          } catch (error) {
            console.error('Hubo un error al actualizar el alquiler:', error);
            Swal.fire({
              icon: "error",
              title: "Hubo un error al actualizar el alquiler",
              text: "Hubo un error al actualizar el alquiler",
            });
          }
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

  const handleCloseEditPopup = () => {
    setEditPopupOpen(false);
  };

  const [editData, setEditData] = useState({

    lugarRetiro: '',
    lugarDevolucion: '',
    fechaRetiro: '',
    fechaDevolucion: '',
    cantidadDias: 0
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
    setAppointment(event);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    //Si el evento es un alquiler setea las variables y abre el tooltip de alquiler
    if(event.alquiler){

      //TODO: Esto se puede simplificar llamando en el popup a appointment en lugar de tener una variable por atributo, mirar el popup de EventoReparacion

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
      setAppointmentHistorialPago(event.alquiler.pagos);
      
      const fechaRetiro = event.alquiler.fechaRetiro;
      const fechaDevolucion = event.alquiler.fechaDevolucion;
    
      setAppointmentTimeR(fechaRetiro ? moment(fechaRetiro).format('DD MMM YYYY HH:mm') : 'N/A');
      setAppointmentTimeD(fechaDevolucion ? moment(fechaDevolucion).format('DD MMM YYYY HH:mm') : 'N/A');


    //Si el evento es una reparacion abre el tooltip de reparacion, no setear variables usa las de appointment
  } else if (event.reparacion) {
    setTooltipReparacionOpen(true);   
    setTooltipAnchor(args.domEvent.target); 
  }
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
  
  const AlquilerList = ({ appointments, onEdit, onDelete }) => {
    return (
      <div>
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            <p>{appointment.lugarRetiro} - {appointment.lugarDevolucion}</p>
            <p>{appointment.fechaRetiro} - {appointment.fechaDevolucion}</p>
            <button onClick={() => onEdit(appointment)}>Editar</button>
            <button onClick={() => onDelete(appointment.alquiler.car.patente)}>Eliminar</button>
          </div>
        ))}
      </div>
    );
  };
  

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
          onClose={() => setTooltipOpen(false)}
          closeOnOverlayClick={true}
          contentPadding={false}
          display="anchored"
          onOpen={() => setTooltipReparacionOpen(false)}
          isOpen={isTooltipOpen}
          showOverlay={false}
          touchUi={false}
          width={350}
        >
          <div style={{ height: '100%', width: '100%' }}>
            <div className="mds-tooltip" onMouseEnter={() => { }} onMouseLeave={() => { }}>
              <div className="mds-tooltip-header" style={{ backgroundColor: tooltipColor, padding: 2 }}>
                <span style={{ marginLeft: '8px' }}>{appointmentInfo}</span>
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
                  Monto pendiente: <span className='mbsc-light'> {saldoP}  </span>
                </div>

                <Button color="secondary" className="mds-tooltip-button" onClick={viewAppointmentFile}>Cliente</Button>
                <BotonPago setTooltipOpen={setTooltipOpen} setAppointmentPago={setAppointmentPago}></BotonPago>
                <Button color="primary" className="mds-tooltip-button" onClick={editAppointment}>Editar</Button>
                <Button color="danger" variant="outline" className="mds-tooltip-button mbsc-pull-right" onClick={handleDeleteClick}>Eliminar</Button>

              </div>
            </div>

          </div>
        </Popup>

      <Popup
        anchor={tooltipAnchor}
        onClose={() => setTooltipReparacionOpen(false)}
        closeOnOverlayClick={true}
        contentPadding={false}
        display="anchored"
        onOpen={() => setTooltipOpen(false)}
        isOpen={isTooltipReparacionOpen}
        showOverlay={false}
        touchUi={false}
        width={350}
      >
          <div style={{ height: '100%', width: '100%' }}>
            <div className="mds-tooltip" onMouseEnter={() => { }} onMouseLeave={() => { }}>
              <div className="mds-tooltip-header" style={{ backgroundColor: appointment?.color, padding: 2 }}>
                <span style={{ marginLeft: '8px' }}>{appointment?.momento + " " + appointment?.reparacion?.car?.patente}</span>
              </div>

              <div className="mbsc-padding">
                <div className="mds-tooltip-label mbsc-margin">
                  Fecha ingreso: <span className="mbsc-light">{appointment?.reparacion?.fechaInicio ? moment(appointment?.reparacion?.fechaInicio).format('DD MMM YYYY HH:mm') : 'N/A'}</span>
                </div>
                <div className="mds-tooltip-label mbsc-margin">
                  Fecha salida: <span className="mbsc-light">{appointment?.reparacion?.fechaFin ? moment(appointment?.reparacion?.fechaFin).format('DD MMM YYYY HH:mm') : 'N/A'}</span>
                </div>

                <div className="mds-tooltip-label mbsc-margin">
                  Auto: <span className="mbsc-light">{appointment?.reparacion?.car?.brand + " " + appointment?.reparacion?.car?.name}</span>
                </div>

                <div className="mds-tooltip-label mbsc-margin">
                  Razon: <span className="mbsc-light">{appointment?.reparacion?.razon}</span>
                </div>

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
                width: 350
              }}
            >
              <h2
                style={{
                  margin: '0',
                  fontSize: '1.25rem',
                  color: '#333',
                }}
              >Datos del Cliente
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
                    color: '#555',
                  }}>Teléfono:</span>
                <span
                  className="customer-popup-value"
                  style={{
                    color: '#777',
                  }}>{customerData.telefono}</span></div>
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
          style={{ zIndex: 1000 }}
        >
          <Box
            sx={{
              width: 500,
              height: 380,
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
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex' }}>
                    <MobileDateTimePicker
                      label="Fecha de Retiro"
                      value={editData.fechaRetiro ? new Date(editData.fechaRetiro) : null}
                      onChange={(newValue) => setEditData((prevData) => ({ ...prevData, fechaRetiro: newValue }))}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                      minutesStep={30}
                    />
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <MobileDateTimePicker
                      label="Fecha de Devolución"
                      value={editData.fechaDevolucion ? new Date(editData.fechaDevolucion) : null}
                      onChange={(newValue) => setEditData((prevData) => ({ ...prevData, fechaDevolucion: newValue }))}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                      minutesStep={30}
                    />
                  </Box>
                </Box>
              </LocalizationProvider>
              
              <Autocomplete
                options={lugaresFijos}
                getOptionLabel={(option) => option}
                value={editData.lugarRetiro}
                onInputChange={(event, newInputValue) => {
                  const filteredInput = newInputValue.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/g, '');
                  setEditData((prevData) => ({ ...prevData, lugarRetiro: filteredInput }));
                }}
                onChange={(event, newValue) =>
                  setEditData((prevData) => ({ ...prevData, lugarRetiro: newValue || "" }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lugar de Retiro"
                    margin="normal"
                    fullWidth
                    error={editData.lugarRetiro.trim().length === 0}
                    helperText={
                      editData.lugarRetiro.trim().length === 0
                        ? "El lugar de retiro es obligatorio"
                        : ""
                    }
                    inputProps={{
                      ...params.inputProps,
                      onKeyPress: (event) => {
                        //Bloquea cualquier tecla que no sea letra, número, tilde o espacio
                        if (/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/.test(event.key) || event.key === '+') {
                          event.preventDefault();
                        }
                      },
                    }}
                  />
                )}
              />

              <Autocomplete
                options={lugaresFijos}
                getOptionLabel={(option) => option}
                value={editData.lugarDevolucion}
                onInputChange={(event, newInputValue) => {
                  //Filtra los caracteres permitidos (letras, números, tildes, espacios)
                  const filteredInput = newInputValue.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/g, '');
                  setEditData((prevData) => ({ ...prevData, lugarDevolucion: filteredInput }));
                }}
                onChange={(event, newValue) =>
                  setEditData((prevData) => ({ ...prevData, lugarDevolucion: newValue || "" }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lugar de Devolución"
                    margin="normal"
                    fullWidth
                    error={editData.lugarDevolucion.trim().length === 0}
                    helperText={
                      editData.lugarDevolucion.trim().length === 0
                        ? "El lugar de devolución no puede estar vacío"
                        : "" 
                    }
                    inputProps={{
                      ...params.inputProps,
                      onKeyPress: (event) => {
                        
                        if (/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ´ ]/.test(event.key) || event.key === '+') {
                          event.preventDefault();
                        }
                      },
                    }}
                  />
                )}
              />
            </Box>
            <Button color="primary" onClick={handleSaveChanges}>Guardar cambios</Button>
            <Button color="secondary" onClick={handleCloseEditPopup}>Cancelar</Button>
          </Box>
        </Modal>


        <Modal
          open={isEditCustomerModalOpen}
          onClose={() => setEditCustomerModalOpen(false)}
        >
          <Box sx={{
            width: 500,
            height: 530,
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
              onChange={(e) => {
                const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ´ ]*$/; //Solo letras, espacios y tildes
                if (regex.test(e.target.value)) {
                  handleEditDatosCChange(e);
                }
              }}
              fullWidth
              sx={{ padding: 2 }}
              error={editDatosC.nombre.length === 0 || editDatosC.nombre.length < 4} //Error si está vacío o tiene menos de 4 caracteres
              helperText={
                editDatosC.nombre.length === 0
                  ? "El nombre no puede estar vacío"
                  : editDatosC.nombre.length < 4
                  ? "El nombre debe tener al menos 4 caracteres"
                  : ""
              }
              autoComplete="off"
            />
            <TextField
              label="Documento"
              name="documento"
              value={editDatosC.documento}
              onChange={(e) => {
                const regex = /^[a-zA-Z0-9]*$/; //Permitir solo números y letras
                if (regex.test(e.target.value)) {
                  handleEditDatosCChange(e);
                }
              }}
              fullWidth
              sx={{ padding: 2 }}
              error={editDatosC.documento.length === 0 || (editDatosC.documento.length > 0 && editDatosC.documento.length < 7)} //Error si está vacío o tiene menos de 7 caracteres
              helperText={
                editDatosC.documento.length === 0
                  ? "El documento no puede estar vacío"
                  : editDatosC.documento.length < 7
                  ? "El documento debe tener al menos 7 caracteres"
                  : ""
              }
              autoComplete="off"
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={editDatosC.telefono}
              onChange={(e) => {
                const regex = /^[0-9+]*$/; //Solo números y el símbolo "+"
                if (regex.test(e.target.value)) {
                  handleEditDatosCChange(e);
                }
              }}
              fullWidth
              sx={{ padding: 2 }}
              error={!editDatosC.telefono || editDatosC.telefono.replace(/\D/g, '').length < 7} //Error si está vacío o tiene menos de 7 números
              helperText={
                !editDatosC.telefono
                  ? "El número de teléfono no puede estar vacío"
                  : editDatosC.telefono.replace(/\D/g, '').length < 7
                  ? "El número de teléfono debe tener al menos 7 caracteres"
                  : ""
              }
              autoComplete="off" 
            />
            <TextField
              label="Email"
              name="email"
              value={editDatosC.email}
              onChange={handleEditDatosCChange}
              fullWidth
              sx={{ padding: 2 }}
              autoComplete="off"
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
            <Typography variant="h6" marginBottom={2} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              Pago de Saldo
            </Typography>

            <div className="payment-popup-item" style={{ padding: '10px' }}>
              <span className="payment-popup-label">Precio final:</span>
              <span style={{ paddingLeft: '10px' }}>{pagoTotal}</span>
            </div>

            <div className="payment-popup-item" style={{ padding: '10px', marginBottom: '20px' }}>
              <span className="payment-popup-label">Monto pendiente:</span>
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
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
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
        <Box
          sx={{
            width: 400,
            padding: 2,
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" marginBottom={2}>
            Historial de Pagos
          </Typography>
          <List
            sx={{
              maxHeight: 300,
              overflowY: "auto",
            }}
            onScroll={handleScroll}
            ref={scrollableRef}
          >
            {pagosCargados.length > 0 ? (
              pagosCargados.map((pago, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`Monto: ${pago.monto} pesos, Fecha: ${new Date(pago.fecha).toLocaleDateString()}`}/></ListItem>))) : (
              <Typography>No hay pagos registrados.</Typography>
            )}
          </List>
          <Button color="secondary" onClick={cerrarHistorialModal}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Box>
    </>
  );

}

export default AgendaPage;