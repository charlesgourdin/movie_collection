<template>
  <div class="navbar">
    <div class="menu">
      <h2 v-on:click="getMovieBy('popular')">Popular</h2>
      <h2 v-on:click="getMovieBy('top_rated')">Top rated</h2>
    </div>
    <div class="search-bar">
      <input
        v-model="search"
        placeholder="search a movie..."
        @keyup="fetchSearch"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
  search: string = "";

  fetchSearch() {
    this.$store.dispatch('fetchSearch', {search: this.search});
  }

  getMovieBy(request: string) {
    window.scrollTo(0,0);
    this.$store.dispatch('getMovieBy', {request, page: 1})
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    z-index: 10;
    width: 100vw;
    height: 4rem;
    background-color: rgb(7, 6, 9);
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .menu {
      display: flex;
      margin-left: 1rem;

      h2 {
        cursor: pointer;
        margin-right: 2rem;
        font-size: 1rem;
      }
    }

    .search-bar {
      position: relative;
      width: 15rem;
      margin-left: auto;
      margin-right: 1rem;

      input {
        border: none;
        padding: 0 1rem;
        height: 2rem;
        width: 12rem;
        border-radius: 1rem;
      }
    }
  }
</style>
