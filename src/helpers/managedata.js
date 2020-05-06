const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

export default {
  setNewRoll(data) {
    // data.timestamp = FieldValue.serverTimestamp()
    db.collection('rolls').add(data)
    .then(ref => {
      console.log('updated', ref.id)
    })
    .catch(err => {
      console.log(err)
    })
  },
}