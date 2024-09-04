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


  export async function actualizarEvento(id, alquilerModificado) {
  try {
    const url = `http://localhost:3000/evento/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alquilerModificado),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    throw error;
  }
}
