<template>
  <div class="youtube-video">
    <div v-if="videos.length === 0" class="play-button" v-on:click="setPlayerOn()"></div>
    <img v-if="videos.length === 0" :src="videoImg" alt="youtube"/>
    <iframe
      v-for="video in videos"
      v-bind:key="video"
      width="560"
      height="315"
      v-bind:src="video"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'YoutubeVideo',
  props: {
    youtubeKey: String,
  },
  data() {
    return {
      videoImg: "https://img.youtube.com/vi/"+this.youtubeKey+"/sddefault.jpg",
      videos: [],
    };
  },
  methods: {
    setPlayerOn() {
      this.videos.push("https://www.youtube.com/embed/"+this.youtubeKey+"?rel=0&showinfo=0&autoplay=1");
    }
  }
 };
</script>

<style lang="scss" scoped>
  .youtube-video{
    background-color: #000;
    margin-bottom: 30px;
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    cursor: pointer;

    img{
      width: 100%;
      top: -16.84%;
      left: 0;
      opacity: 0.7;
    }

    .play-button {
      width: 90px;
      height: 60px;
      background-color: #333;
      box-shadow: 0 0 30px rgba( 0,0,0,0.6 );
      z-index: 1;
      opacity: 0.8;
      border-radius: 6px;
    }

    .play-button:before {
      content: "";
      border-style: solid;
      border-width: 15px 0 15px 26.0px;
      border-color: transparent transparent transparent #fff;
    }

    img,
    .play-button {
      cursor: pointer;
    }

    img,
    iframe,
    .play-button,
    .play-button:before {
      position: absolute;
    }

    .play-button,
    .play-button:before {
      top: 50%;
      left: 50%;
      transform: translate3d( -50%, -50%, 0 );
    }

    iframe {
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
  }


</style>