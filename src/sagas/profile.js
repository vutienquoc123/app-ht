import {put, takeEvery} from 'redux-saga/effects';
import {GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS} from '../redux/actions/auth';
import {getProfile} from '../api/profile';

export function* watchFetchDataRequest() {
  yield takeEvery(GET_PROFILE_REQUEST, function*(action) {
    try {
      const header = action.myprofile;
      const data = yield getProfile(header);
      yield put({type: GET_PROFILE_SUCCESS, data: data.data});
    } catch (e) {}
  });
}
