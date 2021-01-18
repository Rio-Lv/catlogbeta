import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAw07SnI6AjgVHcfG3hoP1VUl2JMxyA1Po",
    authDomain: "catlogbeta.firebaseapp.com",
    projectId: "catlogbeta",
    storageBucket: "catlogbeta.appspot.com",
    messagingSenderId: "461775122334",
    appId: "1:461775122334:web:d489365a8fb968b06b708f",
    measurementId: "G-2L85B6K79T"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp();


export { firebase, db, storage, timeStamp, auth};