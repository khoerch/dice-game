<template>
  <div class="stats">

    <div class="dice-select">
      <div v-for="(value, index) in dicePicker" :key="value">
        <button 
            v-bind:class="[index <= selectedDiceNumber ? 'active-dice' : '', 'button']"
            @click="selectedDiceNumber = index">
          {{ value }}
        </button>
      </div>
    </div>

    <div>
      {{ summarizedData }}
    </div>

    <bar-chart :chart-data="chartData" :options="chartOptions"/>

  </div>
</template>

<script>
import BarChart from '../charts/BarChart'

export default {
  name: 'RollStatistics',
  components: {
    BarChart
  },
  data: function () {
    return {
      dicePicker: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
      selectedDiceNumber: -1,
      summarizedData: null,
      chartData: null,
      chartOptions: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    }
  },
  watch: {
    selectedDiceNumber: function() {
      this.summarizeHistoricalData()
      this.summarizeDataforChart()
    }
  },
  methods: {
    summarizeDataforChart() {
      const rolls = this.$store.state.allRolls.filter(roll => roll.dice === (this.selectedDiceNumber+1))
      const scoreTypes = []
      const chartSummary = []
      for (const roll of rolls) {
        if (!scoreTypes.includes(roll.score)) {
          scoreTypes.push(roll.score)
        }
      }
      scoreTypes.sort((a, b) => a - b)

      let start = 0
      while (start <= scoreTypes[scoreTypes.length - 1]) {
        const count = rolls.filter(roll => roll.score === start).length
        chartSummary.push({
          label: start,
          data: count
        })
        start += 50
      }

      this.chartData = {
        labels: chartSummary.map(elem => elem.label),
        datasets: [{
            label: '# of Votes',
            data: chartSummary.map(elem => elem.data),
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
      }
    },
    summarizeHistoricalData() {
      const rolls = this.$store.state.allRolls.filter(roll => roll.dice === (this.selectedDiceNumber+1))
      console.log("Rolls in database", rolls.length)
      this.summarizedData = {
        totalRolls: 0,
        totalScore: 0,
        totalSuccesses: 0,
        totalTriples: 0,
        totalQuads: 0,
        totalQuints: 0,
        totalSexts: 0,
        totalStraights: 0,
        totalThreePairs: 0,
        scoreAverage: 0,
        successRate: 0,
        tripleRate: 0,
        quadRate: 0,
        quintRate: 0,
        sextRate: 0,
        straightRate: 0,
        threePairRate: 0
      }

      for (const roll of rolls) {
        this.summarizedData.totalScore += roll.score
        if (roll.success) {
          this.summarizedData.totalSuccesses++
        }
        if (roll.tripleExists) {
          this.summarizedData.totalTriples++
        }
        if (roll.quadExists) {
          this.summarizedData.totalQuads++
        }
        if (roll.quintExists) {
          this.summarizedData.totalQuints++
        }
        if (roll.sextExists) {
          this.summarizedData.totalSexts++
        }
        if (roll.straight) {
          this.summarizedData.totalStraights++
        }
        if (roll.threePairs) {
          this.summarizedData.totalThreePairs++
        }
      }

      this.summarizedData.totalRolls = rolls.length
      this.summarizedData.scoreAverage = this.summarizedData.totalScore / rolls.length
      this.summarizedData.successRate = this.summarizedData.totalSuccesses / rolls.length
      this.summarizedData.tripleRate = this.summarizedData.totalTriples / rolls.length
      this.summarizedData.quadRate = this.summarizedData.totalQuads / rolls.length
      this.summarizedData.quintRate = this.summarizedData.totalQuints / rolls.length
      this.summarizedData.sextRate = this.summarizedData.totalSexts / rolls.length
      this.summarizedData.straightRate = this.summarizedData.totalStraights / rolls.length
      this.summarizedData.threePairRate = this.summarizedData.totalThreePairs / rolls.length
    },
  }
}
</script>

<style scoped>
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
