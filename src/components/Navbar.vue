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
      <div v-if="results.length > 0" class="result">
        <p
          class="result-item"
          v-for="result in results"
          :key="result.name"
          v-on:click="displayItem(result.id)"
        >
          {{ result.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Navbar extends Vue {
  search: string = "";
  results: any[] = [];

  async fetchSearch() {
    if(this.search.length > 2) {
      const response = await axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=49f6cce872dedfb45746781479e03ce5&query=${this.search}&page=1`);
  
      this.results = response.data.results;
    } else {
      this.results = [];
    }
  }

  displayItem(id: number) {
    this.results = [];
    this.search = "";
    this.$store.dispatch('fetchMovies', {id})
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

      .result {
        position: absolute;
        top: 3rem;
        width: 15rem;
        border-radius: .5rem;
        padding: .5rem 0;
        background-color: whitesmoke;
        color: black;

        .result-item {
          margin: 0;
          padding: .5rem;
          text-align: left;
          cursor: pointer;

          &:hover {
            background-color: rgb(170, 178, 196);
          }
        }
      }
    }

  }
</style>
