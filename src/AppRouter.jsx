import { Route, Routes } from "react-router-dom";
import { FilmsPage } from "./pages/FilmsPage";
import { HomePage } from "./pages/HomePage";
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
    </Routes>
  );
}