import React from 'react'
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import GlobalStyle from './theme/globalStyles'

import HomePage from './pages/homepage'
import RegisterPage from './pages/register'
import VerifyEmailPage from './pages/verify-email'
import LoginPage from './pages/login'
import CompanyDashboardPage from './pages/company-dashboard'
import CompanyJobsPage from './pages/company-jobs'
import CompanyCandidatesPage from './pages/company-candidates'
import CompanyAssessmentsPage from './pages/company-assessments'
import CompanyProfilePage from './pages/company-profile'
import CompanySettingsPage from './pages/company-settings'
import CreateJobPage from './pages/create-job'
import UpdateJobPage from './pages/update-job'
import JobResultsPage from './pages/job-results'

import EmployeeDashboardPage from './pages/employee-dashboard'

import PrivateRoute from './hocs/PrivateRoute'

function App() {

  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/register' component={RegisterPage}/>
            <Route exact path='/login' component={LoginPage}/>
            <Route exact path='/verify-email' component={VerifyEmailPage}/>

            <PrivateRoute path='/company-dashboard' component={CompanyDashboardPage} roles={['employer']} />
            <PrivateRoute path='/jobs' component={CompanyJobsPage} roles={['employer']} />
            <PrivateRoute path='/candidates' component={CompanyCandidatesPage} roles={['employer']} />
            <PrivateRoute path='/assessments' component={CompanyAssessmentsPage} roles={['employer']} />
            <PrivateRoute path='/company-profile' component={CompanyProfilePage} roles={['employer']} />
            <PrivateRoute path='/company-settings' component={CompanySettingsPage} roles={['employer']} />
            <PrivateRoute path='/job/create' component={CreateJobPage} roles={['employer']} />
            <PrivateRoute path='/job/update/:id' component={UpdateJobPage} roles={['employer']} />
            <PrivateRoute path='/job/results/:id' component={JobResultsPage} roles={['employer']} />

            <PrivateRoute  path='/employee-dashboard' component={EmployeeDashboardPage} roles={['candidate']} />
          </Switch>
      </Router>
    </Provider>
  )
}

export default App
