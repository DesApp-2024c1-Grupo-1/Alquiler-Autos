// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { ThemeProvider } from '@mui/material';

// import { customMuiTheme } from './config/customMuiTheme';

// import { App } from './App';
// import './index.css'
// import { Provider } from 'react-redux';
// import { store } from './store/store';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <ThemeProvider theme={customMuiTheme}>
//       <App />
//     </ThemeProvider>
//   </Provider>
// )


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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
