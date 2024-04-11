import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import {thunk} from 'redux-thunk';
import rootReducer from './reducers'
import { configureStore } from '@reduxjs/toolkit'

const initialState = {}
const middleware = [thunk]

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState // Assuming initialState is defined elsewhere
  });
  

export default store