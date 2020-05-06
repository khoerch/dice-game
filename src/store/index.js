import Vue from 'vue'
import Vuex from 'vuex'
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

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allRolls: []
  },
  mutations: {
    setRolls (state, rolls) {
      state.allRolls = rolls
    },
  },
  actions: {
    getHistoricalRolls ({ commit }) {
      db.collection("rolls").limit(5000).get().then(res => {
        const rolls = []
        console.log('Historical rolls count: ', res.docs.length)
        for (const doc of res.docs) {
          rolls.push(doc.data())
        }
        commit('setRolls', rolls)
      });
    }
  },
  modules: {
  }
})
