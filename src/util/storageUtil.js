import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SecureStore from '@react-native-async-storage/async-storage';

export async function saveToStorage(key, value) {
  await AsyncStorage.setItem(key, value)
};

export async function getFromStorage(key) {
  return await AsyncStorage.getItem(key)
    .then((response) => {
      return response;
    })
    .catch(error => {
      return error
    })
}

export async function getMultiFromStorage(keys) {
  return await AsyncStorage.multiGet(keys)
    .then((response) => {
      return response;
    })
    .catch(error => {
      return error
    })
}


export async function deleteFromStorage(key) {
  return await AsyncStorage.removeItem(key)
    .then((response) => {
      return response;
    })
    .catch(error => {
      return error
    })
}