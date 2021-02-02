const functions = require("firebase-functions");

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.cakeTaster = functions.https.onRequest((req, res) => {
  const promise = admin.firestore().doc('cakes/flavours').get();
  promise.then(snapshot => {
    const data = snapshot.data();
    res.send(data)
  }).catch(err => {
    console.log(err);
    res.status(500).send(err)
  })

});
exports.uid = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  db.collection("cities").add({
    name: "Tokyo",
    country: "Japan"
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  console.log(uid)
  return uid
});

