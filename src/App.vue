<template>
  <div id="app">
    <div id="nav">
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
  mounted: function () {
    this.$store.dispatch('getHistoricalRolls')
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px 7%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* Standardize button styling */
button {
    display: inline-block;
    border: none;
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    margin: 0;
    text-decoration: none;
    background: #0069ed;
    color: #ffffff;
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
    background: #0053ba;
}
button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
}
button:active {
    transform: scale(0.99);
}
</style>
