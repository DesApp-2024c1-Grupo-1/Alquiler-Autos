import { Route, Routes } from "react-router-dom";
import { FilmsPage } from "./pages/FilmsPage";
import { HomePage } from "./pages/HomePage";
import Agenda from "./pages/Agenda"
import Taller from "./pages/Taller"
import Estadisticas from "./pages/Estadisticas"
import RegistrarPago from "./pages/RegistrarPago"
import Login from "./pages/Login"
import { ListOfFilms } from "./pages/FilmsPageReduxStyle";
import { ActorsPage } from "./pages/ActorsPage";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export function AppRouter() {
  return (
    <Routes>
      <Route path='/reserve/*' element={<ActorsPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/' element={<HomePage />} />
      
      <Route path='/home' element={<HomePage />} />
      <Route path='/taller' element={<Taller />} />
      <Route path='/agenda' element={<Agenda />} />
      <Route path='/estadisticas' element={<Estadisticas />} />
      <Route path='/registrarPago' element={<RegistrarPago />} />
      <Route path='/login' element={<Login />} />
      

    </Routes>
  );
}