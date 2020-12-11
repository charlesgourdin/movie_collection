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
  background: linear-gradient(301deg, rgba(3,9,24,1) 0%, rgba(4,7,25,1) 35%, rgba(29,17,45,1) 100%);
  color: whitesmoke;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
