import axios from 'axios';
import {api} from './index';
import {Alert} from 'react-native';

export const changePassWord = async (id, body, header) => {
  try {
    const response = await axios.put(
      api + `/admin/users/${id}/changepassword`,
      body,
      header,
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};
