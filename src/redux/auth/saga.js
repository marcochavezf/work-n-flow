import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken } from '../../helpers/utility';
import FirebaseHelper from '../../helpers/firebase';
import actions from './actions';

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ provider, email, password }) {
    try {
      const { token, profile, uid } = yield FirebaseHelper.login(provider, { email, password });
      console.log(token, profile, uid);
      yield put({
        type: actions.LOGIN_SUCCESS,
        uid,
        token,
        profile,
      });
    } catch (error) {
      console.log(error)
      yield put({ type: actions.LOGIN_ERROR, error });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('uid', payload.uid);
    yield localStorage.setItem('id_token', payload.token);
    yield localStorage.setItem('profile', JSON.stringify(payload.profile));
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*(error) {
    yield error;
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield FirebaseHelper.logout();
    yield put(push('/'));
  });
}
export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    //fork(loginError),
    fork(logout)
  ]);
}
