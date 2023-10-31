import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './Redux/Store/store';
import { Provider } from 'react-redux';
import App from './App.jsx';

//Estilos
import './index.css'


import axios from 'axios';

//Esto te permite no tener que repetir el url cada vez que queres hacer una peticion, solo pones la Ruta
axios.defaults.baseURL = 'https://pi-back-production-9071.up.railway.app'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
