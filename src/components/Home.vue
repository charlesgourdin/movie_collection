<template>
  <div class="home">
    <WorkInProgress />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import WorkInProgress from './WorkInProgress.vue';

@Component({
  components: {
    WorkInProgress,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
</style>