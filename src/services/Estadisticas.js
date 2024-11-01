import axios from 'axios'

const url = import.meta.env.VITE_API_URL;

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