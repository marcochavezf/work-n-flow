import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reactReduxFirebase, getFirebase, firebaseStateReducer as firebase } from 'react-redux-firebase'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducers from '../redux/reducers';
import rootSaga from '../redux/sagas';
import { firebaseConfig } from '../config.js';
import FirebaseHelper from '../helpers/firebase';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware];

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    firebase
  }),
  compose(
    // reactReduxFirebase(firebaseConfig,
    reactReduxFirebase(FirebaseHelper.getInstance(),
      {
        userProfile: 'users',
        enableLogging: false
      }),
    applyMiddleware(...middlewares)
  )
);
sagaMiddleware.run(rootSaga);
export { store, history };
