<template>
  <div id="app">
    <MoviesList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MoviesList from './components/MoviesList.vue';

@Component({
  components: {
    MoviesList,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  background-color: #2c3e50;
  color: whitesmoke;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
