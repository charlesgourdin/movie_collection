<template>
  <div id="app">
    <Sidebar />
    <div class="container">
      <MoviesList />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from './components/Sidebar.vue';
import MoviesList from './components/MoviesList.vue';

@Component({
  components: {
    MoviesList,
    Sidebar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@font-face { 
  font-family: "century-gothic";
  src: url("./assets/fonts/Century_Gothic_400.ttf"); 
}

body {
  background: linear-gradient(301deg, rgba(3,9,24,1) 0%, rgba(4,7,25,1) 35%, #041337 100%);
  color: whitesmoke;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: 'century-gothic';


  .container {
    margin-left: 5rem;
  }
}
</style>
