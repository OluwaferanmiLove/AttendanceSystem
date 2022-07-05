import axios from 'axios';

// const basrURL = "https://sandbox.myidentitypass.com/api/v1/biometrics/merchant";
const apiBaseUrl = "https://api.kairos.com/compare";

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error.response && error.response.data) {
    return Promise.reject(error.response);
  }
return Promise.reject(error.message);
});


function enrollFace(data) {
  const options = {
    headers: {
      'content-type': 'application/json',
      'X-Api-Key': 'test_7c19trrw7depb4vl7esftj:TgRhEXGAlVoG2oOaARIZ3o8PGWA',
      'app-id': 'd72b886c-65e7-4ffc-876d-35f6053df164'
    },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }
  
  return axios.post(`${apiBaseUrl}/face/comparison`, data.cardDetails, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

function compareFace(data) {
  const options = {
    headers: {
      'content-type': 'application/json',
      'app_key': '58c614fbab4235f0b1675005cf0c8820',
      'app_id': 'aa1975ab',
    },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }
  
  return axios.post(`${apiBaseUrl}`, data, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

export const apiService = {
  enrollFace,
  compareFace
}