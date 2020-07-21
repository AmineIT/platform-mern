import React from 'react'
import { BrowserRouter as Router, Route , Switch } from "react-router-dom"

import HomePage from './pages/homepage'
import RegisterPage from './pages/register'
import VerifyEmailPage from './pages/verify-email'

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/register' component={RegisterPage}/>
          <Route exact path='/verify-email' component={VerifyEmailPage}/>
        </Switch>
    </Router>
  )
}

export default App
