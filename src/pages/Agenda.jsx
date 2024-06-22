import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, setOptions, Toast, localeEs } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

setOptions({
  locale: localeEs,
  theme: 'ios',
  themeVariant: 'light'
});

function App() {

 
let eventosDePrueba = [
  {
    "start": "2024-06-25T10:00:00.000Z",
    "end": "2024-06-25T10:15:00.000Z",
    "text": "Alquiler: entrega AHC143",
    "color": "#ff0000"
  },
  {
    "start": "2024-06-25T14:00:00.000Z",
    "end": "2024-06-25T14:15:00.000Z",
    "text": "Alquiler: entrega DEF456",
    "color": "#ff0000"
  },
  {
    "start": "2024-06-26T12:00:00.000Z",
    "end": "2024-06-26T12:15:00.000Z",
    "text": "Alquiler: devolución DEF456",
    "color": "#00ff00"
  },
  {
    "start": "2024-06-27T10:00:00.000Z",
    "end": "2024-06-27T10:15:00.000Z",
    "text": "Alquiler: entrega JKL012",
    "color": "#ff0000"
  },
  {
    "start": "2024-06-27T14:00:00.000Z",
    "end": "2024-06-27T14:15:00.000Z",
    "text": "Alquiler: devolución AHC143",
    "color": "#00ff00"
  },
  {
    "start": "2024-06-28T16:00:00.000Z",
    "end": "2024-06-28T16:15:00.000Z",
    "text": "Alquiler: entrega MNO345",
    "color": "#ff0000"
  },
  {
    "start": "2024-06-29T10:00:00.000Z",
    "end": "2024-06-29T10:15:00.000Z",
    "text": "Alquiler: devolución JKL012",
    "color": "#00ff00"
  },
  {
    "start": "2024-06-29T18:00:00.000Z",
    "end": "2024-06-29T18:15:00.000Z",
    "text": "Alquiler: entrega STU901",
    "color": "#ff0000"
  },
  {
    "start": "2024-06-30T14:00:00.000Z",
    "end": "2024-06-30T14:15:00.000Z",
    "text": "Alquiler: devolución MNO345",
    "color": "#00ff00"
  },
  {
    "start": "2024-06-30T20:00:00.000Z",
    "end": "2024-06-30T20:15:00.000Z",
    "text": "Alquiler: entrega PQR678",
    "color": "#ff0000"
  },
  {
    "start": "2024-07-01T10:00:00.000Z",
    "end": "2024-07-01T10:15:00.000Z",
    "text": "Alquiler: devolución STU901",
    "color": "#00ff00"
  }
]

  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCloseToast = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((args) => {
    setToastMessage(args.event.title);
    setToastOpen(true);
  }, []);

  const myView = useMemo(
    () => ({
      calendar: { type: 'week' },
      agenda: { type: 'day' },
    }),
    [],
  );

  

  useEffect(() => {
    getJson
        setEvents(eventosDePrueba);
  },[]);

  return (
    <>
     <Eventcalendar
  data={myEvents}
  view={myView}
  onEventClick={handleEventClick}
  theme="ios" // Personaliza el tema (opcional)
  themeVariant="light" // Personaliza la variante del tema (opcional)
/>


      <Toast message={toastMessage} isOpen={isToastOpen} onClose={handleCloseToast} />
    </>
  );
}

export default App;