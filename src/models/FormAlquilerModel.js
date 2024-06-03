import { th } from "date-fns/locale";

export class FormAlquilerModel{
    constructor(fechaRetiro,lugarRetiro, fechaDevolucion,lugarDevolucion, precioFinal, auto) {
        this.fechaRetiro = fechaRetiro;
        this.lugarRetiro = lugarRetiro;
        this.fechaDevolucion = fechaDevolucion;
        this.lugarDevolucion = lugarDevolucion;
        this.precioFinal = precioFinal;
        this.auto = auto;
    }

}