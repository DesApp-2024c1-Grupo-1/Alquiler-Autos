/*export function getEventos() {
    console.log("Haciendo fetch")
    return fetch('http://localhost:3000/evento')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error));
  }
  */

  export function getEventos() {
    console.log("Haciendo fetch")
    return fetch('http://localhost:3000/evento')
      .then(response => response.json())
      .then(data => {
                  return data.map(evento => {
                      evento.end = null;
                      return evento;
                  });
              })
      .catch(error => console.error(error));
  }


  export async function actualizarAlquiler(id, alquilerModificado) {
    console.log('Enviando datos de alquiler:', alquilerModificado);
    try {
      const url = `http://localhost:3000/alquiler/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alquilerModificado),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
 
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // Manejar otros tipos de respuesta si es necesario
        return {};
      }
    } catch (error) {
      console.error('Error al actualizar el alquiler:', error);
      throw error;
    }
  }
  

  