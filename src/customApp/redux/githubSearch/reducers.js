import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
  searcText: 'react',
  total_count: 0,
  page: 1,
  result: [],
  loading: false,
  error: false
});

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.GIT_SEARCH:
      return state
        .set('loading', true)
        .set('searcText', action.payload.searcText);
    case actions.GIT_SUCCESS_RESULT:
      return state
        .set('result', action.result)
        .set('total_count', action.total_count)
        .set('page', action.page)
        .set('loading', false)
        .set('error', false);
    case actions.GIT_ERROR_RESULT:
      return state
        .set('result', [])
        .set('loading', false)
        .set('error', false);
    default:
      return state;
  }
}
