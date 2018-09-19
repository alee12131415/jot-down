import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider, connect} from 'react-redux'

import store from '../redux/store'

import App from './App'
import Landing from './Landing'

class Main extends Component {
    constructor() {
        super()
    }

    render() {
        const Page = this.props.isAuthenticated ? App : Landing
        return (
            <Page />
        )
    }
}

const mapS2P = state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

const Wrapper = () => {
    const Page = connect(mapS2P)(Main)
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Page />
                </div>
            </Router>
        </Provider>
    )
}

export default Wrapper