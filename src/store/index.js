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
        dice: 1,
        averageScore: 25,
        success: 0.3333,
        triple: 0,
        quad: 0,
        quint: 0,
        sext: 0,
        threePair: 0,
        straight: 0
      },
      {
        dice: 2,
        averageScore: 50,
        success: 0.5565,
        triple: 0,
        quad: 0,
        quint: 0,
        sext: 0,
        threePair: 0,
        straight: 0
      },
      {
        dice: 3,
        averageScore: 87,
        success: 0.7231,
        triple: 0.0279,
        quad: 0,
        quint: 0,
        sext: 0,
        threePair: 0,
        straight: 0
      },
      {
        dice: 4,
        averageScore: 144,
        success: 0.8430,
        triple: 0.0924,
        quad: 0.0047,
        quint: 0,
        sext: 0,
        threePair: 0,
        straight: 0
      },
      {
        dice: 5,
        averageScore: 225,
        success: 0.9233,
        triple: 0.1930,
        quad: 0.0192,
        quint: 0.0008,
        sext: 0,
        threePair: 0,
        straight: 0
      },
      {
        dice: 6,
        averageScore: 390,
        success: 0.9770,
        triple: 0.3149,
        quad: 0.0484,
        quint: 0.0039,
        sext: 0.00012,
        threePair: 0.0392,
        straight: 0.0155
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
