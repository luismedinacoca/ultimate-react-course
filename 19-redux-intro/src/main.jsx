import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from'./store.js';

import './index.css';

//store.dispatch(deposit(500));
//store.dispatch({type: "account/deposit", payload: 500});
//console.log(store.getState());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
