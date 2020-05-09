<template>
  <div class="dice">
    <header>
      <h1>ROLL THEM DICE</h1>
      <div class="top">
        <div class="left-text">
          <p>Simulate your rolls and track your scores. You'll see your results for each roll along with options for rerolling.</p>
          <p>Wondering what the chance of a successful roll might be? Click 'Show me the odds!' to find out!</p>
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
    padding: 3% 7%;
  }
  .top {
    max-width: 750px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .left-text {
    max-width: 400px;
  }

  @media screen and (max-width: 725px) {
    .top {
      flex-direction: column;
    }
    .left-text {
      max-width: 600px;
    }
  }
</style>