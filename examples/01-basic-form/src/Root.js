// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import _ from 'lodash'
import App from './App'
import configStore from './store/configStore'

const store = configStore()

type Props = {
  store: any,
  renderProps?: any,
  routes?: any,
  history?: any,
  children?: any
}

class Root extends Component {

  props: Props

  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

export default Root
