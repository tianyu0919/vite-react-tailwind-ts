/*
 * @Author: 卢天宇
 * @Date: 2023-09-11 22:45:14
 * @Description: 
 */
import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import counterReducer from './modules/counter';
import userReducer from './modules/users';
import actionCounter from './modules/actionCounter';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    actionCounter
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    const middlewares = [];
    
    if(process.env.NODE_ENV !== 'production') {
      middlewares.push(reduxLogger);
    }
    
    return getDefaultMiddleware().concat(middlewares)
  }
})

export default store;