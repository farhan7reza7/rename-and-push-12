const initState = { tasks: [], change: false, id: null };

// reducers
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
        id: action.payload.id,
      };
    case 'DELETE':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case 'CHANGE':
      return {
        ...state,
        change: !state.change,
      };
    case 'DEFAULT':
      return { tasks: [], update: { change: false, id: null } };
    default:
      return state;
  }
};

export default reducer;
