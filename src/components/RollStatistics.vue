<template>
  <div class="charts">
    <div class="dice-select">
      <img 
        v-for="(dice, index) in diceImages" 
        :src="require('../assets/' + dice + '.svg')"
        :alt="dice"
        :class="index === selectedDiceNumber ? 'selectedDice' : 'notSelected'"
        @click="selectedDiceNumber = index"
        :tabindex="index"
        :key="index"/>
    </div>

    <div v-if="selectedDiceNumber >= 0" class="chart-area">
      <div class="tabs">
        <button 
            v-for="(value, index) in tabPicker"
            :class="tabPicker[index].visible ? 'selectedTab' : 'notSelected'"
            @click="tabUpdate(value.name)"
            :key="value.name">
          {{ value.name }}
        </button>
      </div>
      <div>
        <bar-chart v-show="tabPicker[0].visible" :chart-data="chartDataScores" :options="chartOptionsBar"/>
        <bar-chart v-show="tabPicker[1].visible" :chart-data="chartDataRollTypes" :options="chartOptionsBar"/>
        <doughnut-chart v-show="tabPicker[2].visible" :chart-data="chartDataSuccesses" :options="chartOptionsDoughnut"/>
        <!-- <div v-show="tabPicker[3].visible">
          {{ summarizedData }}
        </div> -->
      </div>
    </div>

  </div>
</template>

<script>
import BarChart from './charts/BarChart'
import DoughnutChart from './charts/DoughnutChart'

export default {
  name: 'RollStatistics',
  components: {
    BarChart,
    DoughnutChart,
  },
  data: function () {
    return {
      dicePicker: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
      diceImages: ['dice1', 'dice2', 'dice3', 'dice4', 'dice5', 'dice6'],
      tabPicker: [
        {
          name: 'Scores',
          visible: true
        },
        {
          name: 'Roll Types',
          visible: false
        },
        {
          name: 'Successes',
          visible: false
        },
        // {
        //   name: 'Summary',
        //   visible: false
        // },
      ],
      selectedDiceNumber: -1,
      summarizedData: null,
      chartDataScores: {},
      chartDataRollTypes: {},
      chartDataSuccesses: {},
      chartOptionsDoughnut: {},
      chartOptionsBar: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }],
              xAxes: [{
                  gridLines: {
                    drawOnChartArea: false
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
    tabUpdate(name) {
      for (const tab of this.tabPicker) {
        tab.visible = false
      }
      const selectedTab = this.tabPicker.find(tab => tab.name === name)
      selectedTab.visible = true
    },
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

      this.chartDataScores = {
        labels: chartSummary.map(elem => elem.label),
        datasets: [{
            label: '# of Scores',
            data: chartSummary.map(elem => elem.data),
            backgroundColor: ['#2b7a78', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9', '#3aafa9'],
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

      this.chartDataRollTypes = {
        labels: ['Three of a Kind', 'Four of a Kind', 'Five of a Kind', 'Six of a Kind', 'Three Pair', 'Straight'],
        datasets: [{
            label: '# of Roll Types',
            data: [this.summarizedData.totalTriples, this.summarizedData.totalQuads, this.summarizedData.totalQuints, this.summarizedData.totalSexts, this.summarizedData.totalThreePairs, this.summarizedData.totalStraights],
            backgroundColor: ['#3aafa9', '#3aafa9', '#3aafa9', '#ffbf00', '#3aafa9', '#3aafa9'],
            borderColor: [],
            borderWidth: 1
        }]
      }

      this.chartDataSuccesses = {
        labels: ['Success', 'Failure'],
        datasets: [{
            label: '# of Rolls',
            data: [this.summarizedData.totalSuccesses, (this.summarizedData.totalRolls - this.summarizedData.totalSuccesses)],
            backgroundColor: ['#3aafa9', '#2b7a78'],
            borderColor: [],
            borderWidth: 1
        }]
      }
    },
  }
}
</script>

<style scoped>
  .dice-select, .tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .chart-area {
    padding: 25px;
    margin: 4% 0;
    border-radius: 15px;
    background: #3aafa940;
  }
  button {
    margin: 10px;
  }
  button:focus, .selectedTab {
    background: #2B7A78;
    outline: none;
    font-weight: 600;
  }
  img {
    padding: 0.8rem;
    margin: 5px;
    cursor: pointer;
    height: 4rem;
  }
  img:hover, .selectedDice {
    border-radius: 25px;
    background: #2B7A78;
    outline: none;
  }
</style>
