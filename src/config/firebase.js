import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';

var firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBfbNM0rUd0HXdp5uQYr0xyLIbGw1upvq8",
    authDomain: "thewholesalebazaar-8e2fd.firebaseapp.com",
    databaseURL: "https://thewholesalebazaar-8e2fd.firebaseio.com",
    projectId: "thewholesalebazaar-8e2fd",
    storageBucket: "thewholesalebazaar-8e2fd.appspot.com",
    messagingSenderId: "32251744535",
    appId: "1:32251744535:web:3969cfcf18bb64391aa752",
    measurementId: "G-8S12ZWHGNM"
  });
  // Initialize Firebase
//   firebase.(firebaseConfig);

export default firebaseConfig;