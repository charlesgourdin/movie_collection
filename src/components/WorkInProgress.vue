<template>
  <div class="work-in-progress">
    <img class="logo" src="../assets/WIW-logo.png" alt="WIW logo" />
    <h3>This page is under construction. <br/>You can still browse the list of movies and series. Have fun!</h3>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
 .work-in-progress {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    opacity: 0.1;
    margin-bottom: 3rem;
  }

  h3 {
    margin: 0;
    line-height: 2rem;
  }
 }
</style>