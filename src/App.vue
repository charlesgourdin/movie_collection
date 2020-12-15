<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <MoviesList />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from './components/Navbar.vue';
import MoviesList from './components/MoviesList.vue';

@Component({
  components: {
    Navbar,
    MoviesList,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  background: linear-gradient(301deg, rgba(3,9,24,1) 0%, rgba(4,7,25,1) 35%, #041337 100%);
  // background-color: #020f2c;
  color: whitesmoke;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .container {
    margin-top: 4rem;
  }
}
</style>
