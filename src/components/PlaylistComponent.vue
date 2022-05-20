<template>
  <div class="playlist">
    <div
      v-for="(song, index) in playlist"
      :key="index"
      class="song-container"
      @click="$emit('changeTrack', index)"
    >
      <img
        :src="song.track.album.images[0].url"
        alt="Music cover"
        class="cover"
      />
      <div class="credits">
        <h4 class="title">
          {{ song.track.name
          }}<img
            v-if="index == currentSong"
            src="../assets/icons/speaker.svg"
            alt="Speaker icon"
            class="speaker-icon"
          />
        </h4>
        <h6 class="artist">{{ getArtists(index) }}</h6>
      </div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from "vue";
import getArtists from "../utils/GetArtists";

export default defineComponent({
  name: "PlaylistComponent",
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
.playlist {
  padding-top: 22px;
  height: 52%;
  box-sizing: border-box;
  overflow: auto;

  &::-webkit-scrollbar {
    display: block;
    width: 13px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-track-piece {
    margin-right: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 13px;
    background-color: #dddddd;
    border: 4px solid transparent;
    background-clip: padding-box;

    &:hover {
      background-color: #b3b3b3;
    }
    &:active {
      background-color: #8b8b8b;
    }
  }

  .song-container {
    display: grid;
    grid-template-columns: 39px auto;
    height: 39px;
    align-items: center;
    margin-bottom: 16px;
    column-gap: 14px;
    padding: 6px 28px;
    cursor: pointer;

    &:hover {
      background-color: #eeeeee;
    }

    .cover {
      width: 39px;
      height: 39px;
      border-radius: 50%;
    }

    .credits {
      .title {
        font-size: 12px;
        color: #8d8d8d;
        margin: 0;
        font-weight: normal;
        position: relative;

        .speaker-icon {
          width: 13px;
          height: auto;
          filter: invert(85%) sepia(0%) saturate(1%) hue-rotate(36deg)
            brightness(93%) contrast(91%);
          position: absolute;
          margin-left: 8px;
        }
      }

      .artist {
        font-size: 10px;
        color: #c2c2c2;
        text-transform: uppercase;
        margin: 0;
        font-weight: normal;
      }
    }
  }
}
</style>
