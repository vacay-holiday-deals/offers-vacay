import React, { Fragment, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function PrivateRoutes({ component: Component, render, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      component={componentProps =>
        isAuthenticated ? (
          <Fragment>
            {Component ? (
              <Component {...componentProps}></Component>
            ) : (
              render({ ...componentProps })
            )}
          </Fragment>
        ) : (
          <Redirect to={{ pathname: '/' }}></Redirect>
        )
      }></Route>
  )
}

export default PrivateRoutes
