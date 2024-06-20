import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData, { editer } from './actions';

const initState = createEntityAdapter({
  selectId: (task) => task.tid,
  sortComparer: (a, b) => a.task.localeCompare(b.task), // compare alphabetically,
});

export const {
  selectAll: selectAllEls,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} = initState.getSelectors((state) => state.items);

const init = {
  initState: initState.getInitialState({ tid: null }),
  changeStat: { change: false },
  loadAsyn: { data: [], error: null, loading: false },
};

const dataSlice1 = createSlice({
  name: 'tasks',
  initialState: init.initState,
  reducers: {
    adder(state, action) {
      state.entities[action.payload.tid] = action.payload;
      state.ids.push(action.payload.tid);

      // Sort the ids array
      state.ids.sort((a, b) => {
        const taskA = state.entities[a];
        const taskB = state.entities[b];
        return taskA.task.localeCompare(taskB.task);
      });
    },
    //adder: initState.addOne,
    updater(state, action) {
      //state.tasks = state.tasks.map((task) =>
      //task.id === action.payload.id ? action.payload : task,
      //);
      initState.updateOne(state, {
        id: action.payload.tid,
        changes: action.payload,
      });
      //state.entities[action.payload.id] = action.payload;
    },
    /*editer(state, action) {
      state.tid = action.payload.tid;
    },*/

    /*deleter(state, action) {
      delete state.entities[action.payload.id];
    },*/
    deleter: initState.removeOne,
    /*reseter(state, action) {
      state.tasks = [];
      state.id = null;
    },*/
    //reseter: initState.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(editer, (state, action) => {
        state.tid = action.payload.tid;
      })
      .addMatcher(
        (action) => action.type.endsWith('DEFAULT'),
        (state, action) => {
          state.entities = {};
          state.ids = [];
          state.tid = null;
        },
      )
      .addDefaultCase((state, action) => state);
  },
});

export const { adder, updater, deleter } = dataSlice1.actions;

const reducer1 = dataSlice1.reducer;

const dataSlice2 = createSlice({
  name: 'change',
  initialState: init.changeStat,
  reducers: {
    changer(state, action) {
      state.change = !state.change;
    },
    /*defaulter(state, action) {
      state.change = false;
    },*/
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('DEFAULT'),
        (state, action) => {
          state.change = false;
        },
      )
      .addDefaultCase((state, action) => state);
  },
});

export const { changer } = dataSlice2.actions;
const reducer2 = dataSlice2.reducer;

const dataSlice3 = createSlice({
  name: 'data',
  initialState: init.loadAsyn,
  /*reducers: {
    initer(state, action) {
      state.data = [];
      state.error = null;
      state.loading = false;
    },
  },*/
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.data = [];
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('DEFAULT'),
        (state, action) => {
          state.data = [];
          state.error = null;
          state.loading = false;
        },
      )
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

const reducer3 = dataSlice3.reducer;

export { reducer1, reducer2, reducer3, init };
