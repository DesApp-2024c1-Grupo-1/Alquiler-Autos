import axios from 'axios'

const url = import.meta.env.VITE_API_URL;


export async function getCarById(id){
  try {
    const response = await axios.get(url+id);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Obtiene todos los autos filtrados
export const getAllCarsAxios = async(filtros) =>{
    try {
      const response = await axios.get(url, {params: filtros});
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  //Obtiene todos los autos filtrados y que no tienen un alquiler vigende
  export const getAllCarsAvailable = async(filtros) =>{
      try {
        const response = await axios.post(url + 'available', filtros);
        console.log("Autos filtrados y disponibles: ",response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    export const postCar = async(car) =>{
      try {
        const response = await axios.post(url, car);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    export const putCar = async(car) =>{
      try {
        console.log("ID:",car.id)
        const response = await axios.put(url+car.id, car);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    export const deleteCarById = async(id) =>{
      try {
        const response = await axios.delete(url+id);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

