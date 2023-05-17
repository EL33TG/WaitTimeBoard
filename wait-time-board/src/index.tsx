import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App';
import './index.css';

// auth libraries and config
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig, loginRequest } from './AuthConfig'

const msalInstance = new PublicClientApplication(msalConfig);

// ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   , document.getElementById('root')
// );


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);