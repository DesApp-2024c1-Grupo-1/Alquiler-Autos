import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;

export const registrarAlquiler = async (alquiler) => {
    try {
      const url = apiUrl + "/alquiler"
      const response = await axios.post(url, alquiler)    
      console.log(response)
      return response.data;
      
    } catch (error) {
      console.error(error.response.data)

    }
  }
