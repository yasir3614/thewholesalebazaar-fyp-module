import axios from 'axios';
import api from './api'

var postRoute = api + "/doPayment";
console.log(postRoute)

export const doPayment = (amount, tokenId, accessToken) => {
  const body = {
    amount: amount,
    tokenId: tokenId,
  };
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .post(postRoute, body, { headers })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return Promise.reject('Error in making payment', error);
    });
};