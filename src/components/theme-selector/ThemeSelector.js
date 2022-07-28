import './ThemeSelector.css'
import { useTheme } from '../../hooks/useTheme'
import modeIcon from '../../assets/mode-icon.svg'

// this is the component displayed at the top of the page that handles the toggling of the theme. 
// it uses the custom hook 'useTheme' which returns the ThemeContext. Please see that useTheme.tsx for more info

export function ThemeSelector() {
  const { changeMode, mode } = useTheme()

  const toggleMode = () => {
    changeMode(mode === 'light' ? 'dark' : 'light')
  }

  console.log(mode)
  
  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img src={modeIcon} 
             alt="theme toggle icon" 
             style={{filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
             onClick={() => toggleMode()}/>
      </div>
    </div>
  );
}
