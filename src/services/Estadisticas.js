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
