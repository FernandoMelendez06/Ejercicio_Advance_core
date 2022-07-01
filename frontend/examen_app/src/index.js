import React from 'react';
import { BrowserRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';


import { ExamenApp } from './ExamenApp';
import './styles/styles.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>

    <BrowserRouter>
        <ExamenApp />
    </BrowserRouter>

  </React.StrictMode>
);



// reportWebVitals();
