import React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import Callback from './Callback/Callback'

import './App.css'

function HomePage(props) {
  const { authenticated } = props

  const logout = () => {
    props.auth.logout()
    props.history.push('/')
  }

  if (authenticated) {
    const { name } = props.auth.getProfile()
    return (
      <div>
        <h1>
            Hi, Nice to see you,{name}.
        </h1>
        <button
          onClick={logout}
        >
          Log out
        </button>
      </div>
    )
  }
}

function App(props) {
  const authenticated = props.auth.isAuthenticated()

  return (
    <div className="App">
      <Route
        exact
        path="/callback"
        render={() => (
          <Callback auth={props.auth} />
        )}
      />

      <Route
        exact
        path="/"
        render={() => (
          <HomePage
            authenticated={authenticated}
            auth={props.auth}
            history={props.history}
          />
        )}
      />
    </div>
  )
}

export default withRouter(App)
