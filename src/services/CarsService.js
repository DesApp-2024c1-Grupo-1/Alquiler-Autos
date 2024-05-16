export async function getAllCars() {
  return getAllCarsFake();
}

const image = "https://car-images.bauersecure.com/wp-images/4738/should_i_buy_an_electric_car.jpg"


async function getAllCarsFake() {
  const promise = new Promise((resolve, reject) =>{
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Fiat 147', brand: 'Fiat', year: 1990, km: 100000, color: 'rojo', price: 100000, image: image,transmision: 'manual', combustible: 'nafta', ac: false, capacidad: 5, patente: 'ABC123'},
        { id: 2, name: 'Chevrolet Corsa', brand: 'Chevrolet', year: 2000, km: 50000, color: 'azul', price: 200000, image: image,transmision: 'Automatico', combustible: 'electrico', ac: true, capacidad: 4, patente: 'ABC123' },
        { id: 3, name: 'Ford Falcon', brand: 'Ford', year: 1980, km: 200000, color: 'verde', price: 150000, image: image,transmision: 'manual', combustible: 'nafta', ac: true, capacidad: 4, patente: 'ABC123' },
        { id: 4, name: 'Peugeot 206', brand: 'Peugeot', year: 2005, km: 80000, color: 'blanco', price: 250000, image: image,transmision: 'manual', combustible: 'nafta', ac: true, capacidad: 4, patente: 'ABC123' },
        { id: 5, name: 'Renault Clio', brand: 'Renault', year: 2010, km: 30000, color: 'gris', price: 300000, image: image,transmision: 'manual', combustible: 'nafta', ac: true, capacidad: 5, patente: 'ABC123' },
        { id: 6, name: 'Toyota Corolla', brand: 'Toyota', year: 2015, km: 10000, color: 'verde', price: 350000, image: image,transmision: 'Automatico', combustible: 'nafta', ac: true, capacidad: 2, patente: 'ABC123'}
      ])
    }, 0);

  
});
  return Promise.resolve(promise);
}

