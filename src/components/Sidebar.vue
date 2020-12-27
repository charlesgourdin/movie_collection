<template>
  <div :class="'sidebar' + ' ' + getOpenStatus">
    <router-link to="/">
      <div class="logo-container" @click="setCurrentPath('/'), setCategory('')">
        <img class="logo" src="../assets/WIW-logo.png" alt="WIW logo" />
        <h2 v-if="isOpen">what I watch</h2>
      </div>
    </router-link>
    <div :class="'search-bar' + ' ' + getOpenStatus" @click="openSidebar()">
      <input
        :class="getOpenStatus"
        v-model="search"
        placeholder="search movie / tv show..."
        @keyup.enter="fetchSearch"
      >
      <font-awesome-icon
        :class="'icon' + ' ' + getOpenStatus"
        :icon="['fas', 'search']"
        size="lg"
        v-on:click="fetchSearch"
      />
    </div>
    <div class="cat-container">
      <router-link to="/movies/trending">
        <div
          :class="'movies' + ' ' + getcurrentSearch('movie') "
          @click="openSidebar(),
          setCategory('movie')"
        >
          <div class="cat-row">
            <font-awesome-icon
              :class="'icon' + ' ' + getOpenStatus"
              :icon="['fas', 'film']"
              size="2x"
              @click="setCurrentPath('/movies/trending')"
            />
            <h3 v-if="isOpen">Movies</h3>
          </div>
          <div
            v-if="moviesCategories.includes(currentSearch) && getOpenStatus && currentCategory === 'movie'"
            class="categories"
          >
            <ul>
              <li
                v-for="category in moviesCategories" v-bind:key="category"
                :class="(category === currentSearch && currentCategory === 'movie') && 'isActive'"
              >
                <router-link :to="`/movies/${category}`">
                  {{ textFormat(category) }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </router-link>
      <router-link to="/tv/trending">
        <div
          :class="'tv' + ' ' + getcurrentSearch('tv') "
          @click="openSidebar(),
          setCategory('tv')"
        >
          <div class="cat-row">
            <font-awesome-icon
              :class="'icon' + ' ' + getOpenStatus"
              :icon="['fas', 'tv']"
              size="2x"
              @click="setCurrentPath('/tv/trending')"
            />
            <h3 v-if="isOpen">TV</h3>
          </div>
          <div
            v-if="moviesCategories.includes(currentSearch) && getOpenStatus && currentCategory === 'tv'"
            class="categories"
          >
            <ul>
              <li
                v-for="category in moviesCategories" v-bind:key="category"
                :class="(category === currentSearch && currentCategory === 'tv') && 'isActive'"
              >
                <router-link :to="`/tv/${category}`">
                  {{ textFormat(category) }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </router-link>
    </div>
    <div v-if="isOpen"
      class="outside"
      @click="closeSidebar()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilm, faSearch, faTv } from '@fortawesome/free-solid-svg-icons';
 
library.add(faFilm, faSearch, faTv);

@Component({
  computed: mapState([
    'currentSearch',
    'currentCategory',
    'movies',
    'pages',
  ])
})
export default class Sidebar extends Vue {
  isOpen: boolean = false;
  search: string = "";
  path: string = "";
  moviesCategories: Array<string> = [
    'trending',
    'popular',
    'top_rated',
  ];

  fetchMovies() {
    this.$store.dispatch('fetchMovies', {id: null});
  }

  setCategory(category: string) {
    this.$store.commit('setCategory', category)
  }

  fetchSearch() {
    if(this.search.length > 2 && this.isOpen) {
      this.setCategory('search');
      if(this.path !== '/search') {
        this.$router.push('/search')
        this.path = '/search'
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

  getcurrentSearch(cat: string) {
    return cat === this.$store.state.currentCategory && this.moviesCategories.includes(this.$store.state.currentSearch)
      ? "isActive"
      : ""
  }

  get getOpenStatus() {
    return this.isOpen
      ? "isOpen"
      : ""
  }

  created() {
    this.path = ( this as any ).$router.history.current.path
  }

  textFormat(text: string) {
  return  text.charAt(0).toUpperCase() + text.slice(1).replace('_', ' ');
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

    .cat-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .cat-row {
        display: flex;

        .icon {
          width: 40px;
        }
      }

      .movies, .tv {
        color:  #8e9198;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;

        h3 {
          animation: slide-in-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          margin: 0 1rem;
        }

        &.isActive {
          color: rgb(150, 12, 12);
        }

        .categories {
          animation: slide-in-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          padding-left: 4rem;

          ul {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 9rem;
            text-align: left;

            li {
              margin: .5rem 0;
              
              a {
                color: #8e9198;
              }

              &.isActive {
                a {
                  color: rgb(150, 12, 12);
                }
              }
            }
          }
        }
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
