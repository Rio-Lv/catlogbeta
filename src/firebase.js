import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAc_XCHZerDRDbTCOAkCv8kTLjWDlRZneQ",
    authDomain: "catlogbeta-2-1.firebaseapp.com",
    projectId: "catlogbeta-2-1",
    storageBucket: "catlogbeta-2-1.appspot.com",
    messagingSenderId: "797664436367",
    appId: "1:797664436367:web:ec4d134c3e5767e829d0fa",
    measurementId: "G-QGVSFSSFFT"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { firebaseApp, db, storage, auth }