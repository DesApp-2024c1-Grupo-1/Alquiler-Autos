import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PageAlquiler } from "./pages/RegistrarAlquiler";
import { Estadisticas } from "./pages/Estadisticas";

export function AppRouter() {
  return (
    <Routes>
      <Route path='/reserve/*' element={<PageAlquiler />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/Estadisticas' element={<Estadisticas />} />
    </Routes>
  );
}