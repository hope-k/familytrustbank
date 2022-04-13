import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store';
import { NotificationsProvider } from 'reapop'
import axios from 'axios'
import { Provider, useSelector } from 'react-redux';







ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


