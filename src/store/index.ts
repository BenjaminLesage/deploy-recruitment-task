import { createStore } from "vuex";

export default createStore({
  state: {
    currentSong: 0,
    playlist: [],
  },
  mutations: {
    SET_PLAYLIST(state, importedPlaylist) {
      state.playlist = importedPlaylist;

      //Listen the voice
      (state.playlist[2] as any).track.name = "Listen The Voice";
      (state.playlist[2] as any).track.artists = [{ name: "Kislaw" }];
      (state.playlist[2] as any).track.album.images[0].url =
        "kislaw-cover.jfif";
    },
    CHANGE_CURRENT_SONG(state, songIndex) {
      state.currentSong = songIndex;
    },
  },
  actions: {},
});
