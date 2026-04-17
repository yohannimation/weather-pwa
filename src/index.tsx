import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './i18n';

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <App />
  </>
);

reportWebVitals(() => {});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    (navigator as any).serviceWorker
      .register("/service-worker.js")
      .then((registration: any) => {
        console.log("Service Worker enregistré avec succès:", registration);
      })
      .catch((error: Error) => {
        console.error("Erreur lors de l'enregistrement du Service Worker:", error);
      });
  });
}
