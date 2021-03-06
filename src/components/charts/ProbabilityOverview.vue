<template>
  <div class="modal" v-show="value">
    <div class="modal-wrapper" v-show="value">
      <div class="modal-container" v-show="value">
        <table id="firstTable">
          <thead>
            <tr>
              <th 
                v-for="(col, index) in columns" 
                :key="index" 
                :class="[index > 2 ? 'inActive' : 'active']"
                v-on:click="sortTable(col)">
                  <div>
                    <span>{{ col }}</span>
                    <div class="arrow" v-if="col == sortColumn" v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"></div>
                  </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="index">
              <td 
                v-for="(col, index) in columns" 
                :class="[index > 2 ? 'inActive' : 'active']"
                :key="index">
                {{displayRowData(row[col])}}
              </td>
            </tr>
          </tbody>
        </table>
        
        <button @click.prevent="closeModal">
          Never tell me the odds!
        </button>
      </div>
    </div>
  </div>
</template>

<script>

// See this link for table example I used: https://codepen.io/gmanricks/pen/JWOVGX
export default {
  name: 'ProbabilityOverview',
  props: {
      value: {
          required: true,
          type: Boolean
      }
  },
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
    closeModal() {
      this.$emit("input", !this.value);
    },
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
  /* Styling for modal positioning */
  .modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    max-width: 800px;
    min-height: 400px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #f2f2f2;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  /* Styling for the stats table */
  table {
    max-width: 750px;
    border-collapse: collapse;
    border: 3px solid #2b7a78;
    margin: 10px 10px 0 10px;
  }
  table th {
    background: #2b7a78;
    color: #f2f2f2;
    cursor: pointer;
    padding: 8px;
    min-width: 50px;
  }
  table th:hover {
    background: #3aafa9;
  }
  table th div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  table td {
    text-align: center;
    padding: 8px;
    /* border-right: 3px solid #44475C; */
  }
  table td:last-child {
    border-right: none;
  }
  table tbody tr:nth-child(2n) td {
    background: #bdebe8;
  }
  .arrow_down {
    border-color: white transparent;
    border-style: solid;
    border-width: 5px 5px 0px 5px;
    height: 0px;
    width: 0px;
  }
  .arrow_up {
    border-color: white transparent;
    border-style: solid;
    border-width: 0px 5px 5px 5px;
    height: 0px;
    width: 0px;
  }
  .arrow {
    margin: 0px 0px 0px 5px;
  }

  /* Limit table size for smaller screens */
  @media screen and (max-width: 875px) {
    .inActive {
      display: none;
    }
    .modal-container {
      margin: 0px auto;
      max-width: 300px;
      font-size: .9em;
      padding: 0px 20px;
    }
  }
</style>
