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
    
/*
@Entity()
export class Alquiler {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    fechaRetiro: Date;

    @Column()
    lugarRetiro: string;

    @Column()
    fechaDevolucion: Date;

    @Column()
    lugarDevolucion: string;

    @Column()
    precioFinal: number;

    @Column()
    cantidadDias: number;

    @ManyToOne(() => Car, car => car.alquiler)
    car: Car;

    @ManyToOne(() => Cliente, cliente => cliente.alquiler,{cascade: true})
    cliente: Cliente;
} 



*/