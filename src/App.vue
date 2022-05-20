<template>
  <PlayerWidget />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerWidget from "./components/PlayerWidget.vue";

export default defineComponent({
  name: "App",
  components: {
    PlayerWidget,
  },
});
</script>

<style lang="scss">
@font-face {
  font-family: "SFUIText";
  src: local("SFUIText"),
    url(./assets/fonts/SFUIText/SFUIText-Regular.woff) format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "SFUIText";
  src: local("SFUIText"),
    url(./assets/fonts/SFUIText/SFUIText-Bold.woff) format("woff");
  font-weight: bold;
  font-style: normal;
}

body {
  margin: 0;
}

#app {
  background-color: #faf5fe;
  height: 100vh;
  width: 100vw;
  font-family: "SFUIText", Arial, Helvetica, sans-serif;
}
</style>
