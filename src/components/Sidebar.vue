<template>
  <div :class="'sidebar' + ' ' + getOpenStatus">
    <router-link to="/">
      <div class="logo-container" @click="setCurrentPath('/')">
        <img class="logo" src="../assets/WIW-logo.png" alt="WIW logo" />
        <h2 v-if="isOpen">what I watch</h2>
      </div>
    </router-link>
    <div :class="'search-bar' + ' ' + getOpenStatus" @click="openSidebar()">
      <input
        :class="getOpenStatus"
        v-model="search"
        placeholder="search a movie..."
        @keyup.enter="fetchSearch"
      >
      <font-awesome-icon
        :class="'icon' + ' ' + getOpenStatus"
        :icon="['fas', 'search']"
        size="lg"
        v-on:click="fetchSearch"
      />
    </div>
    <router-link to="/movies/trending">
      <div
        class="movies"
        @click="openSidebar(),
        setCurrentPath('/movies/trending'),
        fetchMovies()"
      >
        <font-awesome-icon
          :class="'icon' + ' ' + getOpenStatus"
          :icon="['fas', 'film']"
          size="2x"
        />
        <h3 v-if="isOpen">Movies</h3>
      </div>
    </router-link>
    <div v-if="isOpen"
      class="outside"
      @click="closeSidebar()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilm, faSearch } from '@fortawesome/free-solid-svg-icons';
 
library.add(faFilm, faSearch);

@Component
export default class Sidebar extends Vue {
  isOpen: boolean = false;
  search: string = "";
  path: string = "";

  fetchMovies() {
    this.$store.dispatch('fetchMovies', {id: null});
  }

  fetchSearch() {
    if(this.search.length > 2 && this.isOpen) {
      if(this.path !== '/movies/search') {
        this.$router.push('/movies/search')
        this.path = '/movies/search'
      }
      this.$store.dispatch('fetchSearch', {search: this.search});
    }
  }

  setCurrentPath(path: string) {
    this.path = path;
  }

  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  get getOpenStatus() {
    return this.isOpen
      ? "isOpen"
      : ""
  }

  created() {
    this.path = ( this as any ).$router.history.current.path
  }

}
</script>

<style lang="scss" scoped>
  .sidebar {
    z-index: 10;
    height: 100vh;
    width: 5rem;
    background-color: rgb(9, 11, 21);
    position: fixed;
    padding: 1.5rem 0;
    transition-duration: 400ms;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.isOpen {
      align-items: flex-start;
      transition-duration: 400ms;
      width: 18rem;
      padding-left: 2rem;
    }

    .logo-container {
      display: flex;
      cursor: pointer;

      .logo {
        width: 3rem;
        height: 2.5rem;
      }

      h2 {
        animation: slide-in-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        margin: .25rem 0 0 .75rem;
        white-space: nowrap;
      }
    }

    .search-bar {
      height: 12rem;
      cursor: pointer;
      display: flex;
      align-items: center;

      &.isOpen {
        position: relative;
      }

      input {
        width: 0;
        border: none;
        height: 3rem;
        background-color: rgb(9, 11, 21);
        color: whitesmoke;

        &.isOpen {
          transition-duration: 400ms;
          width: 12rem;
          padding: 0 1rem 0 2.75rem;
          border-radius: .5rem;
          background-color: #1a2030;  
        }
      }

      .icon {
        color: rgb(179, 179, 179);
        margin: 0 .25rem;

        &.isOpen {
          position: absolute;
          left: .5rem;
        }
      }
    }

    .movies {
      color: whitesmoke;
      cursor: pointer;
      display: flex;
      align-items: center;

      h3 {
        animation: slide-in-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        margin-left: 1rem;
      }
    }

    .outside {
      width: calc(100vw - 20rem);
      height: 100vh;
      position: fixed;
      right: 0;
      top: 0;
    }

  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
              transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }

  }
</style>
