const admin = require('firebase-admin');
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dice-game-24da0.firebaseio.com"
});

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   apiKey: "AIzaSyCwtJW_ubLnJw581uYxZkWXS4qDTpqoPl8",
//   authDomain: "dice-game-24da0.firebaseapp.com",
//   databaseURL: "https://dice-game-24da0.firebaseio.com",
//   projectId: "dice-game-24da0",
//   storageBucket: "dice-game-24da0.appspot.com",
//   messagingSenderId: "522903327045",
//   appId: "1:522903327045:web:6e775547bcfa3fe4cfae2c"
// });

const db = admin.firestore();

let docRef = db.collection('rolls').doc('test');

let exampleRoll = docRef.set({
  roll: [1,2,3,4,5,6],
  score: 1500,
  success: true,
  straight: true
}).catch(err => {
  console.log(err)
});
