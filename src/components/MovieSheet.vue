<template>
  <div class="movie-sheet">
    <div
      class="outside"
      @click="closeSheet()"
    />
    <div class="sheet">
      <div
        v-if="Object.entries(movie).length === 0"
        class="loader"
      >
        <font-awesome-icon
          class="icon"
          :icon="['fas', 'spinner']"
          size="4x"
          spin
        />
      </div>
      <div v-if="Object.entries(movie).length > 0">
        <button
          class="close-button"
          @click="closeSheet()"
        >
          <font-awesome-icon
            class="icon"
            :icon="['fas', 'times']"
            size="2x"
          />
        </button>
        <YoutubeVideo v-if="youtubeKey !== ''" :videoKey="youtubeKey" />
        <div class="description">
          <h2>{{ movie.title }}</h2>
          <p class="info">
            {{ movie.release_date }} - {{ movie.status }} - {{ movie.runtime }}mn
          </p>
          <p class="overwiew">
            {{ movie.overview }}
          </p>
        </div>
        <CastRow v-if="cast.length > 0" :cast="cast" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import axios from 'axios';

import YoutubeVideo from './YoutubeVideo.vue';
import CastRow from './CastRow.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
 
library.add(faTimes, faSpinner);

@Component({
  components: {
    YoutubeVideo,
    CastRow,
  },
})

export default class MovieSheet extends Vue{
  @Prop() id?: number;
  @Prop() type?: string;

  movie = {};
  youtubeKey: string = "";
  cast: any[] = [];

  async created() {
    await this.fetchMovie();
  }

  closeSheet() {
    this.$emit('close-sheet');
  }

  async fetchMovie() {
    const path = this.type !== ""
      ? this.type
      : this.$store.state.currentCategory;

    const movieResponse = await axios
      .get(`https://api.themoviedb.org/3/${path}/${this.id}?api_key=49f6cce872dedfb45746781479e03ce5`);

    this.movie = movieResponse.data;

    const videoKeyResponse = await axios
      .get(`https://api.themoviedb.org/3/${path}/${this.id}/videos?api_key=49f6cce872dedfb45746781479e03ce5`);

    if(videoKeyResponse.data.results.length > 0) {
      this.youtubeKey = videoKeyResponse.data.results.find(({site}: any) => site === "YouTube").key || "";
    }


    const castResponse = await axios
      .get(`https://api.themoviedb.org/3/${path}/${this.id}/credits?api_key=49f6cce872dedfb45746781479e03ce5`);

    this.cast = castResponse.data.cast
      .filter(({profile_path}: any) => profile_path)
      .splice(0, 4);
  }
 }
</script>

<style lang="scss" scoped>
  .movie-sheet {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(#0c0b10, 0.6);
    z-index: 10;
    display: flex;
    justify-content: right;

    .outside {
      flex: 1 1 auto;
      height: 100vh;
    }

    .sheet {
      z-index: 20;
      width: 560px;
      min-height: 100vh;
      padding-top: 4rem;
      position: relative;
      top: 0;
      right: 0;
      background-color: rgb(9, 11, 21);
      box-shadow: -12px 0px 25px 5px rgba(0,0,0,0.4);
      animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      color: whitesmoke;
      overflow-y: auto;

      .loader {
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(whitesmoke, 0.7);
      }

      .description {
        text-align: left;
        padding: 0 2rem;

        .info {
          font-size: .75rem;
        }
      }

      .close-button {
        position: absolute;
        top: 1.2rem;
        right: 2rem;
        background: none;
        border: none;
        color: rgba(whitesmoke, 0.7);
        &:hover{
          cursor: pointer;
          color: whitesmoke;
        }
      }
    }

    @keyframes slide-in-right {
      0% {
        -webkit-transform: translateX(1000px);
                transform: translateX(1000px);
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
      }
    }
  }
</style>