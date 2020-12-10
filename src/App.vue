<template>
  <div id="app">
    <MovieList />
  </div>
</template>

<script>
import MovieList from './components/MoviesList.vue';

export default {
  name: 'App',
  components: {
    MovieList,
  },
}
</script>

<style>
body {
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
