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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
