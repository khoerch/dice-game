<template>
  <div id="app">
    <div id="nav">
      <img 
        :src="require('@/assets/dice-logo2.svg')" 
        :alt="diceLogoAlt"/>
      <div id="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/roll-dice">Roll Dice</router-link>
        <router-link to="/rules">Rules</router-link>
        <router-link to="/stats">Stats</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      diceLogoAlt: "Dice logo",
    }
  },
  mounted: function () {
    this.$store.dispatch('getHistoricalRolls')
  }
}
</script>

<style>
  html {
    box-sizing: border-box;
    height: 89%;
    font-family: Helvetica, Arial, sans-serif;
  }
  body {
    background: #F2F2F2;
    margin: 0;
    padding: 0 0 100px 0;
    position: relative;
    min-height: 100%;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #17252A;
    padding: 5% 7%;
  }
  #nav {
    /* padding: 5%; */
    display: flex;
  }
  #nav a {
    font-weight: bold;
    color: #17252A;
    text-decoration: none;
    padding: 5px 10px;
    margin: 0px;
  }
  #nav a.router-link-exact-active {
    background: #3AAFA9;
    color: #f2f2f2;
  }
  #nav img {
    height: 40px;
  }
  #nav-links {
    margin-left: 5%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  /* Standardize button styling */
  button {
      display: inline-block;
      border: none;
      border-radius: 5px;
      padding: 0.75rem 1.5rem;
      margin: 0;
      text-decoration: none;
      background: #3AAFA9;
      color: #F2F2F2;
      font-family: inherit;
      font-size: 1rem;
      cursor: pointer;
      text-align: center;
      transition: background 250ms ease-in-out, 
                  transform 150ms ease;
      -webkit-appearance: none;
      -moz-appearance: none;
  }
  button:hover {
      background: #2B7A78;
  }

  /* Footer Styling */
  footer {
    background-color: #3AAFA9;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    height: 15%;
    max-height: 120px;
  }
  footer p {
    color: #F2F2F2;
    font-weight: 600;
    padding-top: 15px;
  }
  footer img {
    height: 35px;
  }

  @media screen and (min-width: 650px) {
    #nav a {
      padding: 7px 20px;
      margin: 0px 10px;
    }
    #nav img {
      height: 60px;
    }
  }
</style>
