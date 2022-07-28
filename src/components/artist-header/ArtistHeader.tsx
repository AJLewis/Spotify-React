import { useCallback, useEffect, useState } from 'react';
import { getTokenHeader } from '../../helpers/headers';
import { useHttp } from '../../hooks/useHttp';
import { convertToArtist } from '../../services/data-converter';
import starIcon from '../../assets/star-icon.svg'
import spotifyIcon from '../../assets/spotify-icon.svg'
import './ArtistHeader.css'

// simple component that is responsible for showing just the artist information within the component. 
// it uses the custom 'useHttp' hook and the url from the individual playlist item for fetching artist data 

export default function ArtistHeader({...props}) {
  const { artist, token } = props
  const { isLoading, error, sendRequest} = useHttp()
  const [ artistApiData, setArtistApiData] = useState<any>(null)

  const createConfig = useCallback(() => {
    return {url: artist.href, headers: getTokenHeader(token)}
  },[artist, token])

  useEffect(() => {
    const handleSetArtist = (json: any) => {
      const data = convertToArtist(json);

      if(data) {
        setArtistApiData(data)
        console.log(data)
      }
    }
    const config = createConfig()
    sendRequest(config, handleSetArtist)
  },[createConfig, sendRequest])

  const openInSpotify = () => {
    window.open(artistApiData.spotifyLink);
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {artistApiData && !isLoading && 
        <div className="artist-header-container " 
             style={{backgroundImage: `url(${artistApiData?.image})`, 
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'}}>
        <div className="col">
          <h2>{artistApiData.name}</h2>
          <div className="bottom-container">
            <span className="popularity">
              <span className="relative">
                <img width="30" height="30" src={starIcon} alt="popularity" />
                <p>{artistApiData.popularity}</p>
              </span>
            </span>
            <div className="followers" >
              <p>{artistApiData.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} followers</p>
            </div>
            <div className="spotify-link">
              <span className="button" onClick={openInSpotify}> 
                <img width="15" height="15" src={spotifyIcon} alt="open in spotify" />
                <p>open</p>
              </span>
            </div>
          </div>
        </div>
        
        <div className='overlay'></div>
      </div>
      }
    </div>
  );
}
