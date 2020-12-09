<template>
  <div class="movies" >
    <MovieItem
      v-for="movie in movies"
      :key="movie.id"
      v-bind:movie="movie"
    />
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue';
import axios from 'axios';

export default {
  name: 'MoviesList',
  components: {
    MovieItem,
  },
  data() {
    return {
      movies: [],
    }
  },
  methods: {
    async fetchMovies() {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=49f6cce872dedfb45746781479e03ce5`);
      this.movies = response.data.results
        .filter(({vote_average}) => vote_average > 0);
    },
  },
  async created() {
    await this.fetchMovies();
  }
 };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .movies{
    width: fit-content;
    padding: auto;
    display: flex;
    flex-wrap: wrap;
  }
</style>
