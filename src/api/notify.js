import axios from 'axios';
import { api } from './index';
import { Alert } from 'react-native';

export const getNotify = async (header) => {
    try {
        const response = await axios.get(api + '/admin/dev_notifications', header);
        return response.data;
    } catch (e) {
        Alert.alert('Thông báo', e.response.data.message)
    }
}