import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Button, Eventcalendar, formatDate, Popup, setOptions, Toast, localeEs } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { momentTimezone } from '@mobiscroll/react';
import moment from 'moment-timezone';
import { getEventos } from '../services/EventosService';
import { set } from 'lodash';

setOptions({
  locale: localeEs,
  theme: 'ios',
  themeVariant: 'light'
});


/*Ver si eliminar boton confirm/cancel, que cambia el estado.
  Ver si prefieren que vuelva a aparecer cuando se devuelve, o solo que aparezca una vez.
*/
/*
let eventosFake = [
  {
    title: 'PRUEBA',
    nombreYApellido: 'Jesus Albornoz',
    age: 68,
    start: '2024-07-04T08:00',
    end: '2024-07-05T08:45',
    confirmed: false,
    lugarRetiro: 'Calle Falsa 123, Hurlingham',
    lugarDevolucion: 'Calle Verdadera 456, Hurlingham',
    color: '#00ff00',
  },
  {
    title: 'PRUEBA',
    nombreYApellido: 'Pedro Saborido',
    age: 44,
    start: '2024-07-06T09:00',
    end: '2024-07-08T09:45',
    confirmed: false,
    lugarRetiro: 'Mazza 1780, Moron',
    lugarDevolucion: 'Pola 2600, Moron',
    color: '#ff0000',
  },
  {
    title: 'PRUEBA',
    nombreYApellido: 'Juan Cruz Mendoza',
    age: 29,
    start: '2024-07-09T10:00',
    end: '2024-07-10T10:45',
    confirmed: true,
    lugarRetiro: 'Libertad 3100, Moron',
    lugarDevolucion: 'Paz 1800, Hurlingham',
    color: '#b33d3d',
  },
  {
    title: 'PRUEBA',
    nombreYApellido: 'Juan Maldonado',
    age: 72,
    start: '2024-07-11T13:00',
    end: '2024-07-14T13:45',
    confirmed: false,
    lugarRetiro: 'Avenida Siempre Viva 600, Haedo',
    lugarDevolucion: 'Avenida de los libertadores 300, Haedo',
    color: '#b33d3d',
  },
  {
    title: 'PRUEBA',
    nombreYApellido: 'Juan Maldonado',
    age: 65,
    start: '2024-07-15T10:00',
    end: '2024-07-15T14:45',
    confirmed: true,
    lugarRetiro: 'Avenida Pierrastegui 4100, Moron',
    lugarDevolucion: 'Juana Azurduy 1680, Hurlingham',
    color: '#b33d3d',
  },
  {
    title: 'PRUEBA',
    nombreYApellido: 'Juan Maldonado',
    age: 54,
    start: '2024-07-16T10:00',
    end: '2024-07-17T10:45',
    confirmed: true,
    lugarRetiro: '25 de Mayo 1470, Moron',
    lugarDevolucion: 'Procare 2500, Hurlingham ',
    color: '#309346',
  },
  {
    title: 'PRUEBA',
    nombreYApellido: 'Pedro Rosemblant',
    age: 59,
    start: '2024-07-18T11:00',
    end: '2024-07-23T11:45',
    confirmed: true,
    lugarRetiro: 'Avenida Eva Peron 1790, Moron',
    lugarDevolucion: 'Avenida Independencia, Hurlingham',
    color: '#309346',
  },
];
*/

momentTimezone.moment = moment;

function AgendaPage() {

  const [appointments, setAppointments] = useState([])

  const fetchAllEvents = useCallback(async () => {
    //Descomentar para usar la Base de Datos
    const obtainedEvents = await getEventos();
    //const obtainedEvents = eventosFake;
 
  console.log('Eventos obtenidos:', obtainedEvents); // Verificar los datos aquí

    setAppointments(obtainedEvents); 
  }, []);

  useEffect(() => {
    fetchAllEvents()
  }, [fetchAllEvents]);

  const [appointment, setAppointment] = useState();
  const [appointmentInfo, setAppointmentInfo] = useState('');
  const [appointmentLocation, setAppointmentLocation] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('Reservado');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonType, setButtonType] = useState('');
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [tooltipAnchor, setTooltipAnchor] = useState(null);
  const [tooltipColor, setTooltipColor] = useState('');




  const timer = useRef(null);

  const myView = useMemo(() => ({ agenda: { type: 'day' } }), []);


  const openTooltip = useCallback((args) => {
    const event = args.event;
    const time = formatDate(new Date(event.start)) + ' - ' + formatDate(new Date(event.end));
    console.log('Event Data:', event); // Verifica los datos del evento

    if (timer.current) {
      clearTimeout(timer.current);
    }
    /*
    if (event.confirmed) {
      setAppointmentStatus('Reservado');
      setButtonText('Cancelar cita');
      setButtonType('warning');
    } else {
      setAppointmentStatus('Devuelto');
      setButtonText('Confirmar cita');
      setButtonType('success');
    }
      

        // Forzamos el estado a "Reservado"
        setAppointmentStatus('Reservado');
      }, []);
    */

    setAppointment(event);
    setAppointmentInfo(event.data?.cliente?.nombre);
    setAppointmentLocation(event.data?.lugarDevolucion);
    setAppointmentTime(time);
    setAppointmentReason(  event.data?.lugarRetiro );
    setTooltipColor(event.color);
    setTooltipAnchor(args.domEvent.target);
    setTooltipOpen(true);
  }, []);

  const handleEventClick = useCallback(
    (args) => {
      openTooltip(args);
    },
    [openTooltip],
  );

  const viewAppointmentFile = useCallback(() => {
    // Aquí puedes agregar la lógica para mostrar más datos del cliente.
    setTooltipOpen(false);
    setToastMessage(`Datos del cliente: ${appointment.data?.cliente?.nombre}, DNI: ${appointment.data?.cliente?.documento}`);
    setToastOpen(true);
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



  /* Este const sirve para cuando yo hago click sobre eliminar*/
  const deleteAppointment = useCallback(() => {
    setAppointments(appointments.filter((item) => item.id !== appointment.id));
    setTooltipOpen(false);
    setToastMessage('Auto eliminado de agenda');
    setToastOpen(true);
  }, [appointments, appointment]);

  return (
    <>
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
        <div className="mds-tooltip" onMouseEnter={() => {}} onMouseLeave={() => {}}>
          <div className="mds-tooltip-header" style={{ backgroundColor: tooltipColor }}>
            <span>{appointmentInfo}</span>
            <span className="mbsc-pull-right">{appointmentTime}</span>
          </div>
          <div className="mbsc-padding">
            <div className="mds-tooltip-label mbsc-margin">
              Estado: <span className="mbsc-light">{appointmentStatus}</span>
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
            <Button color="danger" variant="outline" className="mds-tooltip-button mbsc-pull-right" onClick={() => {}}>
              Eliminar
            </Button>
          </div>
        </div>
      </Popup>
      <Toast
        message={toastMessage}
        isOpen={isToastOpen}
        onClose={() => setToastOpen(false)}
        duration={5000} // La duración en milisegundos que quieres que el toast esté visible
      />
    </>
  );
}

export default AgendaPage;