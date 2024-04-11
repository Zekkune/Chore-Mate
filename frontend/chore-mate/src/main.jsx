import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import rootReducer from '../src/reducers'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../src/reducers'




ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
  </React.StrictMode>
)

