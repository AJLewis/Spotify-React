import { useEffect, useState, useCallback } from 'react'
import { useHttp } from '../../hooks/useHttp'
import { getTokenHeader } from '../../helpers/headers'
import { convertSpotifyPlaylist } from '../../services/data-converter';
import { useTheme } from '../../hooks/useTheme'
import playlistCaretIcon from '../../assets/playlist-caret-icon.svg'

// this is the most important component in this widget. Its is responsible for fetching the playlist data from the Spotify API
// it's responsible for displaying the error (if there is one) on the UI and also iterating through the tracks. 

import './PlaylistItem.css'

export default function PlaylistItem({...props}) {
  const { isLoading, error, sendRequest} = useHttp()
  const [ playlist, setPlaylist ] = useState<any>()
  const { playlistId, token, selectPlaylist, selectSong, showTracks, searchArtist } = props
  const { mode } = useTheme()

  const createConfig = useCallback(() => {
    return {url: process.env.REACT_APP_SPOTIFY_PLAYLIST_API+playlistId, headers: getTokenHeader(token)}
  },[playlistId, token])

  useEffect(() => {
    const handleSetPlaylist = (json: any) => {
      let data = convertSpotifyPlaylist(json)
      if(data) {
        setPlaylist(data)
        console.log(data)
      }
    }
    const config = createConfig()
    sendRequest(config, handleSetPlaylist)
  },[createConfig, sendRequest])

  return (
    <div className={`playlist-item-container ${mode}`}>
      {isLoading && <p>Playlist loading...</p>}
      {error && <p>{error}</p>}

      {playlist && 
      <div className="playlist-item-wrapper">
        <div className="playlist-item" onClick={() => selectPlaylist(playlist)}>
          <span className="image-container">
            <img src={playlist.coverImg} alt="cover"/>
          </span>
          <div className="content-container">
            <h5>{playlist.title}</h5>
            <p className="artist-loop">
              {playlist.description.substr(0, 50)}...
            </p>
          </div>
          <div className="caret-container">
            <img className={showTracks ? 'rotate' : '' } src={playlistCaretIcon} alt="toggle icon"/>
          </div>
        </div>
        {showTracks && 
          <div className={`tracks-container ${showTracks? 'open' : ''}`}>
            {playlist.tracks.map((track: any) => (
              <div className="track-item" key={track.id}>
                <span className="image-container"  onClick={() => selectSong(track)}>
                  <img src={track.albumCover} alt="cover"/>
                </span>
                <div className="content-container">
                  <h5  onClick={() => selectSong(track)}>{track.name}</h5>
                  <p className="track-name" onClick={() => searchArtist(track.artist[0], true)}>
                    {track.artist[0].name}
                  </p>
                </div>
                <div className="running-time"  onClick={() => selectSong(track)}>
                  {track.runtime}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      }
    </div>
  )
}
