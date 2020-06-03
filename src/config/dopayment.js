import axios from 'axios';
import api from './api'

var postRoute = api + "/doPayment";
console.log(postRoute)

export const doPayment = (amount, tokenId,userEmail) => {
  console.log("Amount: " + amount);
  console.log("EMAIL OF CUSTOMER IN DOPAymet.js: " + userEmail);
  console.log("EMAIL OF CUSTOMER IN DOPAymet.js: " + userEmail);
  console.log("EMAIL OF CUSTOMER IN DOPAymet.js: " + userEmail);
  console.log("EMAIL OF CUSTOMER IN DOPAymet.js: " + userEmail);
  console.log("EMAIL OF CUSTOMER IN DOPAymet.js: " + userEmail);
  console.log("EMAIL OF CUSTOMER IN DOPAymet.js: " + userEmail);
  console.log("EMAIL OF CUSTOMER IN DOPAymet.js: " + userEmail);


  const body = {
    amount: amount,
    tokenId: tokenId,
    email: userEmail
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