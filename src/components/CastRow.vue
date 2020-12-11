<template>
  <div class="cast-row">
    <h3>Cast</h3>
    <div class="container">
      <div v-for="actor in cast" v-bind:key="actor.cast_id" class="actor">
        <img
          :src="'https://image.tmdb.org/t/p/w300/' + actor.profile_path"
        >
        <p class="name">
          {{actor.name}}
        </p>
        <p class="character">
          {{actor.character}}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CastRow extends Vue {
  @Prop() cast?: any[];
}
</script>

<style lang="scss" scoped>
  .cast-row {
    margin-top: 2rem;
    margin-bottom: 5rem;

    h3 {
      margin-left: 2rem;
      width: 90%;
      text-align: left;
    }

    .container {
      display: flex;
      flex-wrap: nowrap;
      width: 90%;
      margin: auto;

      .actor {
        min-width: 6rem;
        margin: 0 1rem;

        img {
          background-color: black;
          width: 100%;
        }

        p {
          text-align: left;

          &.name {
            font-weight: bold;
            font-size: .75rem;
            margin-bottom: .25rem;
          }

          &.character {
            font-style: italic;
            font-size: 0.75rem;
            color: rgba(whitesmoke, .7);
            margin-top: 0;
          }
        }
      }
    }
  }
</style>
