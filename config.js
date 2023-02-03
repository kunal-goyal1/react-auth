const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBKpPpk_R6oJ4iDrWkTkixu5sdNhCYUCso",
    authDomain: "react-auth-bafe5.firebaseapp.com",
    projectId: "react-auth-bafe5",
    storageBucket: "react-auth-bafe5.appspot.com",
    messagingSenderId: "811148862797",
    appId: "1:811148862797:web:ae83f3602a89785fde4304",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
module.exports = db;
