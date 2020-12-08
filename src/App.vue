<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome Charles, to Your Vue.js App"/> -->
    <MovieList />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MovieList from './components/MoviesList.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MovieList,

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
