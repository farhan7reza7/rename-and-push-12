// store.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

// store
const store = configureStore({ reducer: reducer });

export default store;
