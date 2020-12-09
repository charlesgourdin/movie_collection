<template>
  <div class="movie-sheet">
    <div class="outside" v-on:click="closeSheet()"/>
    <div class="sheet">
      <button class="close-button" v-on:click="closeSheet()">
          <font-awesome-icon class='icon' :icon="['fas', 'times']" size="2x" />
      </button>
      <iframe width="560" height="315" v-bind:src="videoLink" frameborder="0"></iframe>
      <div class="description">
        <h2>{{movie.title}}</h2>
        <p class="info">{{movie.release_date}} - {{movie.status}} - {{movie.runtime}}mn</p>
        <p class="overwiew">{{movie.overview}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
 
library.add(faTimes)

export default {
  name: 'MovieSheet',
  props: {
    id: Number,
  },
  data() {
    return {
      movie: {},
      videoLink: '',
      cast: [],
    };
  },
  methods: {
    closeSheet() {
      this.$emit('close-sheet');
    },
    async fetchMovie() {
      const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=49f6cce872dedfb45746781479e03ce5`);
      this.movie = movieResponse.data;

      const videoKeyResponse = await axios.get(`https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=49f6cce872dedfb45746781479e03ce5`);
      const videoKey = videoKeyResponse.data.results.find(({site}) => site === "YouTube").key
      this.videoLink = `https://www.youtube.com/embed/${videoKey}`

      const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=49f6cce872dedfb45746781479e03ce5`);
      this.cast = castResponse.data.cast;
      console.log(this.cast[0])
    },
  },
  async created() {
    await this.fetchMovie()
  }
 };
</script>

<style lang="scss" scoped>
  .movie-sheet{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(#0c0b10, 0.6);
    z-index: 10;
    display: flex;
    justify-content: right;

    .outside{
      flex: 1 1 auto;
      height: 100vh;
    }

    .sheet{
      width: 560px;
      height: 100vh;
      padding-top: 4rem;
      position: relative;
      top: 0;
      right: 0;
      background-color: #0c0b10;
      box-shadow: -10px 0px 25px 5px rgba(0,0,0,0.29);
      animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      color: whitesmoke;

      .description{
        text-align: left;
        padding: 0 2rem;

        .info{
          font-size: .75rem;
        }
      }

      .close-button{
        position: absolute;
        top: 1.2rem;
        right: 2rem;
        background: none;
        border: none;
        cursor: pointer;
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