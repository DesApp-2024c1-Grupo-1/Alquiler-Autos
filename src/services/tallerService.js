import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;

export const registrarReparacion = async (reparacion) => {
    try {
      const url = apiUrl + "/reparacion"
      const response = await axios.post(url, reparacion)    
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(error.response.data)
    }
  }
