import axios from 'axios';
import {api} from './index';
import {Alert} from 'react-native';

export const getProfile = async header => {
  try {
    const response = await axios.get(
      api +
        '/users/profile?includes=listregisters&listregister_includes=donationparts',
      header,
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const getCard = async header => {
  try {
    const response = await axios.get(
      api +
        '/users/profile?includes=listregisters&listregister_includes=images',
      header,
    );
    return response.data;
  } catch (e) {
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const getCustomTitle = async header => {
  try {
    const response = await axios.get(
      api + '/options/slug/national-coordination-center',
      header,
    );
    return response.data;
  } catch (e) {
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const updateProfile = async (body, header) => {
  try {
    const response = await axios.put(api + '/me/profile', body, header);
    return response.data;
  } catch (e) {
    Alert.alert('Thông báo', e.response.data.message);
  }
};
