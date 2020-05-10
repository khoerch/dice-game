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
        <div v-if="turnInProgress" class="roll-result">
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
          <button @click="finishTurn()" class="finish-button"> 
            Finish turn
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import managedata from '../helpers/managedata'
// import diceLogic from '../helpers/diceLogic'

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

      if (this.selectedDiceNumber === 0) this.oneDieRoll(dieNumbers.slice(0,1))
      if (this.selectedDiceNumber === 1) this.twoDieRoll(dieNumbers.slice(0,2))
      if (this.selectedDiceNumber === 2) this.threeDieRoll(dieNumbers.slice(0,3))
      if (this.selectedDiceNumber === 3) this.fourDieRoll(dieNumbers.slice(0,4))
      if (this.selectedDiceNumber === 4) this.fiveDieRoll(dieNumbers.slice(0,5))
      if (this.selectedDiceNumber === 5) this.sixDieRoll(dieNumbers)

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
    }
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
    max-height: 25px;
    padding: 5px;
  }
  .throw-success {
    color: green;
  }
  .throw-failed {
    color: red;
  }
  .finish-button {
    background:rgb(94, 94, 94)
  }

  @media screen and (max-width: 725px) {
    .game-area {
      flex-direction: column;
    }
    .dice-select, .reroll-options {
      align-items: center;
      margin-top: 10px;
    }
    .roll-result{
      text-align: center;
    }
  }
</style>
