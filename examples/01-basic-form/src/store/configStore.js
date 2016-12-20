// @flow
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import createLogger from 'redux-logger'

const MIDDLEWARES_DEV = [thunk, createLogger({ collapsed: true })]

const handleStore = (middlewares: any[]) => {
  return createStore(
    rootReducer,
    {},
    applyMiddleware.apply(null, middlewares)
  )
}

export default function configureStore() {
  return handleStore(MIDDLEWARES_DEV)
}
