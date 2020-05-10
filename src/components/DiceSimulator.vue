<template>
  <div class="simulator">
    <div v-if="totalTurns === 0" class="start-button">
      <button @click="rollTheDice()"> 
        Start Game!
      </button>
    </div>

    <div v-else class="game-area">
      <div class="score-tracker">
        <div class="score-totals">
          <h2>Total Score: {{ totalScore }}</h2>
          <h2>Turns: {{ totalTurns }}</h2>
          <h2 v-if="zeroTracker > 0">Zero Tracker: {{ zeroTracker }}</h2>
        </div>
        <div v-if="turnInProgress">
          <h2 v-show="rollResult.success" class="throw-success">Success!</h2>
          <h2 v-show="!rollResult.success" class="throw-failed">Failed</h2>
          <h2>Bank: {{ currentTurnScore }}</h2>
          <h2>Score: {{ rollResult.score }}</h2>
          <h2 v-show="rollResult.tripleExists">Three of a Kind!</h2>
          <h2 v-show="rollResult.quadExists">Four of a Kind!</h2>
          <h2 v-show="rollResult.quintExists">Five of a Kind!</h2>
          <h2 v-show="rollResult.sextExists">Six of a Kind!</h2>
          <h2 v-show="rollResult.straight">Straight!</h2>
          <h2 v-show="rollResult.threePairs">Three Pairs!</h2>
          <div class="dice-icons">
            <img 
              v-for="(dice, index) in rollResult.roll" 
              :src="require('../assets/dice' + dice + '.svg')"
              :alt="dice"
              :key="index"/>
          </div>
        </div>
      </div>

      <div class="dice-select">
        <button v-if="!turnInProgress" @click="rollTheDice()"> 
          Roll them dice!
        </button>

        <div class="reroll-options" v-if="turnInProgress">
          <button 
              v-for="(value, index) in scoringDice" 
              @click="reRollTheDice(value)" 
              :key="index + 100"> 
            {{ defineRerollMessage(value) }}
          </button>
          <button @click="finishTurn()"> 
            Finish turn
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import managedata from '../helpers/managedata'
import diceLogic from '../helpers/diceLogic'

export default {
  name: 'DiceSimulator',
  data: function () {
    return {
      totalTurns: 0,
      totalRerolls: 0,
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
    showDiceIcons(num) {
      let iconSrc = `../assets/dice${num}.svg`
      return iconSrc
    },
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

      // Update variables
      this.totalRerolls = 0
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
      this.totalRerolls += 1
      this.currentTurnScore += val.score
      this.rollTheDice()
    },
    rollTheDice() {
      if (this.totalRerolls === 0) this.totalTurns += 1
      this.scoringDice = []
      this.rollResult = {
        roll: null,
        dice: this.selectedDiceNumber + 1,
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

      if (this.selectedDiceNumber === 0) diceLogic.oneDieRoll(dieNumbers.slice(0,1))
      if (this.selectedDiceNumber === 1) diceLogic.twoDieRoll(dieNumbers.slice(0,2))
      if (this.selectedDiceNumber === 2) diceLogic.threeDieRoll(dieNumbers.slice(0,3))
      if (this.selectedDiceNumber === 3) diceLogic.fourDieRoll(dieNumbers.slice(0,4))
      if (this.selectedDiceNumber === 4) diceLogic.fiveDieRoll(dieNumbers.slice(0,5))
      if (this.selectedDiceNumber === 5) diceLogic.sixDieRoll(dieNumbers)

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
      } else if (this.scoringDice.length === 1 && (this.selectedDiceNumber - this.scoringDice[0].dice === -1)) {
        this.scoringDice[0].specialMessage = `All dice scored! Bank ${this.scoringDice[0].score} and reroll all six?`
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
  }
}
</script>

<style scoped>
  h2 {
    margin: 0;
    padding: 0;
  }
  .simulator {
    margin: 50px 0px;
    max-width: 750px;
  }
  .game-area {
    padding: 25px;
    border-radius: 15px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    background: lightgrey;
  }
  .start-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dice-select, .reroll-options {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
  .reroll-options button {
    margin: 5px 0px;
  }
  .score-totals {
    background: rgb(46, 46, 46);
    border-radius: 10px;
    color: white;
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .dice-icons {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
  }
  img {
    max-height: 50px;
    padding: 5px;
  }
  .throw-success {
    color: green;
  }
  .throw-failed {
    color: red;
  }
</style>
