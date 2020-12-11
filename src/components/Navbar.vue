<template>
  <div class="navbar">
    <div class="search-bar">
      <input
        v-model="search"
        placeholder="modifiez-moi"
        @keyup="fetchSearch"
      >
      <div v-if="results.length > 0" class="result">
        <p class="result-item" v-for="result in results" :key="result.name">{{ result.title }}</p>
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

    .search-bar {
      position: relative;
      width: 15rem;

      input {
        border: none;
        padding: 0 .5rem;
        height: 2rem;
        width: 14rem;
      }

      .result {
        position: absolute;
        top: 2rem;
        width: 15rem;
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
