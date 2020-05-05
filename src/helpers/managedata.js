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

// function newRolls(data) {
//   // data.timestamp = FieldValue.serverTimestamp()
//   db.collection('rolls').add(data)
//     .then(ref => {
//       console.log('updated', ref.id)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

// db.collection("rolls").get().then(function(querySnapshot) {
//   querySnapshot.forEach(function(doc) {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//   });
// });

export default {
  setNewRoll(data) {
    // newRolls(data)
      // data.timestamp = FieldValue.serverTimestamp()
    db.collection('rolls').add(data)
    .then(ref => {
      console.log('updated', ref.id)
    })
    .catch(err => {
      console.log(err)
    })
  }
}