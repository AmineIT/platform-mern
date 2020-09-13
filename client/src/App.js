import React from 'react'
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import HomePage from './pages/homepage'
import RegisterPage from './pages/register'
import VerifyEmailPage from './pages/verify-email'
import LoginPage from './pages/login'
import CompanyDashboardPage from './pages/company-dashboard'
import EmployeeDashboardPage from './pages/employee-dashboard'

import PrivateRoute from './hocs/PrivateRoute'

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/register' component={RegisterPage}/>
            <Route exact path='/login' component={LoginPage}/>
            <Route exact path='/verify-email' component={VerifyEmailPage}/>
            <PrivateRoute path='/company-dashboard' component={CompanyDashboardPage} roles={['employer']} />
            <PrivateRoute  path='/employee-dashboard' component={EmployeeDashboardPage} roles={['candidate']} />
          </Switch>
      </Router>
    </Provider>
  )
}

export default App
