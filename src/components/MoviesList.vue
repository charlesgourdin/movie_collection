<template>
  <div class="movies">
    {{ movies.title }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MoviesList',
  data() {
    return {
      movies: {},
    }
  },
  methods: {
  },
  async created() {
    const response = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=49f6cce872dedfb45746781479e03ce5');

    console.log(response.data)

    this.movies = response.data;
  }
 };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
