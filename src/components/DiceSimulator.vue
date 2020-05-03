<template>
  <div class="simulator">
    <div class="dice-select">
      <div v-for="(value, index) in dicePicker" :key="value">
        <button 
            v-bind:class="[index <= selectedDiceNumber ? 'active-dice' : '', 'button']"
            @click="selectedDiceNumber = index">
          {{ value }}
        </button>
      </div>
    </div>

    <button @click="rollTheDice(selectedDiceNumber)"> 
      Roll them dice!
    </button>

    <div v-if="diceRolled" class="result">
      <h2>Results:</h2>
      <p>Dice Numbers: {{rollResult.roll}}</p>
      <p>Score: {{rollResult.score}}</p>
      <p v-bind:class="{'result-false': !rollResult.success}">Success: {{rollResult.success}}</p>
      <p v-bind:class="{'result-false': !rollResult.tripleExists}">Three of a Kind: {{rollResult.tripleExists}}</p>
      <p v-bind:class="{'result-false': !rollResult.quadExists}">Four of a Kind: {{rollResult.quadExists}}</p>
      <p v-bind:class="{'result-false': !rollResult.quintExists}">Five of a Kind: {{rollResult.quintExists}}</p>
      <p v-bind:class="{'result-false': !rollResult.sextExists}">Six of a Kind: {{rollResult.sextExists}}</p>
      <p v-bind:class="{'result-false': !rollResult.straight}">Straight: {{rollResult.straight}}</p>
      <p v-bind:class="{'result-false': !rollResult.threePairs}">Three Pairs: {{rollResult.threePairs}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiceSimulator',
  data: function () {
    return {
      dicePicker: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
      selectedDiceNumber: 5,
      diceRolled: false,
      rollResult: null,
    }
  },
  methods: {
    rollTheDice(diceNumber) {
      this.rollResult = {
        roll: null,
        score: 0,
        success: false,
        tripleExists: false,
        quadExists: false,
        quintExists: false,
        sextExists: false,
        straight: false,
        threePairs: false
      }
      this.diceRolled = true
      const dieNumbers = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)]

      if (diceNumber === 0) this.oneDieRoll(dieNumbers.slice(0,1))
      if (diceNumber === 1) this.twoDieRoll(dieNumbers.slice(0,2))
      if (diceNumber === 2) this.threeDieRoll(dieNumbers.slice(0,3))
      if (diceNumber === 3) this.fourDieRoll(dieNumbers.slice(0,4))
      if (diceNumber === 4) this.fiveDieRoll(dieNumbers.slice(0,5))
      if (diceNumber === 5) this.sixDieRoll(dieNumbers)
    },
    // Different dice roll calculations
    oneDieRoll(roll) {
      this.rollResult.roll = roll
      // Standard scores for ones and fives
      this.rollResult.score = roll.includes(1) ? 100 : (roll.includes(5) ? 50 : 0)
      this.rollResult.success = this.rollResult.score > 0 ? true : false
    },
    twoDieRoll(roll) {
      this.rollResult.roll = roll
      // Standard scores for ones and fives
      let scoreA = roll[0] === 1 ? 100 : (roll[0] === 5 ? 50 : 0)
      let scoreB = roll[1] === 1 ? 100 : (roll[1] === 5 ? 50 : 0)
      this.rollResult.score = scoreA + scoreB
      this.rollResult.success = this.rollResult.score > 0 ? true : false
    },
    threeDieRoll(roll) {
      this.rollResult.roll = roll
      // Check for three of a kind
      if (roll[0] === roll[1] && roll[1] === roll[2]){
        this.rollResult.tripleExists = true
        if (roll[0] === 1) {
          this.rollResult.score = roll[0] * 1000
          this.rollResult.success = true
        } else {
          this.rollResult.score = roll[0] * 100
          this.rollResult.success = true
        }
      } else {
        // Standard scores for ones and fives
        let scoreA = roll[0] === 1 ? 100 : (roll[0] === 5 ? 50 : 0)
        let scoreB = roll[1] === 1 ? 100 : (roll[1] === 5 ? 50 : 0)
        let scoreC = roll[2] === 1 ? 100 : (roll[2] === 5 ? 50 : 0)
        this.rollResult.score = scoreA + scoreB + scoreC
        this.rollResult.success = this.rollResult.score > 0 ? true : false
      }
    },
    fourDieRoll(roll) {
      this.rollResult.roll = roll
      // Check for three of a kind
      for (const x of roll) {
        let likeDice = roll.filter(y => y === x)
        if (likeDice.length === 3) {
          this.rollResult.tripleExists = true
          let unlikeDie = roll.find(i => i !== likeDice[0])
          let unlikeDieScore = unlikeDie === 1 ? 100 : (unlikeDie === 5 ? 50 : 0)
          if (likeDice[0] === 1) {
            this.rollResult.score = likeDice[0] * 1000 + unlikeDieScore
            this.rollResult.success = true
            return
          } else {
            this.rollResult.score = likeDice[0] * 100 + unlikeDieScore
            this.rollResult.success = true
            return
          }
        }
      }
      // Check for four of a kind
      if (roll.every(x => x === roll[0])) {
        this.rollResult.quadExists = true
        if (roll[0] === 1) {
          this.rollResult.score = roll[0] * 1000 * 2
          this.rollResult.success = true
        } else {
          this.rollResult.score = roll[0] * 100 * 2
          this.rollResult.success = true
        }
      } else {
        // Standard scores for ones and fives
        let scoreA = roll[0] === 1 ? 100 : (roll[0] === 5 ? 50 : 0)
        let scoreB = roll[1] === 1 ? 100 : (roll[1] === 5 ? 50 : 0)
        let scoreC = roll[2] === 1 ? 100 : (roll[2] === 5 ? 50 : 0)
        let scoreD = roll[3] === 1 ? 100 : (roll[3] === 5 ? 50 : 0)
        this.rollResult.score = scoreA + scoreB + scoreC + scoreD
        this.rollResult.success = this.rollResult.score > 0 ? true : false
      }
    },
    fiveDieRoll(roll) {
      this.rollResult.roll = roll
      // Checks for three of a kind or four of a kind
      for (const x of roll) {
        let likeDice = roll.filter(y => y === x)
        if (likeDice.length === 3) {
          this.rollResult.tripleExists = true
          let unlikeDie = roll.filter(i => i !== likeDice[0])
          let unlikeDieScoreA = unlikeDie[0] === 1 ? 100 : (unlikeDie[0] === 5 ? 50 : 0)
          let unlikeDieScoreB = unlikeDie[1] === 1 ? 100 : (unlikeDie[1] === 5 ? 50 : 0)
          if (likeDice[0] === 1) {
            this.rollResult.score = likeDice[0] * 1000 + unlikeDieScoreA + unlikeDieScoreB
            this.rollResult.success = true
            return
          } else {
            this.rollResult.score = likeDice[0] * 100 + unlikeDieScoreA + unlikeDieScoreB
            this.rollResult.success = true
            return
          }
        }
        if (likeDice.length === 4) {
          this.rollResult.quadExists = true
          let unlikeDie = roll.find(i => i !== likeDice[0])
          let unlikeDieScore = unlikeDie === 1 ? 100 : (unlikeDie === 5 ? 50 : 0)
          if (likeDice[0] === 1) {
            this.rollResult.score = likeDice[0] * 1000 * 2 + unlikeDieScore
            this.rollResult.success = true
            return
          } else {
            this.rollResult.score = likeDice[0] * 100 * 2 + unlikeDieScore
            this.rollResult.success = true
            return
          }
        }
      }
      // Checks for five of a kind
      if (roll.every(x => x === roll[0])){
        this.rollResult.quintExists = true
        if (roll[0] === 1) {
          this.rollResult.score = roll[0] * 1000 * 3
          this.rollResult.success = true
        } else {
          this.rollResult.score = roll[0] * 100 * 3
          this.rollResult.success = true
        }
      } else {
        // Standard scores for ones and fives
        let scoreA = roll[0] === 1 ? 100 : (roll[0] === 5 ? 50 : 0)
        let scoreB = roll[1] === 1 ? 100 : (roll[1] === 5 ? 50 : 0)
        let scoreC = roll[2] === 1 ? 100 : (roll[2] === 5 ? 50 : 0)
        let scoreD = roll[3] === 1 ? 100 : (roll[3] === 5 ? 50 : 0)
        let scoreE = roll[4] === 1 ? 100 : (roll[4] === 5 ? 50 : 0)
        this.rollResult.score = scoreA + scoreB + scoreC + scoreD + scoreE
        this.rollResult.success = this.rollResult.score > 0 ? true : false
      }
    },
    sixDieRoll(roll) {
      this.rollResult.roll = roll
      let doubleCount = 0
      let tripleCount = 0
      let tripleValues = []
      // Check for two, three, four, or five of a kind
      for (const x of roll) {
        let likeDice = roll.filter(y => y === x)
        if (likeDice.length === 2) {
          doubleCount++
        }
        if (likeDice.length === 3) {
          this.rollResult.tripleExists = true
          tripleCount++
          if (!tripleValues.includes(likeDice[0])) {
            tripleValues.push(likeDice[0])
          }
        }
        if (likeDice.length === 4) {
          this.rollResult.quadExists = true
          let unlikeDie = roll.filter(i => i !== likeDice[0])
          let unlikeDieScoreA = unlikeDie[0] === 1 ? 100 : (unlikeDie[0] === 5 ? 50 : 0)
          let unlikeDieScoreB = unlikeDie[1] === 1 ? 100 : (unlikeDie[1] === 5 ? 50 : 0)
          if (likeDice[0] === 1) {
            this.rollResult.score = likeDice[0] * 1000 * 2 + unlikeDieScoreA + unlikeDieScoreB
            this.rollResult.success = true
            return
          } else {
            this.rollResult.score = likeDice[0] * 100 * 2 + unlikeDieScoreA + unlikeDieScoreB
            this.rollResult.success = true
            return
          }
        }
        if (likeDice.length === 5) {
          this.rollResult.quintExists = true
          let unlikeDie = roll.find(i => i !== likeDice[0])
          let unlikeDieScore = unlikeDie === 1 ? 100 : (unlikeDie === 5 ? 50 : 0)
          if (likeDice[0] === 1) {
            this.rollResult.score = likeDice[0] * 1000 * 3 + unlikeDieScore
            this.rollResult.success = true
            return
          } else {
            this.rollResult.score = likeDice[0] * 100 * 3 + unlikeDieScore
            this.rollResult.success = true
            return
          }
        }
      }
      // Checks for a straight
      if (roll.includes(1) && roll.includes(2) && roll.includes(3) && roll.includes(4) && roll.includes(5) && roll.includes(6)) {
        this.rollResult.straight = true
        this.rollResult.score = 1500
        this.rollResult.success = true
      } else if (roll.every(x => x === roll[0])) {
        // Checks for six of a kind
        this.rollResult.sextExists = true
        if (roll[0] === 1) {
          this.rollResult.score = roll[0] * 1000 * 4
          this.rollResult.success = true
        } else {
          this.rollResult.score = roll[0] * 100 * 4
          this.rollResult.success = true
        }
      } else if (doubleCount === 6) {
        // Checks for three pairs
        this.rollResult.threePairs = true
        this.rollResult.score = 1000
        this.rollResult.success = true
      }else if (tripleCount === 6) {
        // Checks for two three of a kinds
        let tripleScoreA = tripleValues[0] === 1 ? tripleValues[0] * 1000 : tripleValues[0] * 100
        let tripleScoreB = tripleValues[1] === 1 ? tripleValues[1] * 1000 : tripleValues[1] * 100
        this.rollResult.score = tripleScoreA + tripleScoreB
        this.rollResult.success = true
      } else if (tripleCount === 3) {
        // checks for one three of a kind
        let unlikeDie = roll.filter(i => i !== tripleValues[0])
        let unlikeDieScoreA = unlikeDie[0] === 1 ? 100 : (unlikeDie[0] === 5 ? 50 : 0)
        let unlikeDieScoreB = unlikeDie[1] === 1 ? 100 : (unlikeDie[1] === 5 ? 50 : 0)
        let unlikeDieScoreC = unlikeDie[2] === 1 ? 100 : (unlikeDie[2] === 5 ? 50 : 0)
        if (tripleValues[0] === 1) {
          this.rollResult.score = tripleValues[0] * 1000 + unlikeDieScoreA + unlikeDieScoreB + unlikeDieScoreC
          this.rollResult.success = true
        } else {
          this.rollResult.score = tripleValues[0] * 100 + unlikeDieScoreA + unlikeDieScoreB + unlikeDieScoreC
          this.rollResult.success = true
        }
      } else {
        // Standard scores for ones and fives
        let scoreA = roll[0] === 1 ? 100 : (roll[0] === 5 ? 50 : 0)
        let scoreB = roll[1] === 1 ? 100 : (roll[1] === 5 ? 50 : 0)
        let scoreC = roll[2] === 1 ? 100 : (roll[2] === 5 ? 50 : 0)
        let scoreD = roll[3] === 1 ? 100 : (roll[3] === 5 ? 50 : 0)
        let scoreE = roll[4] === 1 ? 100 : (roll[4] === 5 ? 50 : 0)
        let scoreF = roll[5] === 1 ? 100 : (roll[5] === 5 ? 50 : 0)
        this.rollResult.score = scoreA + scoreB + scoreC + scoreD + scoreE + scoreF
        this.rollResult.success = this.rollResult.score > 0 ? true : false
      }
    },
  }
}
</script>

<style scoped>
.active-dice {
  background: blue;
}
.result-false {
  color: red;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
