import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBsAbL2PfSJPkK_Q_Pnd7CnSObmG0biQY4",
  authDomain: "catlogbeta2.firebaseapp.com",
  projectId: "catlogbeta2",
  storageBucket: "catlogbeta2.appspot.com",
  messagingSenderId: "346124119848",
  appId: "1:346124119848:web:af5aa275bb1423ecddaa1d",
  measurementId: "G-SREQ7QV5PR"
};


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig;

if (Location.hostname === 'localhost') {
  firebaseConfig = config

} else {
  firebaseConfig = config

}






const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export { firebaseApp, db, storage }