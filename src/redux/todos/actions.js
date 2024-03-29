const todoActions = {
  CHANGE_TODO: 'CHANGE_TODO',
  ALL_COMPLETED: 'ALL_COMPLETED',
  DELETE_COMPLETED: 'DELETE_COMPLETED',
  UPDATE_DAYS_AGO: 'UPDATE_DAYS_AGO',

  addTodo: (todo) => {
    return (dispatch, getState) => {
      const newTodo = {
        id: new Date(),
        todo: todo,
        createTime: new Date(),
        lastTimeStopped: [],
        lastTimeStarted: [],
        remainingTime: 1500000
      };
      const todos = [newTodo, ...getState().Todos.get('todos')];
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos,
      });
    };
  },
  editTodo: (editTodo) => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.get('todos');
      const todos = [];
      oldTodos.forEach(todo => {
        if (todo.id !== editTodo.id) {
          todos.push(todo);
        } else {
          todos.push(editTodo);
        }
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos,
      });
    };
  },
  deleteTodo: (id) => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.get('todos');
      const todos = [];
      oldTodos.forEach(todo => {
        if (todo.id !== id) {
          todos.push(todo);
        }
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos,
      });
    };
  },
  allCompleted: () => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.get('todos');
      const todos = [];
      oldTodos.forEach(todo => {
        todo.completed = true;
        todos.push(todo);
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos,
      });
    };
  },
  updateDaysAgo: (daysAgo) => {
    return (dispatch, getState) => {
      dispatch({
        type: todoActions.UPDATE_DAYS_AGO,
        daysAgo,
      });
    };
  },
  deleteCompleted: () => {
    return (dispatch, getState) => {
      const oldTodos = getState().Todos.get('todos');
      const todos = [];
      oldTodos.forEach(todo => {
        if (!todo.completed) {
          todos.push(todo);
        }
      });
      dispatch({
        type: todoActions.CHANGE_TODO,
        todos,
      });
    };
  },
};
export default todoActions;