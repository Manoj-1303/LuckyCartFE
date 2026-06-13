import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const documentStart = document.getElementById('root');
const rootApp = ReactDOM.createRoot(documentStart);

rootApp.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default rootApp;