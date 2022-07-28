import Playlist from '../../components/playlist/Playlist'
import './SpotifyWidget.scss'
import { useTheme } from '../../hooks/useTheme'

// just a simple container for holding the components used to build up a spotify widget. 
// currently only has one component, the Playlist component. If a media player was to be build and implemented that would be used in this component.

export default function SpotifyWidget({...props}) {
  const { token } = props;
  const { mode } = useTheme()

  return (
    <section className={`spotify-widget ${mode}`}>
      {token && <Playlist token={token}/>}
    </section>
  );
}
