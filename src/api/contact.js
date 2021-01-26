import axios from 'axios';
import {api} from './index';
import {Alert} from 'react-native';

export const contact = async (body, header) => {
  try {
    const response = await axios.post(api + '/contacts', body, header);
    Alert.alert(
      'Thông báo',
      'Cảm ơn đã để lại thông tin! Chúng tôi sẽ liên lạc với bạn trong thời gian tới.',
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};
