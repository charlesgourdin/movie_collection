<template>
  <div class="movies">
    <MovieItem
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MovieItem from './MovieItem.vue';
import axios from 'axios';

@Component({
  components: {
    MovieItem,
  },
})

export default class MoviesList extends Vue {
  movies = [];

  async created() {
    await this.fetchMovies();
  }

  async fetchMovies() {
    const response = await axios
      .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=49f6cce872dedfb45746781479e03ce5`);

    this.movies = response.data.results
      .filter(({vote_average}: any) => vote_average > 0);
  }
}
</script>

<style scoped>
  .movies {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, max-content));
    grid-gap: 3rem;
    justify-content: center;
    padding: initial;
  }
</style>
