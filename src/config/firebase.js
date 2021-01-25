import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAw07SnI6AjgVHcfG3hoP1VUl2JMxyA1Po",
    authDomain: "catlogbeta.firebaseapp.com",
    projectId: "catlogbeta",
    storageBucket: "catlogbeta.appspot.com",
    messagingSenderId: "461775122334",
    appId: "1:461775122334:web:d489365a8fb968b06b708f",
    measurementId: "G-2L85B6K79T"
};
const uiConfig = {
    autoUpgradeAnonymousUsers: true,
    signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
            console.log(authResult)
        }
        ,
        signInFailure: function (error) {
            // For merge conflicts, the error.code will be
            // 'firebaseui/anonymous-upgrade-merge-conflict'.
            console.log(error);
            if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
                return Promise.resolve();
            }
            // The credential the user tried to sign in with.
            var cred = error.credential;
            // Copy data from anonymous user to permanent user and delete anonymous
            // user.
            // ...
            // Finish sign-in after data is copied.
            return firebase.auth().signInWithCredential(cred);
        }
    }
}
var firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
const increment = firebase.firestore.FieldValue.increment(1);

export { firebaseApp,db,storage,increment, timeStamp};