import React,{ useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import './App.css'

const App = (props) => {
  const [ userLoggedIn, setUserLoggedIn] = useState(false)
  
  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      setUserLoggedIn(true) 
    }
  }, [])

  return (
    <div className='App'>
        <NavBar 
          userLoggedIn={userLoggedIn} 
          handleAuth={handleAuth} 
          /> 
    </div>
  )
}

export default App