import axios from 'axios'

const url = 'http://localhost:3000/alquiler';

//Modifico la URL para que haga la solicitud a la lista completa de alquileres.
export async function getAllAlquileres() {
    try {
      const response = await axios.get(url); //Petición a la URL correcta.
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return []; //Devuelve un array vacío en caso de error.
    }
};

//Funcion que maneja la obtención y el estado de los alquileres.
export function useFetchAlquileres() {
  const [allAlquileres, setAllAlquileres] = useState([]);

  const fetchAllAlquileres = useCallback(async () => {
      try {
          const alquileres = await getAllAlquileres(); //Llama a la función que obtiene los alquileres.
          console.log("Alquileres obtenidos:", alquileres);
          setAllAlquileres(alquileres);
      } catch (error) {
          console.error("Error fetching alquileres:", error);
      }
  }, []);

  useEffect(() => {
      fetchAllAlquileres(); //Llamada para obtener los alquileres cuando se monta el componente.
  }, [fetchAllAlquileres]);

  return allAlquileres; //Devuelve el estado de los alquileres.
}


  //función que espera una fecha para calcular hace cuantos días fue
  //comparando fechaActual con fecha de lanzamiento de el auto
  export function diferenciaEnDias(car) {
    const fechaActual = new Date();
    const fechaLanzamiento = new Date(car); // Convertir a Date

    const diferenciaEnMilisegundos = fechaActual.getTime() - fechaLanzamiento.getTime();

    // Convertir la diferencia a días
    const dias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

    return dias;
}

//función que espera una fecha y si la misma tiene una diferencia mayor a 30 días con la actual devuelve false

export function esNuevo(car) {
    // console.log(car)
    return diferenciaEnDias(car) <= 30;
}