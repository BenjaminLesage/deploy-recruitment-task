import store from "../store";

const getArtists = (songIndex: number) => {
  let artists = "";

  (store.state.playlist[songIndex] as any)?.track.artists.forEach(
    (artist: any) => {
      artists += artist.name + ", ";
    }
  );
  artists = artists.substring(0, artists.length - 2);

  return artists;
};

export default getArtists;
