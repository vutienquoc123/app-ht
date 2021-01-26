import axios from 'axios';
import {api} from './index';
import {Alert} from 'react-native';

export const getDonationPart = async body => {
  try {
    const response = await axios.post(api + '/donation_parts/list', body, {});
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const getCity = async () => {
  try {
    const response = await axios.post(api + '/admin/provinces/list', {}, {});
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const getCountry = async () => {
  try {
    const response = await axios.post(api + '/admin/nationals/list', {}, {});
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const getProvince = async id => {
  try {
    const response = await axios.get(
      api + `/admin/districts/${id}/list_province`,
      {},
      {},
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const update = async (header, data, id) => {
  try {
    const response = await axios.put(
      api + `/admin/list_registers/${id}`,
      data,
      header,
    );
    return response;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const Send = async (header, data) => {
  try {
    const response = await axios.post(api + '/list_registers', data, header);
    return response;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const SendByGuest = async body => {
  try {
    const response = await axios.post(
      api + '/list_registers/store/guest',
      body,
      {},
    );
    return response;
  } catch (e) {
    return e.response;
  }
};
