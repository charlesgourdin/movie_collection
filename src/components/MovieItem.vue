<template>
  <div class="movie-item">
    <div class="note">
      <font-awesome-icon
        class="icon"
        :icon="['far', 'star']"
      />
      <p>{{ movie.vote_average }}</p>
    </div>
    <img
      :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path"
      :alt="movie.title"
      @click="setCurrentMovie(movie.id)"
    >
    <h2 class="movie-title">
      {{ movie.title }}
    </h2>
    <MovieSheet
      v-for="id in currentMovie"
      :id="id"
      :key="id"
      @close-sheet="setCurrentMovie()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import MovieSheet from './MovieSheet.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-regular-svg-icons';
 
library.add(faStar);

@Component({
  components: {
    MovieSheet,
  },
})

export default class MovieItem extends Vue {
  @Prop() movie?: object;

  currentMovie: number[] = [];

  setCurrentMovie(id: number):void {
    id
    ? this.currentMovie.push(id)
    : this.currentMovie.splice(0);
  }
 }
</script>

<style lang="scss" scoped>
  .movie-item {
    position: relative;
    width: 16rem;
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .note {
      position: absolute;
      left: 1rem;
      top: 2rem;
      height: 1.5rem;
      border-radius: 0 1.5rem 1.5rem 0;
      display: flex;
      align-items: center;
      padding: .5rem;
      background-color: rgba(0, 0, 0, 0.8);
      color: rgba(250, 250, 250, 0.7);

      .icon {
        margin: 0 .25rem 0 0;
      }

      p {
        margin: 0 1rem 0 0;
      }
    }

    img {
      width: 16rem;

      &:hover{
        cursor: pointer;
      }
    }

    .movie-title {
      width: 100%;
      font-size: 1.25rem;
      text-align: left;
      margin: .75rem 0;
      color: whitesmoke;
    }
  }


</style>