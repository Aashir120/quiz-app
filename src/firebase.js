import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCDSx92qcANwtwVME6HurE8feWo5mtrSYg",
    authDomain: "todoapp-8691c.firebaseapp.com",
    databaseURL: "https://todoapp-8691c.firebaseio.com",
    projectId: "todoapp-8691c",
    storageBucket: "todoapp-8691c.appspot.com",
    messagingSenderId: "100221804204",
    appId: "1:100221804204:web:f6c0e1bcd842d5a9348909",
    measurementId: "G-85WGGM07YY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;