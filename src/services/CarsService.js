import axios from 'axios'

const url = import.meta.env.VITE_API_URL;

export async function getCarById(id){
  try {
    const response = await axios.get(url+ "/car/" + id);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

  export const getAllCarsAvailable = async(filtros) =>{
      try {
        const response = await axios.post(url + '/car/available', filtros);
        console.log("Autos filtrados y disponibles: ",response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    export const getCarAvailabilityById = async (id, filtros) => {
      try {
          const response = await axios.post(`${url}/car/${id}/available`, filtros);
          console.log("Disponibilidad del auto:", response.data);
          return response.data;
      } catch (error) {
          console.error("Error al verificar la disponibilidad del auto:", error);
          throw error;
      }
    }

    export const getCarAvailabilityByIdExcludingEvents = async (id, filtros,idAlquiler) => {
      try {
          console.log(`${url}/car/${id}/available/excludingEvents/alquiler/${idAlquiler}`)
          console.log("Test: ", id, filtros, idAlquiler)
          const response = await axios.post(`${url}/car/${id}/available/excludingEvents/alquiler/${idAlquiler}`, filtros);
          console.log("Disponibilidad del auto:", response.data);
          return response.data;
      } catch (error) {
          console.error("Error al verificar la disponibilidad del auto:", error);
          throw error;
      }
    }

    export const postCar = async(car) =>{
      try {
        const response = await axios.post(url + "/car", car);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    export const putCar = async(car) =>{
      try {
        console.log("ID:",car.id)
        const response = await axios.put(url+ "/car/" + car.id, car);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    export const deleteCarById = async(id) =>{
      try {
        const response = await axios.delete(url +"/car/" + id);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

