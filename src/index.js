import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './i18n';

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.

  navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`).then(
    registration => {
      console.log('Service worker registration succeeded:', registration);
    },
    /*catch*/ error => {
      console.error(`Service worker registration failed: ${error}`);
    }
  );
} else {
  console.error('Service workers are not supported.');
}