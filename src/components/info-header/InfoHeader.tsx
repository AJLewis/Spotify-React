import './InfoHeader.css'
import { useTheme } from '../../hooks/useTheme'
import spotifyLogo from '../../assets/spotify-logo.svg'

// this simple yet multi-use component is responsible for showing the header whilst no data is selected 
// it's also responsible for showing the playlist information and also the track information.

// SCOPE FOR IMPROVEMENT. instead of multiple props (img, title etc) it could use a 'data' prop and then useReducer to manage the state

export default function InfoHeader({...props}) {
  const { img, title, description, totalTracks, searchArtist } = props;
  const { mode } = useTheme()

  return (
    <div className={`header-container ${mode} ${!img ? 'empty' : ''} `}>
      {!img && 
        <div className="empty-header">
          <div>
            <img className="spotify-logo" src={spotifyLogo} alt="Spotify logo" />
          </div>
        </div>
      }
      {img && title && description && 
        <>
          <div className="image-container">
            <img src={img} alt="album cover"/>
            {totalTracks && 
              <div className="track-count">
                <div className="box">
                  {totalTracks} tracks
                </div>
              </div>
            }
          </div>
          <div className="playlist-info">
            <h4>{title}</h4>
            <p onClick={() => searchArtist()}>{description.substring(0,100)} {description.length > 99 && '...'}</p>
          </div>
        </>
      }
    </div>
  );
}
