import { createSlice } from '@reduxjs/toolkit';
import fetchData from './actions';

const initState = { tasks: [], id: null };
const changeStat = { change: false };
const loadAsyn = { data: [], error: null, loading: false };

const dataSlice1 = createSlice({
  name: 'tasks',
  initialState: initState,
  reducers: {
    adder(state, action) {
      state.tasks.push(action.payload);
    },
    updater(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
      state.id = action.payload.id;
    },
    deleter(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    reseter(state, action) {
      state.tasks = [];
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => state);
  },
});

export const { adder, reseter, updater, deleter } = dataSlice1.actions;
const reducer1 = dataSlice1.reducer;

const dataSlice2 = createSlice({
  name: 'change',
  initialState: changeStat,
  reducers: {
    changer(state, action) {
      state.change = !state.change;
    },
    defaulter(state, action) {
      state.change = false;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state, action) => state);
  },
});

export const { changer, defaulter } = dataSlice2.actions;
const reducer2 = dataSlice2.reducer;

const dataSlice3 = createSlice({
  name: 'data',
  initialState: loadAsyn,
  reducers: {
    initer(state, action) {
      state.data = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

const reducer3 = dataSlice3.reducer;

export const { initer } = dataSlice3.actions;
export { reducer1, reducer2, reducer3 };
