import axios from 'axios';
import {api} from './index';
import {Alert} from 'react-native';

export const doLogin = async body => {
  // try {
    const response = await axios.post(api + '/auth/login', body);
    return response;
  // } 
  // catch (e) {
  //   console.log(e.response);
  //   return e.response;
  // }
};

export const forgotPassword = async body => {
  try {
    const response = await axios.post(api + '/auth/forgot-password', body);
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};
