<template>
  <div class="music-infos">
    <div class="cover-container">
      <img
        :src="
          playlist[currentSong]
            ? `${playlist[currentSong].track.album.images[0].url}`
            : ''
        "
        :alt="`Music cover.`"
        class="cover"
      />
      <img
        :src="
          playlist[currentSong]
            ? `${playlist[currentSong].track.album.images[0].url}`
            : ''
        "
        class="cover-shadow"
      />
    </div>
    <div class="credits">
      <h1 class="title">{{ playlist[currentSong]?.track.name }}</h1>
      <h3 class="artist">{{ getArtists(currentSong) }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import getArtists from "../utils/GetArtists";

export default defineComponent({
  name: "MusicInfos",
  computed: {
    currentSong() {
      return this.$store.state.currentSong;
    },
    playlist() {
      return this.$store.state.playlist;
    },
  },
  methods: {
    getArtists,
  },
});
</script>

<style scoped lang="scss">
.cover-container {
  height: 132px;
  width: 132px;
  display: inline-block;
  position: relative;
  .cover {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    z-index: 2;
    position: relative;
  }

  .cover-shadow {
    position: absolute;
    top: 17px;
    left: 0;
    z-index: 1;
    border-radius: 4px;
    height: 100%;
    widows: 100%;
    opacity: 0.7;
    filter: blur(30px);
  }
}

.credits {
  display: inline-block;
  margin-left: 28px;
  margin-top: 10px;
  vertical-align: top;

  .title {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 13px;
    color: #a0a588;
    mix-blend-mode: difference;
    max-width: 248px;
  }
  .artist {
    margin: 0;
    font-size: 12px;
    color: #a0a588;
    mix-blend-mode: difference;
    font-weight: normal;
  }
}

@media screen and (max-width: 550px) {
  .music-infos {
    text-align: center;
  }
  .credits {
    display: block;
    margin-left: 0;
    margin-top: 15px;

    .title {
      font-size: 14px;
      margin-bottom: 8px;
      max-width: none;
    }

    .artist {
      font-size: 10px;
    }
  }
}
</style>
