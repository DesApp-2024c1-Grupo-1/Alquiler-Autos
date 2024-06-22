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
    "start": "2024-06-22T06:00:00.000Z",
    "end": "2024-06-22T07:00:00.000Z",
    "text": "PATENTE JMD 870",
    "color": "#f67944"
  },
  {
    "start": "2024-06-23T06:00:00.000Z",
    "end": "2024-06-23T06:15:00.000Z",
    "text": "Green box to post office",
    "color": "#6e7f29"
  },
];

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