import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CountryProvider } from './CountryContext';

ReactDOM.render(
  <CountryProvider>
    <App />
  </CountryProvider>,
  document.getElementById('root')
);
