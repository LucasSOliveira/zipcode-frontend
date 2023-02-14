import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
