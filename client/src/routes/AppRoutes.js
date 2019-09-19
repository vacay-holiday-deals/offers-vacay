import React from 'react'
import history from './AppHistory'
import { Router, Switch, Route } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'

// components and pages imports
import App from '../App'
import Login from '../components/auth/Login'
import AddUser from '../components/auth/Register'
import Landing from '../components/Landing'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import Policy from '../pages/Policy'
import Addoffers from '../pages/Addoffers'

// routing component
function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoutes exact path='/' component={App} />
        <PublicRoutes exact path='/login' component={Login} />
        <PrivateRoutes exact path='/dashboard' component={Dashboard} />
        <PrivateRoutes exact path='/adduser' component={AddUser} />
        <PrivateRoutes exact path='/addoffers' component={Addoffers} />
        <PublicRoutes
          exact
          path='/vacay-holiday-deals-privacy-policy'
          component={Policy}
        />
        <PublicRoutes
          exact
          path='/:title'
          render={props => (
            <Landing key={props.match.params.title} {...props} />
          )}
        />

        <Route exact path='*' component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Routes
