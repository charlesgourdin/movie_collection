<template>
  <div class="movie-item">
    <img :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path" alt="movie.title" />
    <h2 class="movie-title">
      {{ movie.title }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'MovieItem',
  props: {
    movie: Object,
  },
  methods: {
  },
  async created() {
    // console.log(this.movie.title);
  }
 };
</script>

<style scoped>
  .movie-item{
    width: 16rem;
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img{
    width: 16rem;
  }

  .movie-title{
    width: 100%;
    font-size: 1.25rem;
    text-align: left;
    margin: .75rem 0;
    color: whitesmoke;
  }

</style>