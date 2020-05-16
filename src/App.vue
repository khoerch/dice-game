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
    height: 100%;
  }
  body {
    background: #F2F2F2;
    margin: 0;
    padding: 0;
    position: relative;
    min-height: 100%;
  }
  #app {
    font-family: Helvetica, Arial, sans-serif;
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
    padding: 7px 20px;
    margin: 0px 10px
  }
  #nav a.router-link-exact-active {
    background: #3AAFA9;
    color: #f2f2f2;
  }
  #nav img {
    height: 60px;
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
  button:hover,
  button:focus {
      background: #2B7A78;
  }
  button:focus {
      outline: 1px solid #fff;
      outline-offset: -4px;
  }
  button:active {
      transform: scale(0.99);
  }

  footer {
    /* position: fixed; */
    background-color: #3AAFA9;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
  }

  @media screen and (max-width: 600px) {
    /* .nav-links {
      min-width: 300px;
    } */
    #nav a {
      padding: 5px 10px;
      margin: 0px;
      /* font-size: .9em; */
    }
    #nav img {
      height: 40px;
    }
    #nav-links {
      margin-left: 5%;
    }
  }
</style>
