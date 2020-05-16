<template>
  <div class="home">
    <div class="welcome">
      <span class="roll-text">Roll</span>
      <span class="them-text">Them</span>
      <span class="dice-text">Dice.</span>
    </div>
    <div class="campfire">
      <img 
        :src="require('@/assets/undraw_campfire_s6y4.svg')" 
        alt="campfire"/>
      <div class="campfire-text">
        <p>Six dice is all it takes to enjoy a nice night around the campfire. This site is for anyone looking to learn a new game or a fix between camping trips.</p>
        <p>Enjoy!</p>
      </div>
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
    display: flex;
    flex-direction: column;
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
  .campfire {
    padding-top: 8%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .campfire img {
    width: 100%
  }
  .campfire p {
    font-size: 1.2em;
    font-weight: 400;
  }
  .campfire-text {
    background: #3aafa961;
    border-radius: 15px;
    padding: 1px 20px;
    width: 80%;
  }

  @media screen and (min-width: 850px) {
    .home {
      flex-direction: row;
      justify-content: space-evenly;
    }
    .welcome {
      padding: 5% 10% 0 10%;
    }
    .campfire {
      text-align: right;
      padding-top: 1%;
      max-width: 500px;
      font-size: 1.3em;
    }
  }
</style>
