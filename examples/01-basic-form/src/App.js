import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import BasicForm from './BasicForm'
import { actions } from 'better-redux-form'
import { connect } from 'react-redux'
import Wrap from './Wrap'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Better Redux Form</h2>
        </div>
        <div className="App-intro">
          <Wrap>
            <BasicForm />
          </Wrap>
        </div>
      </div>
    )
  }
}

App = connect(
  state => state,
  actions
)(App)

export default App
