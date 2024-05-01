const initState = { counter: 0 };

// reducers
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    case 'DEFAULT':
      return { ...state, counter: 0 };
    default:
      return state;
  }
};
export default reducer;
