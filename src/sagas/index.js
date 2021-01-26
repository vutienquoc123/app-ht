import {all} from 'redux-saga/effects';

import {watchFetchDataRequest} from './profile';

export default function* rootSaga() {
  yield all([watchFetchDataRequest()]);
}
