import {createStore} from 'redux'
import reducers from './reducers'
import state from './initialState'
import middleware from './middlewares'

const initialState = sessionStorage.getItem('state') ? JSON.parse(window.sessionStorage.getItem('state')) : state

let store = createStore(reducers, initialState, middleware)

export default store
