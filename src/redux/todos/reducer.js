import { Map } from 'immutable';
import todoActions from './actions';

const colors = ['#ff9009', '#42a5f5', '#7ED321'];
const todos = [];
const daysAgo = 0;

const initState = new Map({
  todos,
  colors,
  daysAgo
});

export default function todoReducer(state = initState, action) {
  const todos = state.get('todos');
  const newtodos = [];
  switch (action.type) {
    case todoActions.CHANGE_TODO:
      return state.set('todos', action.todos);
    case todoActions.ALL_COMPLETED:
      todos.forEach(todo => {
        todo.completed = true;
        newtodos.push(todo);
      });
      return state.set('todos', newtodos);
    case todoActions.DELETE_COMPLETED:
      todos.forEach(todo => {
        if (todo.completed !== true) {
          newtodos.push(todo);
        }
      });
      return state.set('todos', newtodos);
    case todoActions.UPDATE_DAYS_AGO:
      return state.set('daysAgo', action.daysAgo);
    default:
      return state;
  }
}
