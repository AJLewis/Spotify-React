import { useHttp } from './hooks/useHttp';
import {useEffect, useState } from 'react';
import { token_request } from './helpers/headers';

import './App.css';
import SpotifyWidget from './widgets/spotify-widget/SpotifyWidget';
import { ThemeSelector } from './components/theme-selector/ThemeSelector'
import { useTheme } from './hooks/useTheme';

function App() {
  const { mode } = useTheme()
  
  const [ url ] = useState(process.env.REACT_APP_SPOTIFY_TOKEN_API);
  const { isLoading, error, sendRequest} = useHttp()
  const [ accessToken, setAccessToken ] = useState('')

  // using a custom hook called 'useHttp' for fetching the token. This is then prop drilled in to the components. 
  // in a real world, enterprise application I would assume this token is distributed to the app components using the Provider Pattern. 
  
  useEffect(() => {

    const handleGetToken = (json: any) => {
      setAccessToken(json.access_token)
    }
    
    const request = {url: url, method: token_request.method, headers: token_request.headers, body: token_request.body }

    if(!accessToken){
      sendRequest(request, handleGetToken)
    }
        
  },[accessToken, sendRequest, url])

  return (
    <div className={`App ${mode}`}>
      <ThemeSelector />
      {isLoading && <p>Loading Spotify Data</p>}
      {error && <p>{error}</p>}
      {accessToken && 
        <div className="flex">
          <div className="center">
            <SpotifyWidget token={accessToken}/>
          </div>
      </div>
      }
        
    </div>
  );
}

export default App;
