import { createContext } from 'react'
import { useState, useContext} from 'react'

// Create Context
const AuthContext = createContext();

const AuthProvider = ({children}) => { // childrens are basically other components
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'))
    
  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export AuthContext