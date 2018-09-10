import React from 'react'
import {render} from 'react-dom'
import 'babel-polyfill' //allows async/await in browser

import './style.scss'

import Main from './components/Main'

render(<Main />, document.getElementById('root'))
