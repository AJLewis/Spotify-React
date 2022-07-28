import { createContext, useReducer } from 'react'

// here we are using the React ContextAPI that allows us global access to the properties declared. 
// it uses a reducer to manage the state of the 'mode' and then a 'changeMode' function to control the theme from anywhere in the application

export const ThemeContext = createContext()

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload }
    default:
      return state;
  }
}

export function ThemeProvider({ children }) {
  
  const [state, dispatch] = useReducer(themeReducer, {
    mode: 'dark'
  })

  const changeMode = (mode) => {
    if(mode) {
      dispatch({type: "CHANGE_MODE", payload: mode})
    }
  }

  return (
    <ThemeContext.Provider value={{...state, changeMode}}>
      {children}
    </ThemeContext.Provider>
  )
}