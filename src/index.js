import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { NotificationsProvider } from 'reapop'



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


