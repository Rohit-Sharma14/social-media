import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import Createpost from './components/screens/Createpost'
import { reducer, initalstate } from './reducer/userReducer'
import UserProfile from './components/screens/UserProfile'
import Subuserpost from './components/screens/Subuserpost'




export const userContext = createContext()

//--------------------to use history outside the brroeser router-----------------------------------//

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(userContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })

    } else {
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Signin">
        <Signin />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/createpost">
        <Createpost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <Subuserpost />
      </Route>
    </Switch>
  )
}





//---------------------------------------------------------------------------------------------------//
function App() {
  const [state, dispatch] = useReducer(reducer, initalstate)

  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
