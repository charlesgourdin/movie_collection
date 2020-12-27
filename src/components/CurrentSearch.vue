<template>
  <div class="current-search">
    <h2>
      <font-awesome-icon
        class="icon"
        :icon="['fas', 'film']"
      />
      {{textFormat(currentCategory)}}
    </h2>
    <h4>
      <font-awesome-icon
        class="icon"
        :icon="['fas', 'caret-right']"
      />
      {{ textFormat(currentSearch) }}
    </h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilm, faCaretRight } from '@fortawesome/free-solid-svg-icons';
 
library.add(faFilm, faCaretRight);

@Component({
  computed: mapState([
    'currentSearch',
    'currentCategory'
  ])
})
export default class CurrentSearch extends Vue {
  textFormat(text: string) {
    const formatedText = text.charAt(0).toUpperCase() + text.slice(1).replace('_', ' ')

    return formatedText === 'Movie'
      ? formatedText + 's'
      : formatedText
  }
}
</script>

<style lang="scss" scoped>
  .current-search {
    z-index: 10;
    position: fixed;
    right: 0;
    background-color: rgb(0, 0, 0);
    padding-left: 3rem;
    height: 7rem;
    width: 20rem;
    border-bottom-left-radius: 3rem;
    color: whitesmoke;
    
    h2 {
      margin-bottom: .5rem;
      text-align: left;

      .icon {
        margin-right: 1rem;
      }
    }

    h4 {
      margin-top: .25rem;
      text-align: left;
      margin-left: 1.5rem;

      .icon {
        margin-right: .5rem;
      }
    }
  }

</style>