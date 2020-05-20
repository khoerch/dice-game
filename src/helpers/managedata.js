const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

export default {
  setNewRoll(data) {
    // data.timestamp = FieldValue.serverTimestamp()
    db.collection('rolls').add(data)
    .then(ref => {
      console.log('New Roll: ', ref.id)
    })
    .catch(err => {
      console.log(err)
    })
  },
  setNewTurn(data) {
    // data.timestamp = FieldValue.serverTimestamp()
    db.collection('turns').add(data)
    .then(ref => {
      console.log('New Turn: ', ref.id)
    })
    .catch(err => {
      console.log(err)
    })
  }
}