import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
  searcText: 'React JS Conf',
  total_count: 0,
  result: [],
  loading: false,
  error: false
});

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.YOUTUBE_SEARCH:
      return state
        .set('loading', true)
        .set('searcText', action.payload.searcText);
    case actions.YOUTUBE_SUCCESS_RESULT:
      return state
        .set('result', action.result)
        .set('total_count', action.total_count)
        .set('nextPageToken', action.nextPageToken)
        .set('prevPageToken', action.prevPageToken)
        .set('loading', false)
        .set('error', false);
    case actions.YOUTUBE_ERROR_RESULT:
      return state
        .set('result', [])
        .set('loading', false)
        .set('error', false);
    default:
      return state;
  }
}
