import { Map } from 'immutable';
import { getLocalAuthData } from '../../helpers/utility';
import actions from './actions';

const initState = new Map({
  idToken: null,
  profile: null,
  uid: null,
});

export default function authReducer(
  state = initState.merge(getLocalAuthData()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return new Map({
        idToken: action.token,
        profile: action.profile,
        uid: action.uid,
      });
    case actions.LOGIN_ERROR:
      return state.set('error', action.error);
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
