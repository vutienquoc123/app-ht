import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
// import thunk from 'redux-thunk';
// import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from '../sagas/index';

// const middleware = [thunk];
const sagaMiddleware = createSagaMiddleware();
// const logger = createLogger();
// sagaMiddleware.push(logger);
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
