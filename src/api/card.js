import axios from 'axios';
import {api} from './index';
import {Alert} from 'react-native';

export const ListTemplate = async header => {
  try {
    const response = await axios.post(
      api + '/admin/card_templates/list',
      {},
      header,
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const updateInfoDonate = async (id, body, header) => {
  try {
    const response = await axios.put(
      api + `/admin/list_registers/${id}`,
      body,
      header,
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const updateTypeCard = async (id, body, header) => {
  try {
    const response = await axios.put(
      api + `/list_registers/${id}/proposal-print-hard-card`,
      body,
      header,
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const send = async (id, body, header) => {
  try {
    const response = await axios.put(
      api + `/admin/list_registers/${id}/status`,
      body,
      header,
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const previewInfoDonate = async (id, body, header) => {
  try {
    const response = await axios.put(
      api + `/admin/list_registers/${id}/preview`,
      body,
      header,
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};

export const PreviewCard = async (id, body, header) => {
  try {
    const response = await axios.put(
      api + `/admin/list_registers/${id}/fill-user-data-to-card`,
      body,
      header,
    );
    return response.data;
  } catch (e) {
    console.log(e.response);
    Alert.alert('Thông báo', e.response.data.message);
  }
};