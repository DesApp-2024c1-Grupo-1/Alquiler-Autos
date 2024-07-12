import axios from "axios"


  
export const registrarAlquiler = async (alquiler) => {
    try {
      const url = "http://localhost:3000/alquiler"
      const response = await axios.post(url, alquiler)    
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(error.response.data)
    }
  }
