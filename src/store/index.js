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
    allRolls: [],
    rollProbabilities: [
      {
        "Dice": 1,
        "Average Score": 25,
        "Success": 0.3333,
        "Three of a Kind": 0,
        "Four of a Kind": 0,
        "Five of a Kind": 0,
        "Six of a Kind": 0,
        "Three Pair": 0,
        "Straight": 0
      },
      {
        "Dice": 2,
        "Average Score": 50,
        "Success": 0.5565,
        "Three of a Kind": 0,
        "Four of a Kind": 0,
        "Five of a Kind": 0,
        "Six of a Kind": 0,
        "Three Pair": 0,
        "Straight": 0
      },
      {
        "Dice": 3,
        "Average Score": 87,
        "Success": 0.7231,
        "Three of a Kind": 0.0279,
        "Four of a Kind": 0,
        "Five of a Kind": 0,
        "Six of a Kind": 0,
        "Three Pair": 0,
        "Straight": 0
      },
      {
        "Dice": 4,
        "Average Score": 144,
        "Success": 0.8430,
        "Three of a Kind": 0.0924,
        "Four of a Kind": 0.0047,
        "Five of a Kind": 0,
        "Six of a Kind": 0,
        "Three Pair": 0,
        "Straight": 0
      },
      {
        "Dice": 5,
        "Average Score": 225,
        "Success": 0.9233,
        "Three of a Kind": 0.1930,
        "Four of a Kind": 0.0192,
        "Five of a Kind": 0.0008,
        "Six of a Kind": 0,
        "Three Pair": 0,
        "Straight": 0
      },
      {
        "Dice": 6,
        "Average Score": 390,
        "Success": 0.9770,
        "Three of a Kind": 0.3149,
        "Four of a Kind": 0.0484,
        "Five of a Kind": 0.0039,
        "Six of a Kind": 0.00012,
        "Three Pair": 0.0392,
        "Straight": 0.0155
      },
    ]
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
