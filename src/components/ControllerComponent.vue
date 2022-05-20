<template>
  <div class="controller">
    <div class="buttons-box">
      <div class="previous-btn" @click="previousBtnClicked()"></div>
      <div
        class="play-pause-btn"
        :class="{ play: !play, pause: play }"
        @click="handlePlayPause()"
      ></div>
      <div class="next-btn" @click="changeTrack(currentSong + 1)"></div>
    </div>
    <div class="audio-player" ref="audioPlayer">
      <audio
        :src="getAudioSrc()"
        preload="metadata"
        ref="audio"
        @timeupdate="handleAudioTimeUpdate()"
        @ended="changeTrack(currentSong + 1)"
      ></audio>
      <span id="current-time" class="time">{{
        secToMMSS(seekSliderValue)
      }}</span>
      <input
        type="range"
        id="seek-slider"
        :max="duration.toString()"
        v-model="seekSliderValue"
        step="0.001"
        @input="handleSeekSliderChange()"
      />
      <span id="duration" class="time">{{ secToMMSS(duration) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ControllerComponent",
  data() {
    return {
      duration: 0,
      audio: document.createElement("audio"),
      seekSliderValue: 0,
      play: false,
    };
  },
  mounted() {
    this.audio = this.$refs.audio as HTMLAudioElement;
    this.setDuration();
    window.addEventListener("keydown", (e) => this.handleKeyPress(e));
  },
  computed: {
    currentSong() {
      return this.$store.state.currentSong;
    },
  },
  methods: {
    getAudioSrc() {
      if (this.currentSong == 2) {
        return "kislaw.mp3";
      } else return "listen-the-voice.wav";
    },
    setDuration() {
      this.audio.addEventListener("loadedmetadata", () => {
        this.duration = Math.floor(this.audio.duration);
      });
    },
    secToMMSS(secs: number) {
      const minutes = Math.floor(secs / 60);
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${minutes}:${returnedSeconds}`;
    },
    handlePlayPause() {
      if (!this.play) {
        this.audio.play();
        this.play = true;
      } else {
        this.audio.pause();
        this.play = false;
      }
    },
    handleAudioTimeUpdate() {
      this.seekSliderValue = this.audio.currentTime;

      (this.$refs.audioPlayer as HTMLDivElement).style.setProperty(
        "--seek-before-width",
        `${(this.seekSliderValue / this.duration) * 100}%`
      );
    },
    handleSeekSliderChange() {
      this.audio.currentTime = this.seekSliderValue;

      (this.$refs.audioPlayer as HTMLDivElement).style.setProperty(
        "--seek-before-width",
        `${(this.seekSliderValue / this.duration) * 100}%`
      );
    },
    changeTrack(songIndex: number) {
      this.$emit("changeTrack", songIndex);
    },
    previousBtnClicked() {
      this.audio.currentTime < 2
        ? this.changeTrack(this.currentSong - 1)
        : (this.audio.currentTime = 0);
    },
    handleKeyPress(e: KeyboardEvent) {
      (e.code == "Space" || e.code == "ArrowLeft" || e.code == "ArrowRight") &&
        e.preventDefault();
      e.code == "Space" && (this.play = !this.play);
      e.code == "ArrowLeft" && this.previousBtnClicked();
      e.code == "ArrowRight" && this.changeTrack(this.currentSong + 1);
    },
  },
  watch: {
    play() {
      this.play ? this.audio.play() : this.audio.pause();
    },
    currentSong() {
      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.audio.currentTime = 0;
            this.audio.play();
            this.play = true;
          })
          .catch(() => {
            this.audio.addEventListener("canplay", () => {
              this.audio.play();
              this.play = true;
            });
          });
      }
    },
  },
});
</script>

<style scoped lang="scss">
.controller {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  flex-wrap: wrap;

  .buttons-box {
    width: 132px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      background-color: #a0a588;
      mix-blend-mode: difference;
      width: 12px;
      height: 17px;
      cursor: pointer;
    }

    .previous-btn {
      -webkit-mask: url(../assets/icons/previous.svg) no-repeat center;
      mask: url(../assets/icons/previous.svg) no-repeat center;
    }

    .play-pause-btn {
      width: 12px;
      height: 21px;

      &.pause {
        -webkit-mask: url(../assets/icons/pause.svg) no-repeat center;
        mask: url(../assets/icons/pause.svg) no-repeat center;
      }

      &.play {
        -webkit-mask: url(../assets/icons/play.svg) no-repeat center;
        mask: url(../assets/icons/play.svg) no-repeat center;
      }
    }

    .next-btn {
      -webkit-mask: url(../assets/icons/next.svg) no-repeat center;
      mask: url(../assets/icons/next.svg) no-repeat center;
    }
  }

  .audio-player {
    min-width: 250px;
    display: flex;
    justify-content: space-between;
    margin: auto 0;

    .time {
      color: #a0a588;
      mix-blend-mode: difference;
      font-size: 10px;
    }

    input[type="range"] {
      position: relative;
      -webkit-appearance: none;
      outline: none;
      background: none;
      width: 100%;
      margin: 0 15px;

      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 3px;
        border-radius: 3px;
        cursor: pointer;
        background-color: rgba(160, 165, 136, 0.3);
        mix-blend-mode: difference;
      }

      &::before {
        position: absolute;
        border-radius: 3px;
        content: "";
        top: 4px;
        left: 0;
        width: var(--seek-before-width);
        height: 3px;
        background-color: #8c965d;
        mix-blend-mode: difference;
        cursor: pointer;
      }

      &::-webkit-slider-thumb {
        position: relative;
        -webkit-appearance: none;
        box-sizing: content-box;
        height: 7px;
        width: 7px;
        border-radius: 50%;
        background-color: #a0a588;
        mix-blend-mode: normal;
        cursor: pointer;
        margin: -1.5px 0 0 0;
      }

      &:active::-webkit-slider-thumb {
        transform: scale(1.2);
      }

      &::-moz-range-track {
        width: 100%;
        height: 3px;
        border-radius: 3px;
        cursor: pointer;
        background-color: rgba(160, 165, 136, 0.3);
        mix-blend-mode: difference;
      }

      &::-moz-range-progress {
        background-color: #8c965d;
        mix-blend-mode: difference;
        border-radius: 3px;
      }

      &::-moz-focus-outer {
        border: 0;
      }

      &::-moz-range-thumb {
        position: relative;
        -webkit-appearance: none;
        box-sizing: content-box;
        height: 7px;
        width: 7px;
        border-radius: 50%;
        background-color: #a0a588;
        mix-blend-mode: difference;
        cursor: pointer;
        margin: -1.5px 0 0 0;
      }

      &:active::-moz-range-thumb {
        transform: scale(1.2);
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .controller {
    justify-content: center;
    margin-top: 20px;

    .audio-player {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
