import { useState } from 'react';
import InfoHeader from '../info-header/InfoHeader';
import PlaylistItem from '../playlist-item/PlaylistItem';
import { useTheme } from '../../hooks/useTheme'
import ArtistHeader from '../artist-header/ArtistHeader';

// this component handles the state for the header and is responsible for managing the playlist ids. 
// we then iterate through the ids and pass that into the PlaylistItem component to go and fetch that data/

// SCOPE FOR IMPROVEMENT??? - We could potentially combine all (or at least a few) of the fetch requests and make a single ping to the server. 
// this would reduce the http requests but also slow down the time to first render. "todo: find out the best practice for this"

export default function Playlist({...props}) {
  const { token } = props;

  // state management for the playlist. Ideally this would come from a database. Might implement Firestore to handle this. 
  const [ playlistIds ] = useState(['37i9dQZF1DWXRqgorJj26U', '37i9dQZF1DWWGFQLoP9qlv', '37i9dQZEVXbKCF6dqVpDkS', '37i9dQZF1DX1rVvRgjX59F', '37i9dQZF1DX35DWKgAk2B5', '37i9dQZF1DX11ghcIxjcjE', '37i9dQZF1DX7yThnpS6Pdp', '37i9dQZF1DWXF8Nf1uycDZ', '37i9dQZF1DXaVgr4Tx5kRF'])
  const [ selectedPlaylist, setSelectedPlaylist ] = useState<any>(null)

  // state management for the InfoHeader component
  // possibly use useReducer to handle img, title, description as a single object and update only the changed value?
  const [ img, setImg ] = useState<string>('')
  const [ title, setTitle ] = useState<string>('')
  const [ description, setDescription ] = useState<string>('')
  
  // state management for the ArtistHeader component
  const [ showArtistHeader, setShowArtistHeader ] = useState<boolean>(false)
  const [ selectedArtist, setSelectedArtist ] = useState<{} | null>(null)
  const [ totalTracks, setTotalTracks ] = useState<string>('')

  const { mode } = useTheme()

  // too much individual state management makes the code look messy. There must be a better way 🤔 "todo: research best practice to handle this"
  const selectPlaylist = (playlist:any) => {
    setShowArtistHeader(false)
    if(selectedPlaylist !== playlist) {
      setImg(playlist.coverImg)
      setTitle(playlist.title)
      setTotalTracks(playlist.totalTracksCount)
      setDescription(playlist.description)
      setSelectedPlaylist(playlist)
    } else {
      setImg('')
      setTitle('')
      setDescription('')
      setSelectedPlaylist(null)
    }
  }

  const selectSong = (track:any) => {
    setShowArtistHeader(false)
    setImg(track.albumCover)
    setTitle(track.name)
    setTotalTracks('')
    setSelectedArtist(track.artist[0])
    setDescription(track.artist[0].name)
  }

  const searchArtist = (data:any, forceIsArtist: boolean) => {
    if(selectedArtist || forceIsArtist){
      if(data) {
        setSelectedArtist(data);
      }
      setShowArtistHeader(true)
    }
  }

  return (
    <div className={`playlist-container ${mode}`}>
        {showArtistHeader && selectedArtist && <ArtistHeader token={token} artist={selectedArtist} />}
        {!showArtistHeader && <InfoHeader img={img} 
              title={title} 
              searchArtist={(data:any) => searchArtist(data, false)}
              selectedPlaylist={selectedPlaylist}
              totalTracks={totalTracks}
              description={description}/>
        }
        <div className="playlist-items">
        {playlistIds.map((id) => (
          <PlaylistItem showTracks={id === selectedPlaylist?.id} 
                        key={id} 
                        searchArtist={(data:any) => searchArtist(data, true)}
                        selectSong={(data:any) => selectSong(data)}
                        selectPlaylist={(data:any) => selectPlaylist(data)} 
                        playlistId={id} token={token}/>
        ))}
        </div>
    </div>
  )
}
