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
      Hello!!
      {{ rollResult }}
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
      this.rollResult = roll
    },
    twoDieRoll(roll) {
      this.rollResult = roll
    },
    threeDieRoll(roll) {
      this.rollResult = roll
    },
    fourDieRoll(roll) {
      this.rollResult = roll
    },
    fiveDieRoll(roll) {
      this.rollResult = roll
    },
    sixDieRoll(roll) {
      this.rollResult = roll
    },
  }
}
</script>

<style scoped>
.active-dice {
  background: blue;
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
