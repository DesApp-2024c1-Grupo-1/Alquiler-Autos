export async function getAllAlquileres() {
    return getAllAlquileresFake();
  }
//la idea es simular que estos son registros de alquileres de nuestra agencia, no los autos, 
//sino una especie de comprobante de la operación  
  async function getAllAlquileresFake() {
    const promise = new Promise((resolve, reject) =>{
      setTimeout(() => {
        resolve([
            { id: 1, car: 'Fiat 147',  precio: 100000, transmision: 'manual', combustible: 'nafta', ac: false, capacidad: 5, patente: 'ABC123', dias: 7, vecesAlquilado: 1},
            { id: 2, car: 'Toyota Corolla', precio: 150000, transmision: 'automática', combustible: 'nafta', ac: true, capacidad: 5, patente: 'DEF456', dias: 17, vecesAlquilado: 3 },
            { id: 3, car: 'Honda Civic', precio: 200000, transmision: 'manual', combustible: 'diésel', ac: true, capacidad: 5, patente: 'GHI789', dias: 15, vecesAlquilado: 5 },
            { id: 4, car: 'Ford Focus', precio: 180000, transmision: 'automática', combustible: 'nafta', ac: true, capacidad: 5, patente: 'JKL012', dias: 8, vecesAlquilado: 2 },
            { id: 5, car: 'Chevrolet Cruze', precio: 175000, transmision: 'manual', combustible: 'nafta', ac: true, capacidad: 5, patente: 'MNO345', dias: 12, vecesAlquilado: 4 },
            { id: 6, car: 'Volkswagen Golf', precio: 220000, transmision: 'automática', combustible: 'diésel', ac: true, capacidad: 5, patente: 'PQR678', dias: 9, vecesAlquilado: 4 }
        ])
      }, 0);
  
    
  });
    return Promise.resolve(promise);
  }
  
  