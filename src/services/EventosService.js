const apiUrl = import.meta.env.VITE_API_URL;

  export function getEventos() {
    console.log("Haciendo fetch")
    return fetch(apiUrl +"/evento")
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
    console.log('Enviando datos de pagos:', alquilerModificado.pagos);
    try {
      const url = apiUrl + `/alquiler/${id}`;
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
        return {};
      }
    } catch (error) {
      console.error('Error al actualizar el alquiler:', error);
      throw error;
    }
  }

  export async function registrarPago(idAlquiler, monto) {
    try {
      const url = apiUrl + `/pago/alquiler/${idAlquiler}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ monto: monto }), 
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} al registrar el pago`);
      }
  
      return await response.json(); 
    } catch (error) {
      console.error('Error al registrar el pago:', error);
      throw error;
    }
  }

  export async function eliminarAlquiler(idAlquiler) {
    try {
      const url = apiUrl + `/alquiler/${idAlquiler}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      console.log('Alquiler eliminado con éxito.');
      return true;
    } catch (error) {
      console.error('Error al eliminar el alquiler:', error);
      throw error;
    }
  }
  