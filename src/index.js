import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Redux/app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> making markers not showing
      <Provider store={store}>
        <App />
      </Provider>
  // </React.StrictMode>
);

// laboratory
// import store from "./app/store";
// import axios from "axios";
