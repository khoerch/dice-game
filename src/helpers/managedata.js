const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCwtJW_ubLnJw581uYxZkWXS4qDTpqoPl8',
  authDomain: 'dice-game-24da0.firebaseapp.com',
  projectId: 'dice-game-24da0'
});

const db = firebase.firestore();

function newRolls(data) {
  // data.timestamp = FieldValue.serverTimestamp()
  console.log(data)
  db.collection('rolls').add(data)
    .then(ref => {
      console.log('updated', ref.id)
    })
    .catch(err => {
      console.log(err)
    })
}

export default {
  setNewRoll(data) {
    console.log(data)
    newRolls(data)
  }
}