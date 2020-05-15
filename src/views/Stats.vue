<template>
  <div class="stats">
    <h1>ROLL STATISTICS</h1>
    <p>Curious to see how others have rolled? Select the number of dice below and see stats on all the rolls in the database!</p>
    <RollStatistics />
  </div>
</template>

<script>
import RollStatistics from '@/components/RollStatistics.vue'

export default {
  name: 'Stats',
  components: {
    RollStatistics
  }
}
</script>

<style scoped>
  .stats {
    padding-top: 5%;
    max-width: 750px;
  }
  p {
    max-width: 400px;
  }
</style>