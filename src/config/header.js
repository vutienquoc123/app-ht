import AsyncStorage from '@react-native-community/async-storage';

/* eslint-disable comma-dangle */
export async function getHeader() {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Beaer ${token}`,
      },
    };
  } else {
    return null;
  }
}

export async function getHeaderCustom() {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Beaer ${token}`,
      },
    };
  }
}
