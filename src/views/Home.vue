<template>
  <div class="home">
    <MainScreen msg="Welcome to Your Dice App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainScreen from '@/components/MainScreen.vue'

export default {
  name: 'Home',
  components: {
    MainScreen
  }
}
</script>

<style scoped>
  .home {
    padding: 3% 7%;
  }
</style>
