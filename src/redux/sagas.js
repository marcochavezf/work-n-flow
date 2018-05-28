import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import todosSagas from './todos/saga';
import devSagas from '../customApp/redux/sagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    todosSagas(),
    devSagas()
  ]);
}
