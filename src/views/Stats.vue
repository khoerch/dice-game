<template>
  <div class="about">
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

</style>