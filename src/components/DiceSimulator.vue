<template>
  <div class="simulator" v-bind:class="{'win-screen': winScenario}">
    <h2>Total Score: {{ totalScore }}</h2>
    <h2>Bank: {{ currentTurnScore }}</h2>
    <h2>Zero Tracker: {{ zeroTracker }}</h2>
    <ProbabilityOverview />

    <div v-if="!turnInProgress" class="dice-select">
      <div v-for="(value, index) in dicePicker" :key="value">
        <button 
            v-bind:class="[index <= selectedDiceNumber ? 'active-dice' : '', 'button']"
            @click="selectedDiceNumber = index">
          {{ value }}
        </button>
      </div>

      <button @click="rollTheDice(selectedDiceNumber)"> 
        Roll them dice!
      </button>
    </div>

    <div v-if="turnInProgress" class="result">
      <div>
        <button 
            v-for="(value, index) in scoringDice" 
            @click="reRollTheDice(value)" 
            :key="index"> 
          <!-- Bank {{ value.type }} ({{ value.score }}) and reroll? -->
          {{ defineRerollMessage(value) }}
        </button>
        <button @click="finishTurn()"> 
          Finish turn
        </button>
      </div>

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
import managedata from '../helpers/managedata'
import ProbabilityOverview from '../components/charts/ProbabilityOverview'

export default {
  name: 'DiceSimulator',
  components: {
    ProbabilityOverview
  },
  data: function () {
    return {
      dicePicker: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
      selectedDiceNumber: 5,
      turnInProgress: false,
      rollResult: null,
      currentTurnScore: 0,
      totalScore: 0,
      zeroTracker: 0,
      scoringDice: [],
      winScenario: false,
    }
  },
  methods: {
    defineRerollMessage(val) {
      const message = val.specialMessage ? val.specialMessage : `Bank ${val.type} (${val.score}) and reroll?`
      return message
    },
    // Logic for turns and rerolls
    finishTurn() {
      // Check zero status
      this.rollResult.score === 0 ? this.zeroTracker++ : this.zeroTracker = 0
      if (this.zeroTracker > 2) this.totalScore = 0

      // Update score and check for win condition
      this.currentTurnScore = this.rollResult.score === 0 ? 0 : this.currentTurnScore += this.rollResult.score
      this.totalScore += this.currentTurnScore
      if (this.totalScore >= 10000) this.winScenario = true

      // Reset variables
      this.currentTurnScore = 0
      this.selectedDiceNumber = 5
      this.turnInProgress = false
    },
    reRollTheDice(val) {
      if (this.selectedDiceNumber - val.dice === -1) {
        this.selectedDiceNumber = 5
      } else {
        this.selectedDiceNumber -= val.dice
      }
      this.currentTurnScore += val.score
      this.rollTheDice(this.selectedDiceNumber)
    },
    rollTheDice(diceNumber) {
      this.scoringDice = []
      this.rollResult = {
        roll: null,
        dice: diceNumber + 1,
        score: 0,
        success: false,
        tripleExists: false,
        quadExists: false,
        quintExists: false,
        sextExists: false,
        straight: false,
        threePairs: false
      }
      this.turnInProgress = true
      const dieNumbers = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)]

      if (diceNumber === 0) this.oneDieRoll(dieNumbers.slice(0,1))
      if (diceNumber === 1) this.twoDieRoll(dieNumbers.slice(0,2))
      if (diceNumber === 2) this.threeDieRoll(dieNumbers.slice(0,3))
      if (diceNumber === 3) this.fourDieRoll(dieNumbers.slice(0,4))
      if (diceNumber === 4) this.fiveDieRoll(dieNumbers.slice(0,5))
      if (diceNumber === 5) this.sixDieRoll(dieNumbers)

      if (this.rollResult.score === 0) {
        this.currentTurnScore = 0
      }

      // Account for different reroll conditions, especially scoring with all dice
      if (this.scoringDice.length > 1) {
        const totalScoringDice = this.scoringDice.map(obj => obj.dice)
        const totalScore = this.scoringDice.map(obj => obj.score)
        let dice = totalScoringDice.reduce((acc, val) => acc + val)
        let score = totalScore.reduce((acc, val) => acc + val)
        if (this.selectedDiceNumber - dice === -1) {
          this.scoringDice = [{
            dice: dice,
            score: score,
            type: "All Scores",
            specialMessage: `All dice scored! Bank ${score} and reroll all six?`
          }]
        } else {
          this.scoringDice.push({
            dice: dice,
            score: score,
            type: "All Scores"
          })
        }
      }

      // Post new rolls to the database
      managedata.setNewRoll(this.rollResult)
    },
    // Standard scores for ones and fives
    checkForOnesAndFives(roll) {
      let score = 0
      for (const die of roll) {
        if (die === 1) {
          this.scoringDice.push({type: "One", score: 100, dice: 1})
          score += 100
        }
        if (die === 5) {
          this.scoringDice.push({type: "Five", score: 50, dice: 1})
          score += 50
        }
      }

      return score
    },
    // Different dice roll calculations
    oneDieRoll(roll) {
      this.rollResult.roll = roll
      const onesAndFives = this.checkForOnesAndFives(roll)
      this.rollResult.score = onesAndFives
      this.rollResult.success = this.rollResult.score > 0 ? true : false
    },
    twoDieRoll(roll) {
      this.rollResult.roll = roll
      const onesAndFives = this.checkForOnesAndFives(roll)
      this.rollResult.score = onesAndFives
      this.rollResult.success = this.rollResult.score > 0 ? true : false
    },
    threeDieRoll(roll) {
      this.rollResult.roll = roll
      // Check for three of a kind
      if (roll[0] === roll[1] && roll[1] === roll[2]) {
        const tripleScore = roll[0] * (roll[0] === 1 ? 1000 : 100)
        this.scoringDice.push({type: `${roll[0]}s`, score: tripleScore, dice: 3})

        this.rollResult.tripleExists = true
        this.rollResult.score = tripleScore
        this.rollResult.success = true
      } else {
        const onesAndFives = this.checkForOnesAndFives(roll)
        this.rollResult.score = onesAndFives
        this.rollResult.success = this.rollResult.score > 0 ? true : false
      }
    },
    fourDieRoll(roll) {
      this.rollResult.roll = roll
      // Check for three of a kind
      for (const x of roll) {
        let likeDice = roll.filter(y => y === x)
        if (likeDice.length === 3) {
          const tripleScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100)
          this.scoringDice.push({type: `${likeDice[0]}s`, score: tripleScore, dice: 3})
          const unlikeDice = roll.filter(i => i !== likeDice[0])
          const onesAndFives = this.checkForOnesAndFives(unlikeDice)

          this.rollResult.tripleExists = true
          this.rollResult.score = tripleScore + onesAndFives
          this.rollResult.success = true
          return
        }
      }
      // Check for four of a kind
      if (roll.every(x => x === roll[0])) {
        const quadScore = roll[0] * (roll[0] === 1 ? 1000 : 100) * 2
        this.scoringDice.push({type: `${roll[0]}s`, score: quadScore, dice: 4})

        this.rollResult.quadExists = true
        this.rollResult.score = quadScore
        this.rollResult.success = true
      } else {
        const onesAndFives = this.checkForOnesAndFives(roll)
        this.rollResult.score = onesAndFives
        this.rollResult.success = this.rollResult.score > 0 ? true : false
      }
    },
    fiveDieRoll(roll) {
      this.rollResult.roll = roll
      // Checks for three of a kind or four of a kind
      for (const x of roll) {
        let likeDice = roll.filter(y => y === x)
        const unlikeDice = roll.filter(i => i !== likeDice[0])
        if (likeDice.length === 3) {
          const tripleScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100)
          this.scoringDice.push({type: `${likeDice[0]}s`, score: tripleScore, dice: 3})
          const onesAndFives = this.checkForOnesAndFives(unlikeDice)

          this.rollResult.tripleExists = true
          this.rollResult.score = tripleScore + onesAndFives
          this.rollResult.success = true
          return
        }
        if (likeDice.length === 4) {
          const quadScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2
          this.scoringDice.push({type: `${likeDice[0]}s`, score: quadScore, dice: 4})
          const onesAndFives = this.checkForOnesAndFives(unlikeDice)

          this.rollResult.quadExists = true
          this.rollResult.score = quadScore + onesAndFives
          this.rollResult.success = true
          return
        }
      }
      // Checks for five of a kind
      if (roll.every(x => x === roll[0])) {
        const quintScore = roll[0] * (roll[0] === 1 ? 1000 : 100) * 2 * 2
        this.scoringDice.push({type: `${roll[0]}s`, score: quintScore, dice: 5})

        this.rollResult.quintExists = true
        this.rollResult.score = quintScore
        this.rollResult.success = true
      } else {
        const onesAndFives = this.checkForOnesAndFives(roll)
        this.rollResult.score = onesAndFives
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
        const unlikeDice = roll.filter(i => i !== likeDice[0])
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
          const quadScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2
          this.scoringDice.push({type: `${likeDice[0]}s`, score: quadScore, dice: 4})
          const onesAndFives = this.checkForOnesAndFives(unlikeDice)

          this.rollResult.quadExists = true
          this.rollResult.score = quadScore + onesAndFives
          this.rollResult.success = true
          return
        }
        if (likeDice.length === 5) {
          const quintScore = likeDice[0] * (likeDice[0] === 1 ? 1000 : 100) * 2 * 2
          this.scoringDice.push({type: `${likeDice[0]}s`, score: quintScore, dice: 5})
          const onesAndFives = this.checkForOnesAndFives(unlikeDice)

          this.rollResult.quadExists = true
          this.rollResult.score = quintScore + onesAndFives
          this.rollResult.success = true
          return
        }
      }
      // Checks for a straight
      if (roll.includes(1) && roll.includes(2) && roll.includes(3) && roll.includes(4) && roll.includes(5) && roll.includes(6)) {
        this.scoringDice.push({type: `Straight`, score: 1500, dice: 6})
        this.rollResult.straight = true
        this.rollResult.score = 1500
        this.rollResult.success = true
      } else if (roll.every(x => x === roll[0])) {
        // Checks for six of a kind
        this.scoringDice.push({type: `SIX of a KIND`, score: 10000, dice: 6})
        this.rollResult.sextExists = true
        this.rollResult.score = 10000
        this.rollResult.success = true
      } else if (doubleCount === 6) {
        // Checks for three pairs
        this.scoringDice.push({type: `Three Pair`, score: 1000, dice: 6})
        this.rollResult.threePairs = true
        this.rollResult.score = 1000
        this.rollResult.success = true
      } else if (tripleCount === 6) {
        // Checks for two three of a kinds
        let tripleScoreA = tripleValues[0] === 1 ? tripleValues[0] * 1000 : tripleValues[0] * 100
        let tripleScoreB = tripleValues[1] === 1 ? tripleValues[1] * 1000 : tripleValues[1] * 100
        this.scoringDice.push({type: `${tripleValues[0]}s`, score: tripleScoreA, dice: 3})
        this.scoringDice.push({type: `${tripleValues[1]}s`, score: tripleScoreB, dice: 3})
        this.rollResult.score = tripleScoreA + tripleScoreB
        this.rollResult.success = true
      } else if (tripleCount === 3) {
        // checks for one three of a kind
        const tripleScore = tripleValues[0] * (tripleValues[0] === 1 ? 1000 : 100)
        const unlikeDice = roll.filter(i => i !== tripleValues[0])
        this.scoringDice.push({type: `${tripleValues[0]}s`, score: tripleScore, dice: 3})
        const onesAndFives = this.checkForOnesAndFives(unlikeDice)
        this.rollResult.tripleExists = true
        this.rollResult.score = tripleScore + onesAndFives
        this.rollResult.success = true
      } else {
        const onesAndFives = this.checkForOnesAndFives(roll)
        this.rollResult.score = onesAndFives
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
.win-screen {
  background: green;
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
