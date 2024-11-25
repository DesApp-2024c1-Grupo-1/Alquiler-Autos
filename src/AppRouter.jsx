import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PageAlquiler } from "./pages/RegistrarAlquiler";
// import { Estadisticas } from "./pages/Estadisticas";
import Agenda from "./pages/Agenda"
import Taller from "./pages/Taller"
import Estadisticas from "./pages/Estadisticas"
import RegistrarPago from "./pages/RegistrarPago"
import Login from "./pages/Login"
import AlquileresPage from "./pages/Alquileres";

export function AppRouter() {
  return (
    <Routes>
      <Route path='/reserve/*' element={<PageAlquiler />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/taller' element={<Taller />} />
      <Route path='/agenda' element={<Agenda />} />
      <Route path='/estadisticas' element={<Estadisticas />} />
      <Route path='/alquileres' element={<AlquileresPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<HomePage />} />
      
    </Routes>
  );
}