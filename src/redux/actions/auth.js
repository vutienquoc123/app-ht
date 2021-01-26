export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';

export function profile(myprofile) {
  return {type: GET_PROFILE_REQUEST, myprofile};
}

export function profileSuccess(myprofile) {
  return {type: GET_PROFILE_SUCCESS, myprofile};
}
