// store.js
import { configureStore } from '@reduxjs/toolkit';
import { reducer1, reducer2, reducer3, init } from './reducer';
// store
const store = configureStore({
  reducer: {
    items: reducer1,
    updates: reducer2,
    dataLoader: reducer3,
  },
  preloadedState: init,
});

export default store;
