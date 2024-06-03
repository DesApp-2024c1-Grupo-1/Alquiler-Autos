import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fechaRetiro: new Date().toString(),
  lugarRetiro: "",
  fechaDevolucion: new Date().toString(),
  lugarDevolucion: "",
  precioFinal: "",
  auto: "",
  cliente: "",
  cantDias: 1
}

export const alquilerFormSlice = createSlice({
  name: 'alquiler',
  initialState,
  reducers: {
    newAlquiler: (state, action) => {
      const {fechaRetiro,lugarRetiro, fechaDevolucion,lugarDevolucion, precioFinal, auto} = action.payload;
      state.fechaRetiro = fechaRetiro;
      state.lugarRetiro = lugarRetiro;
      state.fechaDevolucion = fechaDevolucion;
      state.lugarDevolucion = lugarDevolucion;
      state.precioFinal = precioFinal;
      state.auto = auto;
      state.cantDias = diffDeDias(new Date(state.fechaRetiro), new Date(state.fechaDevolucion));;
    },
    editFechaRetiro: (state, action) => {
      state.fechaRetiro = action.payload;
      state.cantDias = diffDeDias(new Date(action.payload), new Date(state.fechaDevolucion));
      state.precioFinal = state.auto.price * state.cantDias
    },
    editLugarRetiro: (state, action) => {
      state.lugarRetiro = action.payload;
    },
    editFechaDevolucion: (state, action) => {
      state.fechaDevolucion = action.payload;
      state.cantDias = diffDeDias(new Date(state.fechaRetiro), new Date(action.payload));
      state.precioFinal = state.auto.price * state.cantDias
    },
    editLugarDevolucion: (state, action) => {
      state.lugarDevolucion = action.payload;
    },
    calculatePrecioFinal: (state, action) => {
      state.precioFinal = state.auto.price * state.cantDias
    },
    editPrecioFinal: (state, action) => {
      state.precioFinal = action.payload;
    },
    editAuto: (state, action) => {
      state.auto = action.payload;
    },
    editCliente: (state, action) => {
      state.cliente = action.payload;
    },
    calculateCantDias: (state, action) => {
      state.cantDias = diffDeDias(new Date(state.fechaRetiro), new Date(state.fechaDevolucion));
    }
  },
});

  function diffDeDias(fecha1,fecha2){
    const milisegundosFecha1 = fecha1.getTime();
    const milisegundosFecha2 = fecha2.getTime();
  
    const diferenciaMilisegundos = milisegundosFecha2 - milisegundosFecha1;
    let dias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
    dias = Math.max(1,Math.round(dias));
    console.log("Cantidad de dias: ",dias)
  
    return Math.max(1,dias);
  
  }

 export const { calculateCantDias,calculatePrecioFinal, editCliente,newAlquiler, editFechaRetiro, editLugarRetiro, editFechaDevolucion, editLugarDevolucion, editPrecioFinal, editAuto } = alquilerFormSlice.actions;
export default alquilerFormSlice.reducer;