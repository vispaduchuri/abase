const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/storage');
require('firebase/firestore');

const settings = {timestampsInSnapshots : true};

const firebaseConfig = {
    apiKey: "AIzaSyDRzXKriW9Wd2oCfuPjf7TTSxGsjNOcHRQ",
    authDomain: "auth-8b1e1.firebaseapp.com",
    databaseURL: "https://auth-8b1e1.firebaseio.com",
    projectId: "auth-8b1e1",
    storageBucket: "",
    messagingSenderId: "560760402888",
    appId: "1:560760402888:web:587d3e35bdd4923241c6fd"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);
  export default firebase;