import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { NotificationsProvider } from 'reapop'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistedStore = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <NotificationsProvider>
          <PersistGate persistor={persistedStore}>
            <App />
          </PersistGate>
        </NotificationsProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


