<template>
  <div class="movies">
    <CurrentSearch />
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
import { mapState } from 'vuex';

import MovieItem from './MovieItem.vue';
import CurrentSearch from './CurrentSearch.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilm, faCaretRight } from '@fortawesome/free-solid-svg-icons';
 
library.add(faFilm, faCaretRight);

@Component({
  components: {
    MovieItem,
    CurrentSearch
  },
  computed: mapState([
    'movies',
    'pages',
  ])
})
export default class MoviesList extends Vue {
  created() {
    if(this.$route.params.cat === 'trending')
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
    min-height: 100vh;

    .no-movies {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
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
      padding-top: 8rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(18rem, max-content));
      grid-gap: 3rem;
      justify-content: center;
    }

    .show-more {
      cursor: pointer;
      margin-bottom: 2rem;
    }
  }
</style>
