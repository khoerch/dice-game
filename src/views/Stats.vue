<template>
  <div class="stats">
    <h1>Roll statistics displayed here.</h1>
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
    padding: 3% 7%;
  }
</style>