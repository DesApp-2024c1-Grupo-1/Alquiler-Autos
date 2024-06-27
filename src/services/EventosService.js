export function getEventos() {
    console.log("Haciendo fetch")
    return fetch('http://localhost:3000/evento')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error));
  }