import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
import Store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App/>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
