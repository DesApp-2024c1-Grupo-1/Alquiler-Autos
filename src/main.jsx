import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import './index.css'
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#326FCA',
    },
    secondary: {
      main: '#ffffff',
    }
  },
})

if (!import.meta.env.VITE_API_URL) {
  console.error('⚠️ Archivo .env no encontrado o variable VITE_API_URL no definida. Por favor, crea un archivo .env con las variables ejemplificadas en el archivo .env.example');
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
  </Provider>
)
