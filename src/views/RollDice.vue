<template>
  <div class="about">
    <h1>Roll dice here.</h1>
    <DiceSimulator />
  </div>
</template>

<script>
import DiceSimulator from '@/components/DiceSimulator.vue'

export default {
  name: 'RollDice',
  components: {
    DiceSimulator
  }
}
</script>

<style scoped>

</style>