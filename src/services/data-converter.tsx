export const convertSpotifyPlaylist = (data:any) => {
  if(data) {

    const artists: string[] = []
    let artistIndex = 3;

    for(let i = 0; i < artistIndex; i++) {
      const item = data.tracks.items[i];
      artists.push(item.track.album.artists[0].name)
    }

    const convertMillsToMins = (ms: number) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
    } 

    return {
      title: data.name,
      coverImg: data.images[0].url,
      owner: data.owner,
      id: data.id,
      description: data.description,
      totalTracksCount: data.tracks.total,
      artists: artists,
      tracks: data.tracks.items.map((item:any) => {
        return {
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists,
          runtime: convertMillsToMins(item.track.duration_ms),
          albumCover: item.track.album.images[0].url
        }
      })
    }
  }
  return null;
}

export const convertToArtist = (data:any) => {
  return {
    spotifyLink: data.external_urls?.spotify,
    followers: data.followers.total,
    genres: data.genres,
    image: data.images[0].url,
    name: data.name,
    popularity: data.popularity
  }
}