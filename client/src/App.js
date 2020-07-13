import React from 'react'
import { BrowserRouter as Router, Route , Switch } from "react-router-dom"

import HomePage from './pages/homepage'
import RegistrePage from './pages/registre'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/registre' component={RegistrePage}/>
        </Switch>
    </Router>
  )
}

export default App
