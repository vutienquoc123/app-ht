import axios from 'axios';
import {api} from './index';
import {Alert} from 'react-native';

export const getListCard = async header => {
  try {
    const response = await axios.get(api + '/admin/card_templates', header);
    return response.data;
  } catch (e) {
    Alert.alert('Thông báo', e.response.data.message);
  }
};
