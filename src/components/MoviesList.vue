<template>
  <div class="movies">
    <div v-if="movies.length === 0" class="no-movies">
      <h2>Oh, there's no movies here...</h2>
      <p>Use the search bar or choose a category!</p>
    </div>
    <div class="list">
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div class="show-more" v-if="pages.total > pages.current">
      <h3 v-on:click="showMore()">Show more...</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MovieItem from './MovieItem.vue';
import { mapState } from 'vuex';

@Component({
  components: {
    MovieItem,
  },
  computed: mapState([
    'movies',
    'pages'
  ])
})
export default class MoviesList extends Vue {
  created() {
    this.$store.dispatch('fetchMovies', {id: null})
  }

  showMore() {
    const { currentSearch, pages: {current}} = this.$store.state
    this.$store.dispatch('getMovieBy', {request: currentSearch, page: current + 1})
  }
}
</script>

<style lang="scss" scoped>
  .movies{
    width: 100%;
    min-height: calc(100vh - 4rem);

    .no-movies {
      height: calc(100vh - 4rem);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #433c4d;

      h2 {
        font-size: 2rem;
      }
    }

    .list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(18rem, max-content));
      grid-gap: 3rem;
      justify-content: center;
      padding: initial;
    }

    .show-more {
      cursor: pointer;
      margin-bottom: 2rem;
    }
  }
</style>
