import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { VictimProvider } from './contexts/VictimContext';

ReactDOM.render(
  <React.StrictMode>
    <VictimProvider>
      <App />
    </VictimProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
