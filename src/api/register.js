import axios from 'axios';
import {api} from './index';
import {Alert} from 'react-native';

export const doRegister = async body => {
  try {
    const response = await axios.post(api + '/auth/register', body);
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const getInfoAfterRegister = async token => {
  try {
    const response = await axios.get(api + `/list_registers/token/${token}`);
    return response.data;
  } catch (e) {
    Alert.alert('Thông báo', e.response.data.message);
  }
};
