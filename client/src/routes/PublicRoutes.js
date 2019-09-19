import React, { Fragment, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function PublicRoutes({ component: Component, render, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      component={componentProps =>
        isAuthenticated ? (
          <Fragment>
            <Redirect to={{ pathname: '/dashboard' }}></Redirect>
          </Fragment>
        ) : (
          <Fragment>
            {Component ? (
              <Component {...componentProps}></Component>
            ) : (
              render({ ...componentProps })
            )}
          </Fragment>
        )
      }></Route>
  )
}

export default PublicRoutes
