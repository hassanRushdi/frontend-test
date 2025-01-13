const taskReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "SET_TASKS":
      newState = { ...state, tasks: action.payload };
      break;
    case "ADD_TASK":
      newState = { ...state, tasks: [...state.tasks, action.payload] };
      break;
    case "UPDATE_TASK":
      newState = {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
      break;
    case "DELETE_TASK":
      newState = {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
      break;
    case "TOGGLE_TASK":
      newState = {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
      break;
    case "SET_FILTER":
      newState = { ...state, filter: action.payload };
      break;
    default:
      return state;
  }
  localStorage.setItem("tasks", JSON.stringify(newState.tasks));
  return newState;
};
export default taskReducer;
