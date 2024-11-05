export interface Car {
  name: string;
  brand: string;
  year: number;
  km: number;
  color: string;
  price: number;
  image: string;
  transmision: string;
  combustible: string;
  ac: boolean;
  capacidad: number;
  patente: string;
  fechaLanzamiento: string | null;
  id: number;
  deletedAt: string | null;
}

export interface Cliente {
  id: number;
  nombre: string;
  documento: string;
  telefono: string;
  email: string;
  deletedAt: string | null;
}

export interface Pago {
  fecha: string;
  monto: number;
}

export interface Alquiler {
  id: number;
  fechaRetiro: string;
  lugarRetiro: string;
  fechaDevolucion: string;
  lugarDevolucion: string;
  precioFinal: number;
  cantidadDias: number;
  car: Car;
  cliente: Cliente;
  pagos: Pago[];
  saldoPendiente: number;
}