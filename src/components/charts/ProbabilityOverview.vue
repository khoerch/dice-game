<template>
  <div>
    <table id="firstTable">
      <thead>
        <tr>
          <th 
            v-for="(col, index) in columns" 
            :key="index" 
            v-on:click="sortTable(col)">
              {{ col }}
              <div class="arrow" v-if="col == sortColumn" v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="(col, index) in columns" :key="index">{{displayRowData(row[col])}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

// See this link for table example I used: https://codepen.io/gmanricks/pen/JWOVGX
export default {
  name: 'ProbabilityOverview',
  data: function () {
    return {
      ascending: false,
      sortColumn: '',
      rows: [
        {
          "Dice": 1,
          "Average Score": 25,
          "Success": 0.3333,
          "Three of a Kind": 0,
          "Four of a Kind": 0,
          "Five of a Kind": 0,
          "Six of a Kind": 0,
          "Three Pair": 0,
          "Straight": 0
        },
        {
          "Dice": 2,
          "Average Score": 50,
          "Success": 0.5565,
          "Three of a Kind": 0,
          "Four of a Kind": 0,
          "Five of a Kind": 0,
          "Six of a Kind": 0,
          "Three Pair": 0,
          "Straight": 0
        },
        {
          "Dice": 3,
          "Average Score": 87,
          "Success": 0.7231,
          "Three of a Kind": 0.0279,
          "Four of a Kind": 0,
          "Five of a Kind": 0,
          "Six of a Kind": 0,
          "Three Pair": 0,
          "Straight": 0
        },
        {
          "Dice": 4,
          "Average Score": 144,
          "Success": 0.8430,
          "Three of a Kind": 0.0924,
          "Four of a Kind": 0.0047,
          "Five of a Kind": 0,
          "Six of a Kind": 0,
          "Three Pair": 0,
          "Straight": 0
        },
        {
          "Dice": 5,
          "Average Score": 225,
          "Success": 0.9233,
          "Three of a Kind": 0.1930,
          "Four of a Kind": 0.0192,
          "Five of a Kind": 0.0008,
          "Six of a Kind": 0,
          "Three Pair": 0,
          "Straight": 0
        },
        {
          "Dice": 6,
          "Average Score": 390,
          "Success": 0.9770,
          "Three of a Kind": 0.3149,
          "Four of a Kind": 0.0484,
          "Five of a Kind": 0.0039,
          "Six of a Kind": 0.00012,
          "Three Pair": 0.0392,
          "Straight": 0.0155
        },
      ]
    }
  },
  computed: {
    columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0])
    }
  },
  methods: {
    sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      var ascending = this.ascending;

      this.rows.sort(function(a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1
        }
        return 0;
      })
    },
    displayRowData(val) {
      const data = val < 1 ? `${(val * 100).toFixed(2)}%` : val
      return data
    }
  }
}
</script>

<style scoped>
  table {
    font-family: 'Open Sans', sans-serif;
    width: 750px;
    border-collapse: collapse;
    border: 3px solid #44475C;
    margin: 10px 10px 0 10px;
  }

  table th {
    text-transform: uppercase;
    text-align: left;
    background: #44475C;
    color: #FFF;
    cursor: pointer;
    padding: 8px;
    min-width: 30px;
  }
  table th:hover {
          background: #717699;
        }
  table td {
    text-align: left;
    padding: 8px;
    border-right: 5px solid #7D82A8;
  }
  table td:last-child {
    border-right: none;
  }
  table tbody tr:nth-child(2n) td {
    background: #D4D8F9;
  }

  table {
    font-family: 'Open Sans', sans-serif;
    width: 750px;
    border-collapse: collapse;
    border: 3px solid #44475C;
    margin: 10px 10px 0 10px;
  }

  table th {
    text-transform: uppercase;
    text-align: left;
    background: #44475C;
    color: #FFF;
    cursor: pointer;
    padding: 8px;
    min-width: 30px;
  }
  table th:hover {
          background: #717699;
        }
  table td {
    text-align: left;
    padding: 8px;
    border-right: 5px solid #7D82A8;
  }
  table td:last-child {
    border-right: none;
  }
  table tbody tr:nth-child(2n) td {
    background: #D4D8F9;
  }

  .arrow_down {
    border-color: black transparent;
    border-style: solid;
    border-width: 5px 5px 0px 5px;
    height: 0px;
    width: 0px;
  }
  .arrow_up {
    border-color: black transparent;
    border-style: solid;
    border-width: 0px 5px 5px 5px;
    height: 0px;
    width: 0px;
  }
  .arrow {
    float: right;
  }
</style>
