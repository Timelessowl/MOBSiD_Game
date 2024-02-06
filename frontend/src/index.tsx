import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const client = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
