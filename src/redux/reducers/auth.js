/* eslint-disable comma-dangle */
import * as _ from 'lodash';
import {GET_PROFILE_SUCCESS} from '../actions/auth';

export default function(state = {fetch: false}, action) {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      const data = _.assign({}, action.data, {
        gender: action.data.gender === true ? 1 : 2,
      });
      return _.assign({}, state, {myprofile: data, fetch: true});
    default:
      return state;
  }
}
