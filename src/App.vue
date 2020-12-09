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
body{
  overflow-x: hidden;
  margin: 0;
}

#app {
  width: 100vw;
  min-height: 100vh;
  background-color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
