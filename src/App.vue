<template>
  <div id="app">
    <div id="nav">
      <img 
        :src="require('@/assets/dice-logo1.svg')" 
        :alt="diceLogoAlt"/>
      <router-link to="/">Home</router-link> |
      <router-link to="/roll-dice">Roll Dice</router-link> |
      <router-link to="/rules">Rules</router-link> |
      <router-link to="/stats">Stats</router-link>
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
body {
  background: #F2F2F2;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #17252A;
}

#nav {
  padding: 5%;
}

#nav a {
  font-weight: bold;
  color: #17252A;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #3AAFA9;
  text-decoration: underline;
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
</style>
