<template>
  <div class="home">
    <div class="welcome">
      <span class="roll-text">Roll</span>
      <span class="them-text">Them</span>
      <span class="dice-text">Dice.</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>
  .home {
    padding-top: 5%;
  }
  .welcome {
    padding: 10% 10% 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 5em;
    font-weight: 1000;
  }
  .roll-text {
    color: #3AAFA9;
  }
  .them-text {
    color: #2B7A78;
  }
</style>
