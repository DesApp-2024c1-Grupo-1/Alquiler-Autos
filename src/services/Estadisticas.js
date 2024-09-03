import axios from 'axios'

const url = 'http://localhost:3000/alquiler';


export async function getAllAlquileres() {
    try {
      const response = await axios.get(url+id);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
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
    console.log(car)
    return diferenciaEnDias(car) <= 30;
}