<template>
  <div class="dice">
    <header>
      <h1>ROLL YOUR DICE HERE</h1>
      <div class="top">
        <div class="left-text">
          <p>Simulate your rolls and track your scores. You'll see your results for each roll along with options for rerolling.</p>
          <p>Wondering what the chance of a successful roll might be? Click <strong>Show me the odds!</strong> to find out!</p>
        </div>

        <div class="right-button">
          <button @click="showOddsTable = !showOddsTable">
              Show me the odds!
          </button>
          <ProbabilityOverview v-model="showOddsTable"/>
        </div>
      </div>
    </header>
    <DiceSimulator />
  </div>
</template>

<script>
import DiceSimulator from '@/components/DiceSimulator.vue'
import ProbabilityOverview from '../components/charts/ProbabilityOverview'

export default {
  name: 'RollDice',
  components: {
    ProbabilityOverview,
    DiceSimulator
  },
  data: function () {
    return {
      showOddsTable: false
    }
  }
}
</script>

<style scoped>
  .dice {
    padding-top: 5%;
  }
  .top {
    max-width: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .left-text {
    max-width: 600px;
  }
  .right-button button {
    background: #2b7a78;
    margin-top: 20px;
  }

  @media screen and (min-width: 725px) {
    .top {
      flex-direction: row;
    }
    .left-text {
      max-width: 400px;
    }
  }
</style>